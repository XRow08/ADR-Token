import { SVGProps } from "react";

export function ShirtIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M20.38 3.46L16 2L12 5L8 2L3.62 3.46C2.64 3.76 2 4.66 2 5.69V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V5.69C22 4.66 21.36 3.76 20.38 3.46ZM20 20H4V5.69L8 4.4L12 7.5L16 4.4L20 5.69V20Z"
        fill="#F9F000"
      />
    </svg>
  );
} 