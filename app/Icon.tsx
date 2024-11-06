export const Icon = ({
  children,
  className,
}: {
  children: any;
  className?: string;
}) => (
  <span
    className={`${className} material-symbols-rounded`}
    style={{ lineHeight: "15px" }}
  >
    {children}
  </span>
);
