import { useEffect, useState } from 'react';

export default function useTheme() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    useEffect(() => {
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
        if (theme === "light") {
            localStorage.setItem("theme", theme)
            document.documentElement.setAttribute("theme", theme)
        } else {
            localStorage.setItem("theme", theme)
            document.documentElement.setAttribute("theme", theme)
        }
    }, [theme]);
    return { theme, setTheme }
}