import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import { Module } from '../types/curriculum';

interface MazeGameProps {
  module: Module;
  onComplete: (score: number) => void;
}

const MAZE_GRID = [
  "111111111111111111111",
  "100000000010000000001",
  "101110111010111011101",
  "100000100000001000001",
  "101110101111101011101",
  "100000000000000000001",
  "111011111010111110111",
  "000010000000000010000",
  "111010111111111010111",
  "100000000010000000001",
  "101110111010111011101",
  "100010000000000010001",
  "111111111111111111111",
];

const ROWS = MAZE_GRID.length;
const COLS = MAZE_GRID[0].length;

const START_POS = { x: 10, y: 7 };
const ANSWER_POSITIONS = [
  { x: 2, y: 1 },
  { x: 18, y: 1 },
  { x: 2, y: 11 },
  { x: 18, y: 11 }
];
const ENEMY_STARTS = [
  { x: 10, y: 5, color: 'rgb(239, 68, 68)', type: 'blinky' }, // Red - Aggressive
  { x: 1, y: 5, color: 'rgb(236, 72, 153)', type: 'pinky' },  // Pink - Ambush
  { x: 19, y: 5, color: 'rgb(34, 211, 238)', type: 'inky' },   // Cyan - Whimsical
  { x: 10, y: 1, color: 'rgb(245, 158, 11)', type: 'clyde' },  // Orange - Random/Scared
];

type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'NONE';

interface Entity {
  x: number;
  y: number;
  dir: Dir;
  nextDir: Dir;
  speed: number;
}

interface Enemy extends Entity {
  color: string;
  type: string;
}

export function MazeGame({ module, onComplete }: MazeGameProps) {
  const data = module.mazeGames?.[0];
  const questions = data?.questions || [];

  const [gameState, setGameState] = useState<'playing' | 'paused' | 'gameover' | 'victory' | 'transition'>('playing');
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string, type: 'correct' | 'wrong' } | null>(null);

  // Smooth position state for rendering (avoiding re-renders for logic if possible, but React needs it)
  const [playerPos, setPlayerPos] = useState({ x: START_POS.x, y: START_POS.y, dir: 'NONE' as Dir });
  const [enemiesPos, setEnemiesPos] = useState<Enemy[]>([]);

  // Internal logic state
  const playerRef = useRef<Entity>({ x: START_POS.x, y: START_POS.y, dir: 'NONE', nextDir: 'NONE', speed: 0.12 });
  const enemiesRef = useRef<Enemy[]>([]);
  const stateRef = useRef(gameState);
  const requestRef = useRef<number>();

  useEffect(() => { stateRef.current = gameState; }, [gameState]);

  const isWall = (x: number, y: number) => {
    if (isNaN(x) || isNaN(y)) return true;
    const gridX = Math.round(x);
    const gridY = Math.round(y);
    if (gridY < 0 || gridY >= ROWS) return true;
    const row = MAZE_GRID[gridY];
    if (!row) return true;
    let charX = gridX;
    if (charX < 0) charX = COLS - 1;
    if (charX >= COLS) charX = 0;
    return row[charX] === '1';
  };

  const updateEntity = (entity: Entity, isPlayer: boolean = false, delta: number = 1) => {
    const nextDir = entity.nextDir;
    const centerX = Math.round(entity.x);
    const centerY = Math.round(entity.y);
    
    const currentActualSpeed = entity.speed * delta;
    // Ultra-smooth threshold: allows turning without robotic micro-stops
    const threshold = currentActualSpeed * 3.5; 
    const atCenter = Math.abs(entity.x - centerX) < threshold && Math.abs(entity.y - centerY) < threshold;

    if (atCenter && nextDir !== 'NONE') {
      let canTurn = false;
      if (nextDir === 'UP') canTurn = !isWall(centerX, centerY - 1);
      if (nextDir === 'DOWN') canTurn = !isWall(centerX, centerY + 1);
      if (nextDir === 'LEFT') canTurn = !isWall(centerX - 1, centerY);
      if (nextDir === 'RIGHT') canTurn = !isWall(centerX + 1, centerY);

      if (canTurn) {
        entity.dir = nextDir;
        // Lock to grid axis for only the coordinate we AREN'T moving in
        if (nextDir === 'UP' || nextDir === 'DOWN') {
          entity.x = centerX;
        } else {
          entity.y = centerY;
        }
        
        if (isPlayer) entity.nextDir = 'NONE';
      }
    }

    if (entity.dir === 'NONE') return;

    let dx = 0, dy = 0;
    if (entity.dir === 'UP') dy = -currentActualSpeed;
    if (entity.dir === 'DOWN') dy = currentActualSpeed;
    if (entity.dir === 'LEFT') dx = -currentActualSpeed;
    if (entity.dir === 'RIGHT') dx = currentActualSpeed;

    const nx = entity.x + dx;
    const ny = entity.y + dy;

    // Look ahead for walls
    const checkDist = 0.45;
    if (!isWall(nx + (dx / currentActualSpeed * checkDist), ny + (dy / currentActualSpeed * checkDist))) {
      entity.x = nx;
      entity.y = ny;
      // Tunneling logic
      if (entity.x < -0.6) entity.x = COLS - 0.5;
      if (entity.x > COLS - 0.4) entity.x = -0.5;
    } else {
      entity.x = Math.round(entity.x);
      entity.y = Math.round(entity.y);
      entity.dir = 'NONE';
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    setGameState('transition');
    if (isCorrect) {
      setFeedback({ text: 'Harika! Doğru Noktaya Ulaştın.', type: 'correct' });
      setScore(s => s + 100); 
      setTimeout(() => {
        setCurrentQIdx(prev => {
          const nextIdx = prev + 1;
          if (nextIdx >= questions.length) {
            setGameState('victory');
            return prev;
          }
          resetPositions(nextIdx);
          setGameState('playing');
          return nextIdx;
        });
        setFeedback(null);
      }, 1500);
    } else {
      setFeedback({ text: 'Yanlış Cevap! Can Gitti.', type: 'wrong' });
      setLives(l => {
        const nextLives = l - 1;
        setTimeout(() => {
          if (nextLives <= 0) {
            setGameState('gameover');
          } else {
            resetPositions(currentQIdx);
            setGameState('playing');
          }
          setFeedback(null);
        }, 1500);
        return nextLives;
      });
    }
  };

  const handleDeath = () => {
    if (stateRef.current !== 'playing') return;
    setGameState('transition');
    setFeedback({ text: 'Yakalandın!', type: 'wrong' });
    setLives(l => {
      const nextLives = l - 1;
      setTimeout(() => {
        if (nextLives <= 0) {
          setGameState('gameover');
        } else {
          resetPositions(currentQIdx);
          setGameState('playing');
        }
        setFeedback(null);
      }, 1500);
      return nextLives;
    });
  };

  const resetPositions = (nextIdx: number) => {
    playerRef.current = { x: START_POS.x, y: START_POS.y, dir: 'NONE', nextDir: 'NONE', speed: 0.10 }; // Even slower for better control
    
    // Gradual difficulty increase
    const count = Math.min(1 + Math.floor(nextIdx / 1.5), ENEMY_STARTS.length);
    enemiesRef.current = ENEMY_STARTS.slice(0, count).map(s => ({
      x: s.x,
      y: s.y,
      dir: 'NONE',
      nextDir: 'NONE',
      speed: 0.06 + (nextIdx * 0.008), // Slower enemies
      color: s.color,
      type: s.type
    }));

    setPlayerPos({ x: START_POS.x, y: START_POS.y, dir: 'NONE' });
    setEnemiesPos([...enemiesRef.current]);
    // Reset lastTime to current time to avoid huge delta
    lastTimeRef.current = performance.now();
  };

  // Main Game Loop
  const lastTimeRef = useRef<number>(0);

  const animate = useCallback((time: number) => {
    if (stateRef.current === 'paused') {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }
    if (!lastTimeRef.current) {
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
      return;
    }
    const delta = Math.min((time - lastTimeRef.current) / 16.66, 2);
    lastTimeRef.current = time;

    if (isNaN(delta) || delta <= 0) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    if (stateRef.current === 'playing') {
      const p = playerRef.current;
      updateEntity(p, true, delta);

      // Check Answers
      const q = questions[currentQIdx];
      if (q) {
        const checkRange = 3.2; // Extra large hitbox for maximum forgiveness
        for (let i = 0; i < q.options.length; i++) {
          const pos = ANSWER_POSITIONS[i % ANSWER_POSITIONS.length];
          // Precise center-to-center circular check
          const dx = p.x - pos.x;
          const dy = p.y - pos.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < checkRange * checkRange) {
            handleAnswer(q.options[i].isCorrect);
            return;
          }
        }
      }

      // Update Enemies
      enemiesRef.current.forEach(e => {
        const centerX = Math.round(e.x);
        const centerY = Math.round(e.y);
        
        const currentActualSpeed = e.speed * delta;
        const threshold = currentActualSpeed * 1.2;
        const atCenter = Math.abs(e.x - centerX) < threshold && Math.abs(e.y - centerY) < threshold;

        if (atCenter) {
          const dirs: Dir[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
          const validDirs = dirs.filter(d => {
            // Can't reverse direction directly unless it's the only option
            if (e.dir === 'UP' && d === 'DOWN') return false;
            if (e.dir === 'DOWN' && d === 'UP') return false;
            if (e.dir === 'LEFT' && d === 'RIGHT') return false;
            if (e.dir === 'RIGHT' && d === 'LEFT') return false;

            if (d === 'UP') return !isWall(centerX, centerY - 1);
            if (d === 'DOWN') return !isWall(centerX, centerY + 1);
            if (d === 'LEFT') return !isWall(centerX - 1, centerY);
            if (d === 'RIGHT') return !isWall(centerX + 1, centerY);
            return false;
          });

          if (validDirs.length > 0) {
            // Predictive and Personality-based AI
            let targetX = p.x;
            let targetY = p.y;
            
            // Prediction factor based on level
            const predictionPower = 2 + (currentQIdx * 0.5);

            if (e.type === 'pinky') {
              // Targets ahead of player
              if (p.dir === 'UP') targetY -= predictionPower;
              else if (p.dir === 'DOWN') targetY += predictionPower;
              else if (p.dir === 'LEFT') targetX -= predictionPower;
              else if (p.dir === 'RIGHT') targetX += predictionPower;
            } else if (e.type === 'inky') {
              // Strategic: Flanking logic
              const blinky = enemiesRef.current.find(en => en.type === 'blinky') || e;
              const vecX = p.x - blinky.x;
              const vecY = p.y - blinky.y;
              targetX = p.x + vecX;
              targetY = p.y + vecY;
            } else if (e.type === 'clyde') {
              // Scatter/Attack behavior
              const dToP = Math.sqrt(Math.pow(e.x - p.x, 2) + Math.pow(e.y - p.y, 2));
              if (dToP < 4 + (currentQIdx * 0.2)) { 
                targetX = (e.x > 10) ? 0 : 20; 
                targetY = (e.y > 6) ? 0 : 12; 
              }
            }

            // Pathfinding: Pick direction that reduces distance to target the most
            // Ties broken in a specific order (Classic Pac-Man style: UP, LEFT, DOWN, RIGHT)
            let bestDir = validDirs[0];
            let minDist = Infinity;
            
            for (const vd of validDirs) {
              let tx = centerX, ty = centerY;
              if (vd === 'UP') ty--;
              else if (vd === 'DOWN') ty++;
              else if (vd === 'LEFT') tx--;
              else if (vd === 'RIGHT') tx++;
              
              const dist = Math.pow(tx - targetX, 2) + Math.pow(ty - targetY, 2);
              if (dist < minDist) {
                minDist = dist;
                bestDir = vd;
              }
            }
            e.dir = bestDir;
            // No hard centerX/centerY snap here, let updateEntity handle smooth alignment
          } else {
            // If no valid moves (stuck), reverse
            const reverse: Dir = e.dir === 'UP' ? 'DOWN' : e.dir === 'DOWN' ? 'UP' : e.dir === 'LEFT' ? 'RIGHT' : 'LEFT';
            e.dir = reverse;
          }
        }
        
        updateEntity(e, false, delta);

        // Frame-accurate collision
        const dist = Math.sqrt(Math.pow(e.x - p.x, 2) + Math.pow(e.y - p.y, 2));
        if (dist < 0.75) handleDeath();
      });

      setPlayerPos({ x: p.x, y: p.y, dir: p.dir });
      setEnemiesPos([...enemiesRef.current]);
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [currentQIdx, questions]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]);

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const p = playerRef.current;
      if (['ArrowUp', 'w', 'W', '8'].includes(e.key)) { e.preventDefault(); p.nextDir = 'UP'; }
      if (['ArrowDown', 's', 'S', '2'].includes(e.key)) { e.preventDefault(); p.nextDir = 'DOWN'; }
      if (['ArrowLeft', 'a', 'A', '4'].includes(e.key)) { e.preventDefault(); p.nextDir = 'LEFT'; }
      if (['ArrowRight', 'd', 'D', '6'].includes(e.key)) { e.preventDefault(); p.nextDir = 'RIGHT'; }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const restartGame = () => {
    setCurrentQIdx(0);
    setLives(3);
    setScore(0);
    resetPositions(0);
    setGameState('playing');
  };

  if (!data || !questions.length) return <div className="p-8 text-center text-red-500">Oyun verisi bulunamadı.</div>;

  const currentQ = questions[currentQIdx];

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] select-none">
      {/* HUD */}
      <div className="flex justify-between items-center mb-6 px-4 bg-slate-900/50 p-4 rounded-xl border border-white/10">
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <Heart key={i} className={`w-6 h-6 transition-all duration-300 ${i < lives ? 'text-red-500 fill-red-500 scale-110' : 'text-slate-700 opacity-30 scale-90'}`} />
          ))}
        </div>
        <div className="text-xl font-bold font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] uppercase">Puan: {score}</div>
        <div className="text-sm font-medium text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">
          Aşama {currentQIdx + 1} / {questions.length}
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 relative flex items-center justify-center bg-slate-950 rounded-2xl border-4 border-slate-800 overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,1)]">
        
        <div className="relative w-full max-w-4xl aspect-[21/13] bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_100%)]">
          {/* Render Maze */}
          <div className="absolute inset-0 grid" style={{ 
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)` 
          }}>
            {MAZE_GRID.map((row, y) => 
              row.split('').map((cell, x) => (
                <div 
                  key={`${x}-${y}`} 
                  className={`w-full h-full relative transition-all duration-500 ${cell === '1' ? 'z-10' : ''}`}
                >
                  {cell === '1' && (
                    <div className="absolute inset-0 bg-blue-900/20 border-[1px] border-blue-500/30 rounded-[2px] shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                       <div className="absolute inset-[2px] border border-blue-400/10 rounded-[1px]" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Render Answer Zones */}
          {currentQ?.options.map((opt, i) => {
             const pos = ANSWER_POSITIONS[i % ANSWER_POSITIONS.length];
             if (!pos) return null;
             return (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="absolute z-20 flex items-center justify-center pointer-events-none"
                 style={{
                   left: `${((pos.x + 0.5) / COLS) * 100}%`,
                   top: `${((pos.y + 0.5) / ROWS) * 100}%`,
                   width: '20%', 
                   height: '18%', 
                   transform: 'translate(-50%, -50%)',
                   zIndex: 40
                 }}
               >
                 <div className="w-full h-full border-2 border-emerald-400/50 bg-emerald-950/95 backdrop-blur-xl rounded-2xl p-3 flex items-center justify-center text-xs md:text-sm lg:text-base text-center font-bold text-emerald-50 text-shadow-glow shadow-[0_0_50px_rgba(52,211,153,0.5)]">
                   {opt.text}
                 </div>
               </motion.div>
             )
          })}

          {/* Player */}
          <div 
            className="absolute z-30 transition-transform duration-75"
            style={{
               left: `${((playerPos.x + 0.5) / COLS) * 100}%`,
               top: `${((playerPos.y + 0.5) / ROWS) * 100}%`,
               width: `${100/COLS}%`,
               height: `${100/ROWS}%`,
               transform: 'translate(-50%, -50%)'
            }}
          >
            <div className={`w-4/5 h-4/5 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.6)] relative
              ${playerPos.dir === 'RIGHT' ? 'rotate-0' : playerPos.dir === 'LEFT' ? 'rotate-180' : playerPos.dir === 'UP' ? '-rotate-90' : playerPos.dir === 'DOWN' ? 'rotate-90' : ''}`}>
              <div className="absolute right-1 w-1/3 h-1/3 bg-slate-900 rounded-full" />
              <div className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-yellow-400 -translate-y-1/2 origin-left animate-pacman-mouth" />
            </div>
          </div>

          {/* Enemies */}
          {enemiesPos.map((e, idx) => (
            <div 
              key={idx}
              className="absolute z-20"
              style={{
                 left: `${((e.x + 0.5) / COLS) * 100}%`,
                 top: `${((e.y + 0.5) / ROWS) * 100}%`,
                 width: `${100/COLS}%`,
                 height: `${100/ROWS}%`,
                 transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="w-[90%] h-[90%] clip-ghost relative shadow-[0_0_15px_rgba(0,0,0,0.5)]" style={{ backgroundColor: e.color }}>
                 <div className="absolute top-[20%] left-[20%] w-[25%] h-[25%] bg-white rounded-full">
                    <div className="absolute top-[25%] right-[25%] w-[40%] h-[40%] bg-blue-900 rounded-full" />
                 </div>
                 <div className="absolute top-[20%] right-[20%] w-[25%] h-[25%] bg-white rounded-full">
                    <div className="absolute top-[25%] right-[25%] w-[40%] h-[40%] bg-blue-900 rounded-full" />
                 </div>
                 <div className="absolute bottom-0 w-full flex justify-around">
                    {[1,2,3].map(i => <div key={i} className="w-1 h-2 bg-slate-950/20" />)}
                 </div>
              </div>
            </div>
          ))}

        </div>

        {/* Overlays */}
        <AnimatePresence>
          {feedback && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.5, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.5, y: -20 }}
               className={`absolute z-50 px-8 py-4 rounded-2xl font-bold text-2xl md:text-4xl shadow-2xl backdrop-blur-md ${feedback.type === 'correct' ? 'bg-emerald-500/90 text-white border-2 border-emerald-300' : 'bg-red-500/90 text-white border-2 border-red-300'}`}
             >
               {feedback.text}
             </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-[60] bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="p-8 rounded-full bg-red-500/10 mb-6">
                <RotateCcw className="w-20 h-20 text-red-500" />
              </motion.div>
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-600 mb-2">OYUN BİTTİ</h2>
              <p className="text-xl text-slate-400 mb-8 font-mono">TOPLADIĞIN PUAN: {score}</p>
              <button 
                onClick={restartGame}
                className="group px-8 py-4 rounded-2xl bg-white text-slate-950 font-black text-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" /> 
                YENİDEN DENE
              </button>
            </motion.div>
          )}

          {gameState === 'victory' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-[60] bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
            >
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative mb-6">
                <Trophy className="w-24 h-24 text-yellow-400" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full" 
                />
              </motion.div>
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-cyan-500 mb-2 uppercase tracking-tighter">MÜKEMMEL BİTİŞ!</h2>
              <p className="text-xl text-slate-400 mb-10 font-mono italic">KAZANILAN SKOR: {score}</p>
              <button 
                onClick={() => onComplete(score)}
                className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-black text-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 shadow-[0_0_40px_rgba(52,211,153,0.3)]"
              >
                DEVAM ET <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Question Text Footer */}
      <div className="mt-8 relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-widest z-10">GÖREV</div>
        <div className="bg-slate-900/80 border-2 border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 opacity-50" />
          <p className="text-2xl md:text-3xl font-bold text-white text-center leading-tight">
            {currentQ?.questionText}
          </p>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="mt-8 grid grid-cols-3 gap-3 md:hidden w-64 mx-auto pb-8">
         <div />
         <button className="bg-slate-800/80 p-6 rounded-2xl active:bg-slate-700 active:scale-90 flex justify-center text-2xl" onPointerDown={() => playerRef.current.nextDir = 'UP'}>↑</button>
         <div />
         <button className="bg-slate-800/80 p-6 rounded-2xl active:bg-slate-700 active:scale-90 flex justify-center text-2xl" onPointerDown={() => playerRef.current.nextDir = 'LEFT'}>←</button>
         <button className="bg-slate-800/80 p-6 rounded-2xl active:bg-slate-700 active:scale-90 flex justify-center text-2xl" onPointerDown={() => playerRef.current.nextDir = 'DOWN'}>↓</button>
         <button className="bg-slate-800/80 p-6 rounded-2xl active:bg-slate-700 active:scale-90 flex justify-center text-2xl" onPointerDown={() => playerRef.current.nextDir = 'RIGHT'}>→</button>
      </div>

    </div>
  );
}
