import { Button } from "./Button";
import { Navbar } from "./Navbar";

export const Layout = ({
  children,
  handleClick,
  active,
  textBtn,
  btnTrue,
  styles,
  navBar,
  handlePagina,
}) => {
  return (
    <div className="fondo_degradado w-full flex flex-col justify-between h-full relative">
      {navBar ? <></> : <Navbar handlePagina={handlePagina} />}
      {children}

      {btnTrue ? (
        <Button
          handleClick={handleClick}
          text={textBtn}
          customStyle={`${styles} ${active ? "btnActive" : " "}`}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};
