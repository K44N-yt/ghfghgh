import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Theme } from '../types/curriculum';

interface CurriculumContextType {
  themes: Theme[];
  loading: boolean;
  saveTheme: (theme: Theme) => Promise<void>;
  deleteTheme: (themeId: string) => Promise<void>;
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined);

export function CurriculumProvider({ children }: { children: React.ReactNode }) {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'curriculum'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedThemes: Theme[] = [];
      snapshot.forEach((doc) => {
        fetchedThemes.push({ id: doc.id, ...doc.data() } as Theme);
      });
      setThemes(fetchedThemes);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching curriculum:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const saveTheme = async (theme: Theme) => {
    const docRef = doc(db, 'curriculum', theme.id);
    await setDoc(docRef, theme);
  };

  const deleteTheme = async (themeId: string) => {
    const docRef = doc(db, 'curriculum', themeId);
    await deleteDoc(docRef);
  };

  return (
    <CurriculumContext.Provider value={{ themes, loading, saveTheme, deleteTheme }}>
      {children}
    </CurriculumContext.Provider>
  );
}

export const useCurriculum = () => {
  const context = useContext(CurriculumContext);
  if (context === undefined) {
    throw new Error('useCurriculum must be used within a CurriculumProvider');
  }
  return context;
};
