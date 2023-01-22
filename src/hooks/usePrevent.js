import { useEffect, useState } from 'react';

export default function usePrevent() {
    const [isPrevent, setisPrevent] = useState(false);

    useEffect(() => {
        function preventRefresh(event) {
            event.returnValue = 'You have unfinished changes!';
        }
        if (isPrevent) {
            window.addEventListener('beforeunload', preventRefresh);
        }
        return () => {
            window.removeEventListener('beforeunload', preventRefresh)
        }
    }, [isPrevent, setisPrevent]);
    return {isPrevent , setisPrevent}
}
