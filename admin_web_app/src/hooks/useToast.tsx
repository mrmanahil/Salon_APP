import { useState, useRef } from "react";

function useToast(): [boolean, (open: boolean) => void] {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const setOpen = (open: boolean) => {
    if (open !== isOpen) {
      if (open) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setIsOpen(true);
        // timeoutRef.current = setTimeout(() => {
        //   setIsOpen(false);
        //   timeoutRef.current = null;
        // }, 400);
      } else {
        setIsOpen(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    }
  };

  return [isOpen, setOpen];
}

export default useToast;
