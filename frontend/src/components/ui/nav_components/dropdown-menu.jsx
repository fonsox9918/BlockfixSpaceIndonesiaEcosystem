// src/components/ui/nav_components/dropdown-menu.jsx
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export const DropdownMenu = ({ children }) => {
  return <div className="relative inline-block text-left">{children}</div>;
};

export const DropdownMenuTrigger = React.forwardRef(
  ({ asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, { ref, ...props });
    }
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent = ({ className, children }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        triggerRef.current &&
        triggerRef.current.contains(e.target)
      ) {
        setOpen((prev) => !prev);
      } else if (
        contentRef.current &&
        !contentRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <div ref={triggerRef}></div>
      {open && (
        <div
          ref={contentRef}
          className={cn(
            "absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black/5 focus:outline-none",
            className
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};

export const DropdownMenuLabel = ({ children }) => {
  return (
    <div className="px-4 py-2 text-sm font-medium text-muted-foreground dark:text-white">
      {children}
    </div>
  );
};

export const DropdownMenuItem = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center px-4 py-2 text-sm hover:bg-muted dark:hover:bg-zinc-700 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const DropdownMenuSeparator = () => {
  return <div className="my-1 h-px bg-border dark:bg-zinc-600" />;
};
