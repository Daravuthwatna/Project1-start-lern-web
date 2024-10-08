import { useRef } from "react";

const useDebounce = () => {
  let timeoutId = useRef(null);

  const debounce = (cbFun, delay = 2000) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(cbFun, delay);
  };
  return debounce;
}

export default useDebounce;