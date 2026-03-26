import React from "react";
import "./Button.css"
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


// button models -------------


                  // <Button>Primary</Button>
            
                  // <Button variant="secondary">
                  //   Secondary
                  // </Button>
            
                  // <Button variant="outline" onClick={() => alert("Clicked")}>
                  //   Click Me
                  // </Button>