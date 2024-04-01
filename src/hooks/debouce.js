import { useState,useEffect } from "react";

function useDebounce(timeout,initialValue){
    const [state,setState] = useState(initialValue);
    
    let id;

    function stateSetter(value) {
        clearTimeout(id);

        id = setTimeout(()=>{
            setState(value);
        },[timeout])
    }

    return [state,stateSetter];
    
}

export { useDebounce };