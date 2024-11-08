export const Icon = ({
  children,
  className,
  style = {},
}: {
  children: any;
  className?: string;
  style?: any;
}) => (
  <span
    className={`material-symbols-rounded ${className}`}
    style={{ lineHeight: "15px", ...style }}
  >
    {children}
  </span>
);
