// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db, storage } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { registerUserToFirestore } from "../firebase/userService";

export const AuthContext = createContext();

// Pindahkan hook ke dalam file yang sama untuk menghindari circular dependency
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (user) {
        try {
          // ✅ Ambil custom claim dari ID token (jika ada)
          const token = await user.getIdTokenResult();
          const claimsRole = token.claims.role || "user";

          // ✅ Registrasi user jika belum ada di Firestore
          await registerUserToFirestore(user, claimsRole);

          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = {
              uid: user.uid,
              ...userSnap.data()
            };

            let photoUrl = user.photoURL;
            if (!photoUrl && userData.photoPath) {
              try {
                const storageRef = ref(storage, userData.photoPath);
                photoUrl = await getDownloadURL(storageRef);
              } catch (error) {
                console.warn("Gagal load foto:", error);
              }
            }

            setCurrentUser({
              ...userData,
              photoURL: photoUrl || null
            });

            // ✅ Gunakan role dari token, fallback ke Firestore jika perlu
            setRole(claimsRole || userData.role || "user");
            setProfilePhoto(photoUrl || null);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        setCurrentUser(null);
        setRole(null);
        setProfilePhoto(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{
      currentUser,
      role,
      loading,
      profilePhoto,
      setProfilePhoto
    }}>
      {children}
    </AuthContext.Provider>
  );
};
