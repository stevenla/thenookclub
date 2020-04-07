import React from "react";
import useColor from "./useColor";

export interface IconProps {
  color?: string;
  size: number;
}

interface BaseIconProps extends IconProps {
  children: React.ReactNode;
}

export default function BaseIcon({ color, size, children }: BaseIconProps) {
  const colorToUse = useColor(color);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      width={size}
      height={size}
      fill={colorToUse}
    >
      {children}
    </svg>
  );
}
