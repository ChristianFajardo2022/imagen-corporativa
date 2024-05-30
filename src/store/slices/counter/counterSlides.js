import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    Pagina: 0,
    resultado: false,
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
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
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
  },
});

// Action creators are generated for each case reducer function
export const { increment, resultado, decrement, setData } =
  counterSlice.actions;
