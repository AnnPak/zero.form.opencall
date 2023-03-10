const BtnPreloader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width="20px"
      height="20px"
      viewBox="0 0 128 128"
    >
      <g>
        <path
          d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z"
          fill="#ffffff"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 64 64"
          to="360 64 64"
          dur="800ms"
          repeatCount="indefinite"
        ></animateTransform>
      </g>
    </svg>
  );
};


export default BtnPreloader;