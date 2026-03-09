import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  onAuthStateChanged, 
  User as FirebaseUser,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  badges: string[];
  completedModules: string[];
  isAdmin?: boolean;
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  completeModule: (moduleId: string) => Promise<void>;
  awardBadge: (badgeId: string) => Promise<void>;
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
        try {
          // Fetch or create user profile in Firestore
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            // Create new user profile
            const newProfile: UserProfile = {
              uid: user.uid,
              displayName: user.displayName || 'Öğrenci',
              email: user.email || '',
              badges: [],
              completedModules: [],
              isAdmin: false
            };
            await setDoc(docRef, newProfile);
            setUserProfile(newProfile);
          }
        } catch (error: any) {
          console.error("Firestore error:", error);
          if (error.code === 'permission-denied') {
            alert("Veritabanı erişim hatası (Missing or insufficient permissions). Lütfen Firebase konsolundan Firestore kurallarını güncelleyin.");
          }
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  const completeModule = async (moduleId: string) => {
    if (!currentUser || !userProfile) return;
    if (userProfile.completedModules.includes(moduleId)) return; // Already completed

    const docRef = doc(db, 'users', currentUser.uid);
    await updateDoc(docRef, {
      completedModules: arrayUnion(moduleId)
    });
    
    setUserProfile({
      ...userProfile,
      completedModules: [...userProfile.completedModules, moduleId]
    });
  };

  const awardBadge = async (badgeId: string) => {
    if (!currentUser || !userProfile) return;
    if (userProfile.badges.includes(badgeId)) return;

    const docRef = doc(db, 'users', currentUser.uid);
    await updateDoc(docRef, {
      badges: arrayUnion(badgeId)
    });
    
    setUserProfile({
      ...userProfile,
      badges: [...userProfile.badges, badgeId]
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading, logout, completeModule, awardBadge }}>
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
