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
  options?: string[];
  moleculeOptions?: MoleculeData[];
  optionType?: 'text' | 'molecule';
  answer: number;
  imageUrl?: string;
  imageAlign?: 'left' | 'center' | 'right';
  molecule?: MoleculeData;
}

export interface MindmapNode {
  id: string;
  label: string;
  color: string;
  question: {
    text: string;
    options: {
      text: string;
      image?: string;
      svgId?: string;
      isCorrect: boolean;
    }[];
  };
}

export interface ReactionItem {
  molecule: MoleculeData;
  correctCoefficient: number;
}

export interface ReactionData {
  id: string;
  title: string;
  description: string;
  reactants: ReactionItem[];
  products: ReactionItem[];
}

export interface ClassificationOption {
  id: string;
  label: string;
  colorClass: string;
}

export interface ClassificationItem {
  id: string;
  molecule: MoleculeData;
  correctType: string;
  explanation?: string;
}

export interface ClassificationData {
  id: string;
  title: string;
  description: string;
  options: ClassificationOption[];
  items: ClassificationItem[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'quiz' | 'interactive' | 'matching' | 'mindmap' | 'reaction' | 'classification';
  
  // For lesson
  blocks?: ContentBlock[];
  
  // For quiz
  questions?: QuestionData[];
  
  // For interactive
  models?: MoleculeData[];
  
  // For matching
  pairs?: { 
    left: string; 
    right: string;
    rightType?: 'text' | 'molecule';
    rightMolecule?: MoleculeData;
  }[];

  // For mindmap
  mindmapNodes?: MindmapNode[];

  // For reaction
  reactions?: ReactionData[];

  // For classification
  classifications?: ClassificationData[];
}

export interface Theme {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  order: number;
}
