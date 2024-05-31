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
      counter: [
        {
          ancho: 1,
          alto: 1,
          imagen: "0",
        },
      ],
      cenefa: {
        ancho: 1,
        alto: 1,
        imagen: "0",
      },
      local: {
        ancho: 1,
        alto: 1,
        imagen: "0",
      },
      aviso: [
        {
          ancho: 1,
          alto: 1,
          imagen: "0",
        },
      ],
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { increment, resultado, decrement, setData, setLoading } = counterSlice.actions;

export default counterSlice.reducer;