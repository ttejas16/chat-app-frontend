import { useContext, createContext } from "react";

const ThemeContext = createContext();

function useThemeContext() {
    return useContext(ThemeContext);
}
export { ThemeContext,useThemeContext };