export const Selector = ({
  title,
  active,
  handleClick,
  icon,
  customStyle,
  takephoto,
}) => {
  return (
    <span
      onClick={handleClick}
      className={`${customStyle} group selectoresTexto cursor-pointer ${
        active ? "selectorActive" : ""
      }`}
    >
      <span>{title}</span>
      {icon && (
        <figure className="cursor-pointer w-4 h-4 -rotate-90">
          {takephoto ? (
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="svgSelectorstroke"
                d="M13.6915 7C13.6915 10.607 10.8757 13.5 7.43976 13.5C4.00386 13.5 1.18799 10.607 1.18799 7C1.18799 3.39298 4.00386 0.5 7.43976 0.5C10.8757 0.5 13.6915 3.39298 13.6915 7Z"
                stroke="#2E3136"
              />
              <path
                className="svgSelectorstroke"
                d="M7.43945 2L7.43945 11.5455"
                stroke="black"
                strokeLinecap="round"
              />
              <path
                className="svgSelectorstroke"
                d="M12.2622 7L3.05568 6.90659"
                stroke="black"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="10"
              height="17"
              viewBox="0 0 10 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.86 9.30029C3.65 9.11029 3.65 8.81028 3.86 8.60028L9.61 3.12028C10.18 2.58028 10.11 1.76029 9.48 1.27029C8.85 0.790285 7.86 0.840284 7.29 1.39028C7.29 1.39028 1.95 6.41028 0.27 8.28028C-0.09 8.68028 -0.09 9.22029 0.27 9.62029C1.95 11.4903 7.29 16.5103 7.29 16.5103C7.86 17.0503 8.83 17.1003 9.48 16.6303C10.12 16.1603 10.17 15.3203 9.61 14.7803L3.86 9.30029Z"
                className="svgSelector"
                fill="#09080D"
              />
            </svg>
          )}
        </figure>
      )}
    </span>
  );
};
