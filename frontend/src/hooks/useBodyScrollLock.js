import { useEffect, useState } from "react";

const useBodyScrollLock = () => {
  const [isLocked, setIsLocked] = useState(null);

  useEffect(() => {
    const bodyStyle = document.body.style;
    bodyStyle.overflow = isLocked ? "hidden" : null;
  }, [isLocked]);

  return [isLocked, setIsLocked];
};

export default useBodyScrollLock;
