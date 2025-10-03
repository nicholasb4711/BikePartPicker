import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95";
    
    const variantClasses = {
      primary: "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500 shadow-lg hover:shadow-xl",
      secondary: "bg-white text-black border border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-400 shadow-sm hover:shadow-md",
      outline: "border-2 border-black bg-transparent text-black hover:bg-black hover:text-white focus-visible:ring-gray-400",
    };
    
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-6 text-lg",
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ""}`;

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
