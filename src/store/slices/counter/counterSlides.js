import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    Pagina: 0,
    resultado: false,
    loading: false,
    formData: {
      id: "",
      ciudad: "",
      tipoFranquicia: "",
      mobiliario: "",
      NumCounters: 1,
      NumAvisos: 1,
    },
  },
  reducers: {
    increment: (state) => {
      state.Pagina += 1;
    },
    decrement: (state) => {
      state.Pagina -= 1;
    },
    resultado: (state) => {
      state.resultado = true;
    },
    setData: (state, action) => {
      const { key, value } = action.payload;
      state.formData[key] = value;
    },
    setPagina: (state, action) => {
      state.Pagina = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setNumeCounter: (state, action) => {
      state.formData.NumCounters = action.payload;
    },
    setAvisos: (state, action) => {
      state.formData.NumAvisos = action.payload;
    },
  },
});

export const {
  increment,
  resultado,
  decrement,
  setData,
  setLoading,
  setPagina,
  setNumeCounter,
  setAvisos,
} = counterSlice.actions;

export default counterSlice.reducer;
