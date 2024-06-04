import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const getLocaleById = async (id) => {
  try {
    const docRef = doc(db, "locales", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { data: docSnap.data(), error: null };
    } else {
      return { data: null, error: "ID no encontrado" };
    }
  } catch (error) {
    return { data: null, error: "Error al obtener datos" };
  }
};

// Función para actualizar datos en un documento específico
const updateLocaleData = async (id, key, value) => {
  try {
    const localeRef = doc(db, "locales", id);
    await updateDoc(localeRef, { [key]: value });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Función para añadir o fusionar datos en un documento específico
const addLocaleData = async (id, data) => {
  try {
    const localeRef = doc(db, "locales", id);
    await setDoc(localeRef, data, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { getLocaleById, updateLocaleData, addLocaleData };