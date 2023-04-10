import { useEffect, useState } from "react";

const useBodyScrollLock = () => {
  const bodyStyle = document.body.style;
  const [isLocked, setIsLocked] = useState(bodyStyle.overflow = "auto");
  
  useEffect(() => {
    bodyStyle.overflow = isLocked ? "auto" : "hidden";
  }, [isLocked]);

  return [isLocked, setIsLocked];
};

export default useBodyScrollLock;
