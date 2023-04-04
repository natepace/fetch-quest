import * as React from "react";
import { createContext, useState } from "react";

// export const ThemeContext = createContext({
//     isMatrix: false,
//     toggleMatrix: () => {}
// })
const ThemeContext = createContext(false);

const ThemeProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const toggler = () => {
    setToggle(!toggle);
  };
  return (
    <ThemeContext.Provider value={{ toggle, toggler }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
