import { useRef } from "react";
export default function MyForm(){
    const inputRef = useRef(null)//It is objectliteral and current is property(variable) which is null -> inputRef = {current:null} key value
    console.log(inputRef)
    function handleClick(){
        inputRef.current.focus();
    }
    return (
        <div>
            <input ref={inputRef} type="text"/>
            <button onClick={handleClick}>focus</button>
        </div>
    )
}