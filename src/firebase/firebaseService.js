import { doc, getDoc, getDocs, updateDoc, setDoc, collection } from "firebase/firestore";
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
    return { data: null, error: `Error al obtener datos: ${error.message}` };
  }
};

const getAllLocales = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "locales"));
    const locales = [];
    querySnapshot.forEach((doc) => {
      locales.push({ id: doc.id, ...doc.data() });
    });
    return { data: locales, error: null };
  } catch (error) {
    return { data: null, error: `Error al obtener los datos: ${error.message}` };
  }
};



const updateLocaleData = async (id, key, value) => {
  try {
    const localeRef = doc(db, "locales", id);
    await updateDoc(localeRef, { [key]: value });
    return { success: true };
  } catch (error) {
    return { success: false, error: `Error al actualizar datos: ${error.message}` };
  }
};

const addLocaleData = async (id, data) => {
  try {
    const localeRef = doc(db, "locales", id);
    await setDoc(localeRef, data, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: `Error al añadir datos: ${error.message}` };
  }
};

export { getLocaleById, updateLocaleData, addLocaleData, getAllLocales };