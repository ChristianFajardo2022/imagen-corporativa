export const Selector = ({ title, active, handleClick }) => {
  return (
    <span
      onClick={handleClick}
      className={`selectoresTexto ${active ? "selectorActive" : ""}`}
    >
      {title}
    </span>
  );
};
