import { ThemeContext } from "@/hooks/themeContext";
import React, { useEffect, useState } from "react";

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(()=>{
        const savedTheme = localStorage.getItem("theme");
        if (!savedTheme || (savedTheme != "light" && savedTheme != "dark")) {
            return "light";
        }
        return savedTheme;
    });

    function toggleTheme(){
        if (theme == "light") {
            setTheme("dark");
        }
        else{
            setTheme("light");
        }
    }

    useEffect(()=>{
        
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);

        return ()=>{
            document.documentElement.classList.remove(theme);
        }
    },[theme]);

    return (
        <ThemeContext.Provider value={{ theme,setTheme,toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;