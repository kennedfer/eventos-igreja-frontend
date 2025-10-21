import { useState } from "react"

export const useRetry = (mutate: () => Promise<any>)  => {
    const [reloading, setReloading] = useState(false);

    async function onRetry(){
        setReloading(true);
        await mutate(); 
        setReloading(false);
    }

    return {reloading, onRetry}
}