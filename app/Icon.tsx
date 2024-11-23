import { memo } from "react";

export const Icon = memo(
  ({
    children,
    className,
    style = {},
  }: {
    children: any;
    className?: string;
    style?: any;
  }) => (
    <span
      className={`material-symbols-rounded ${className} select-none`}
      style={{ lineHeight: "15px", ...style }}
    >
      {children}
    </span>
  )
);

