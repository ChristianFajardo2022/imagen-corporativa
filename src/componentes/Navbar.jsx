import { useDispatch } from "react-redux";
import { decrement } from "../store/slices/counter/counterSlides";

export const Navbar = ({ handlePagina }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <figure
          onClick={() =>
            handlePagina ? handlePagina() : dispatch(decrement())
          }
          className="cursor-pointer w-3 h-full"
        >
          <img src="/regresar.svg" />
        </figure>
        <figure className="w-7">
          <img src="/prospero.svg" />
        </figure>
        <div></div>
      </div>
    </div>
  );
};
