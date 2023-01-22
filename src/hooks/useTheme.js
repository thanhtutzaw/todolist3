import { useEffect, useState } from 'react';

export default function useTheme() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        if(localStorage.getItem('theme') === null){
            localStorage.setItem("theme", "light")
        }
        if(theme === "light"){
            console.log("light")
            localStorage.setItem("theme", theme)
            document.documentElement.setAttribute("theme",theme)
        }else{
            console.log("dark")
            localStorage.setItem("theme", theme)
            document.documentElement.setAttribute("theme",theme)
        }
    }, [theme]);
    return { theme, setTheme }
}
