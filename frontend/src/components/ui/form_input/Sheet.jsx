import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SheetContext = React.createContext();

export const Sheet = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
};

export const SheetTrigger = ({ children }) => {
  const { setOpen } = React.useContext(SheetContext);
  return (
    <button onClick={() => setOpen(true)} className="text-2xl text-muted-foreground">
      {children}
    </button>
  );
};

export const SheetContent = ({ children, side = "right", className = "" }) => {
  const { open, setOpen } = React.useContext(SheetContext);

  const getPositionStyles = () => {
    switch (side) {
      case "left":
        return { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" }, position: "left-0 top-0" };
      case "bottom":
        return { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" }, position: "bottom-0 left-0 w-full" };
      case "right":
      default:
        return { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" }, position: "right-0 top-0" };
    }
  };

  const position = getPositionStyles();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className={`fixed ${position.position} h-full bg-background z-50 shadow-lg p-6 ${className}`}
            initial={position.initial}
            animate={position.animate}
            exit={position.exit}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const SheetClose = ({ children, asChild = false }) => {
  const { setOpen } = React.useContext(SheetContext);

  const handleClose = () => {
    setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClose,
    });
  }

  return <button onClick={handleClose}>{children}</button>;
};
