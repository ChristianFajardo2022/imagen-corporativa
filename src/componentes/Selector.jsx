export const Selector = ({ title, active, handleClick }) => {
  return (
    <span
      onClick={handleClick}
      className={`selectoresTexto cursor-pointer ${
        active ? "selectorActive" : ""
      }`}
    >
      {title}
    </span>
  );
};
