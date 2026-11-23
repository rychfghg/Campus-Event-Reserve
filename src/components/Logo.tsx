type Props = {
  size?: number;
};

/** CampusEvent Reserve logo mark (same as the Figma "Logo / Mark" component). */
const Logo = ({ size = 40 }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="CampusEvent Reserve logo"
  >
    <defs>
      <linearGradient
        id="cer-logo-gradient"
        x1="0"
        y1="0"
        x2="120"
        y2="120"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7B6CFF" />
        <stop offset="1" stopColor="#3B44C6" />
      </linearGradient>
    </defs>
    <rect width="120" height="120" rx="30" fill="url(#cer-logo-gradient)" />
    <rect x="26" y="32" width="68" height="60" rx="12" fill="#FFFFFF" />
    <rect x="26" y="32" width="68" height="18" rx="9" fill="#FFB547" />
    <rect x="26" y="41" width="68" height="9" fill="#FFB547" />
    <rect x="40" y="24" width="8" height="18" rx="4" fill="#FFFFFF" />
    <rect x="72" y="24" width="8" height="18" rx="4" fill="#FFFFFF" />
    <path
      d="M45 70 L55 80 L76 59"
      stroke="#3B44C6"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default Logo;
