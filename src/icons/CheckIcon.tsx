import React from "react";
import BaseIcon, { IconProps } from "./BaseIcon";

export default function CheckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M971 170c11.333 11.333 17 25.001 17 41.001s-5.667 30-17 42l-579 614c-6 6.667-12.833 10.5-20.5 11.5s-15.5 1.5-23.5 1.5c-7.333 0-14.333-.333-21-1s-13.334-3.334-20.001-8.001l-275-250c-12-10.667-18.333-25-19-43 0-8.667 1.167-16.667 3.5-24s6.833-14.333 13.5-21l95-96c12-12 26.667-18 44-18 17.333.667 32 7 44 19l151 159 524-433c12.667-10 26.834-14.5 42.501-13.5S959.667 158 971 170z" />
    </BaseIcon>
  );
}