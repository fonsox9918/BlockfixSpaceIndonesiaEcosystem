//src/firebase/userService.js
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const registerUserToFirestore = async (user, role = "pelanggan", extra = {}) => {
  if (!user) return;

  const now = serverTimestamp();

  const structuredAddress = extra.address || {
    label: "Rumah",
    recipient: user.displayName || "Nama Penerima",
    phone: extra.phone || "",
    street: "",
    kelurahan: "",
    kecamatan: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Indonesia",
    lat: 0,
    lng: 0,
    isPrimary: true
  };

  try {
    const userRef = doc(db, "users", user.uid);
    const existingDoc = await getDoc(userRef);
    const existingData = existingDoc.exists() ? existingDoc.data() : {};

    const userData = {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email,
      photoURL: user.photoURL || "",
      role: existingData.role || role,
      isActive: true,
      address: existingData.address || structuredAddress,
      phoneNumber: existingData.phoneNumber || extra.phone || "",
      createdAt: existingData.createdAt || now,
      updatedAt: now,
      preferences: existingData.preferences || {
        language: "id",
        theme: "light",
        notification: true
      },
      metadata: {
        lastLogin: now,
        registerMethod: extra.registerMethod || "email"
      }
    };

    await setDoc(userRef, userData, { merge: true });
    console.log("User lengkap disimpan ke Firestore.");
  } catch (error) {
    console.error("Gagal menyimpan user ke Firestore:", error);
  }
};
