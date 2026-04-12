import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Trophy, Medal, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export interface ScoreData {
  id: string;
  userId: string;
  moduleId: string;
  displayName: string;
  score: number;
  timestamp: any;
}

interface LeaderboardProps {
  moduleId: string;
}

export function Leaderboard({ moduleId }: LeaderboardProps) {
  const [scores, setScores] = useState<ScoreData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const q = query(
          collection(db, 'moduleScores'),
          where('moduleId', '==', moduleId),
          orderBy('score', 'desc'),
          limit(10)
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedScores: ScoreData[] = [];
        querySnapshot.forEach((doc) => {
          fetchedScores.push({ id: doc.id, ...doc.data() } as ScoreData);
        });
        
        setScores(fetchedScores);
      } catch (error) {
        console.error("Skor tablosu yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [moduleId]);

  if (loading) {
    return <div className="text-center py-8 text-slate-400">Skor tablosu yükleniyor...</div>;
  }

  if (scores.length === 0) {
    return (
      <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 text-center">
        <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-white mb-1">Henüz Skor Yok</h3>
        <p className="text-slate-400 text-sm">Bu etkinliği tamamlayan ilk kişi ol ve liderlik tablosuna yerleş!</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-amber-400" />
        <h3 className="text-xl font-bold text-white">Liderlik Tablosu</h3>
      </div>
      
      <div className="space-y-3">
        {scores.map((score, index) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={score.id} 
            className={`flex items-center justify-between p-3 rounded-lg ${
              index === 0 ? 'bg-amber-500/10 border border-amber-500/30' : 
              index === 1 ? 'bg-slate-300/10 border border-slate-300/30' : 
              index === 2 ? 'bg-amber-700/10 border border-amber-700/30' : 
              'bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                index === 0 ? 'bg-amber-500 text-amber-950' : 
                index === 1 ? 'bg-slate-300 text-slate-900' : 
                index === 2 ? 'bg-amber-700 text-amber-50' : 
                'bg-slate-700 text-slate-300'
              }`}>
                {index + 1}
              </div>
              <span className="font-medium text-slate-200">{score.displayName}</span>
            </div>
            <div className="font-bold text-cyan-400">
              {score.score} Puan
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
