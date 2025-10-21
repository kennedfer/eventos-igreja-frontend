type IconProps = {
    size?: number | string;
    className?: string;
    color?: string;
    [key: string]: any;
  };
  
  const Svg = ({
    children,
    size = 16,
    className = "",
    color = "currentColor",
    ...props
  }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill={color}
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
  
  export const EyeOpenIcon = (props: IconProps) => (
    <Svg {...props}>
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path
        fillRule="evenodd"
        d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        clipRule="evenodd"
      />
    </Svg>
  );
  
  export const EyeClosedIcon = (props: IconProps) => (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z"
        clipRule="evenodd"
      />
      <path d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z" />
    </Svg>
  );
  
  export const PlusIcon = (props: IconProps) => (
    <Svg {...props}>
      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
    </Svg>
  );
  
  export const CalendarIcon = (props: IconProps) => (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        d="M4 1.75a.75.75 0 0 1 1.5 0V3h5V1.75a.75.75 0 0 1 1.5 0V3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2V1.75ZM4.5 6a1 1 0 0 0-1 1v4.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-7Z"
        clipRule="evenodd"
      />
    </Svg>
  );
  
  export const WarningIcon = (props: IconProps) => (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </Svg>
  );
  