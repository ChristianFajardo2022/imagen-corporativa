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
    <div className="layout fondo_degradado w-full flex flex-col justify-between h-full relative">
      {navBar ? <></> : <Navbar handlePagina={handlePagina} />}

      {children}

      {btnTrue ? (
        <div className="lg:px-10 xs:px-6 lg:pb-16 xs:pb-6">
          <Button
            handleClick={handleClick}
            text={textBtn}
            customStyle={`${styles} ${active ? "btnActive" : " "}`}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
