import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  onAuthStateChanged, 
  User as FirebaseUser,
  signOut,
  signInAnonymously
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  badges: string[];
  completedModules: string[];
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  completeModule: (moduleId: string) => Promise<void>;
  awardBadge: (badgeId: string) => Promise<void>;
  submitScore: (moduleId: string, score: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const fallbackProfile: UserProfile = {
          uid: user.uid,
          displayName: user.isAnonymous ? 'Misafir Öğrenci' : (user.displayName || 'Öğrenci'),
          email: user.email || '',
          badges: [],
          completedModules: []
        };

        try {
          // Fetch or create user profile in Firestore
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserProfile({
              ...fallbackProfile,
              ...data,
              completedModules: data.completedModules || [],
              badges: data.badges || [],
              highScores: data.highScores || {}
            } as UserProfile);
          } else {
            // Create new user profile
            await setDoc(docRef, fallbackProfile);
            setUserProfile(fallbackProfile);
          }
        } catch (error: any) {
          console.error("Firestore error:", error);
          if (error.code === 'permission-denied') {
            console.warn("Veritabanı erişim hatası (Missing or insufficient permissions). Yerel profil kullanılıyor.");
          }
          // Fallback to local profile if Firestore fails
          setUserProfile(fallbackProfile);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  const loginAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Guest login failed:", error);
      throw error;
    }
  };

  const completeModule = async (moduleId: string) => {
    if (!currentUser || !userProfile) return;
    if (userProfile.completedModules.includes(moduleId)) return; // Already completed

    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await updateDoc(docRef, {
        completedModules: arrayUnion(moduleId)
      });
    } catch (error) {
      console.warn("Firestore update failed, updating local state only:", error);
    }
    
    setUserProfile(prev => prev ? {
      ...prev,
      completedModules: [...prev.completedModules, moduleId]
    } : null);
  };

  const awardBadge = async (badgeId: string) => {
    if (!currentUser || !userProfile) return;
    if (userProfile.badges.includes(badgeId)) return;

    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await updateDoc(docRef, {
        badges: arrayUnion(badgeId)
      });
    } catch (error) {
      console.warn("Firestore update failed, updating local state only:", error);
    }
    
    setUserProfile(prev => prev ? {
      ...prev,
      badges: [...prev.badges, badgeId]
    } : null);
  };

  const submitScore = async (moduleId: string, score: number) => {
    if (!currentUser || !userProfile) return;

    try {
      const scoreId = `${currentUser.uid}_${moduleId}`;
      const docRef = doc(db, 'moduleScores', scoreId);
      
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const existingScore = docSnap.data().score;
        if (score > existingScore) {
          await updateDoc(docRef, {
            score,
            timestamp: serverTimestamp()
          });
        }
      } else {
        await setDoc(docRef, {
          userId: currentUser.uid,
          moduleId,
          displayName: userProfile.displayName,
          score,
          timestamp: serverTimestamp()
        });
      }
    } catch (error) {
      console.error("Skor kaydedilirken hata:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading, logout, loginAsGuest, completeModule, awardBadge, submitScore }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
