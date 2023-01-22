import { useEffect, useState } from 'react';

export default function useTheme() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    useEffect(() => {
        // const currentTheme = localStorage.getItem('theme');
        // if (currentTheme) {
        //     setTheme(currentTheme);
        // }
        function storageCallback(event) {
            if (event.key === "theme") {
                setTheme(event.newValue)
            }
        }
        window.addEventListener('storage', storageCallback)
        return () => {
            window.removeEventListener('storage', storageCallback)
        };
    }, []);
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
            // if (localStorage.getItem('theme') === null) {
            //     localStorage.setItem("theme", "light")
            // }
        if (theme === "light") {
            console.log("light")
            localStorage.setItem("theme", theme)
            document.documentElement.setAttribute("theme", theme)
        } else {
            console.log("dark")
            localStorage.setItem("theme", theme)
            document.documentElement.setAttribute("theme", theme)
        }
    }, [theme]);
    return { theme, setTheme }
}
