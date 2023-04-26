import { useEffect, useState } from "react";

const useBodyScrollLock = () => {
  const bodyStyle = document.body.style;
  const [isLocked, setIsLocked] = useState(null);
  
  useEffect(() => {
    bodyStyle.overflow = isLocked ? "hidden" : null;
  }, [isLocked]);

  return [isLocked, setIsLocked];
};

export default useBodyScrollLock;
