import { useState } from "react";

const useWindowsSettings = () => {
  const [recent, setRecent] = useState(0);

  const incrementRecent = () => {
    setRecent((prevRecent) => prevRecent + 1);
  };

  const resetRecent = () => {
    setRecent(0);
  }
  return (
    {
      recent,
      incrementRecent,
      resetRecent,
    }
  )
}
export default useWindowsSettings