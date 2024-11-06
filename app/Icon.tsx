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
    className={`${className} material-symbols-rounded`}
    style={{ lineHeight: "15px", ...style }}
  >
    {children}
  </span>
);
