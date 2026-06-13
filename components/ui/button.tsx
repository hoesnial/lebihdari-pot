import { forwardRef, type ButtonHTMLAttributes } from "react";

const variants = {
  primary: "bg-tertiary text-white hover:opacity-90 shadow-md",
  secondary:
    "bg-primary-container text-white hover:opacity-90",
  outline:
    "border border-primary text-primary hover:bg-primary/5",
  ghost: "text-primary hover:bg-primary/5",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5",
  lg: "px-8 py-4 text-lg",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
