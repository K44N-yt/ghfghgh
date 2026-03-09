export interface AtomData {
  element: string;
  position: [number, number, number];
}

export interface BondData {
  start: [number, number, number];
  end: [number, number, number];
}

export interface MoleculeData {
  name: string;
  formula: string;
  atoms: AtomData[];
  bonds: BondData[];
}

export type ContentBlockType = 'text' | 'image' | 'molecule';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  text?: string;
  imageUrl?: string;
  imageAlign?: 'left' | 'center' | 'right';
  molecule?: MoleculeData;
}

export interface QuestionData {
  id: string;
  q: string;
  options: string[];
  answer: number;
  imageUrl?: string;
  imageAlign?: 'left' | 'center' | 'right';
  molecule?: MoleculeData;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'quiz' | 'interactive' | 'matching';
  
  // For lesson
  blocks?: ContentBlock[];
  
  // For quiz
  questions?: QuestionData[];
  
  // For interactive
  models?: MoleculeData[];
  
  // For matching
  pairs?: { left: string; right: string }[];
}

export interface Theme {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  order: number;
}
