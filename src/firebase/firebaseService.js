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

export { getLocaleById };