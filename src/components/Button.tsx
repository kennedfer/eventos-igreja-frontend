import type { ButtonHTMLAttributes } from "react";
import { PlusIcon } from "./Icons";

type ButtonColors = "primary" | "secondary" | "destructive";
type ButtonVariants = "solid" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColors;
  variant?: ButtonVariants;
  isLoading?: boolean;
}

const baseClasses =
  "appearance-none cursor-pointer block px-3 py-2 rounded-md focus:outline-none sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses: Record<ButtonColors, Record<ButtonVariants, string>> = {
  primary: {
    solid: "bg-primary text-white hover:brightness-90 active:brightness-80",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-primary hover:bg-primary/10 border-none shadow-none",
  },
  secondary: {
    solid:
      "bg-background-light border border-border-light text-text-light hover:bg-gray-200 active:bg-gray-300",
    outline:
      "border border-border-light text-text-light hover:bg-gray-100",
    ghost: "text-text-light hover:bg-gray-100",
  },
  destructive: {
    solid: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-red-600 text-red-600 hover:bg-red-50",
    ghost: "text-red-600 hover:bg-red-50",
  },
};

export const Button = ({
  color = "primary",
  variant = "solid",
  className = "",
  type = "button",
  children,
  isLoading,
  ...props
}: ButtonProps) => {
  const classes = `${baseClasses} ${variantClasses[color][variant]} ${className}`.trim();

  return (
    <button disabled={isLoading} type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export const PlusButton = ({children, ...props}:ButtonProps) => <Button {...props}>
  <PlusIcon/>
  {children}
</Button>