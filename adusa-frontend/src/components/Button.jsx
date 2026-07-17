export default function Button({onClick,type,children,variant="primary"}){
    const style=(variant==="secondary")?"border border-primary text-primary bg-transparent active:bg-gray-500":"bg-primary text-text border-none active:bg-secondary";

return(
    <button type={type} onClick={onClick} className={`py-3 px-4 rounded-lg outline-none w-full cursor-pointer my-5 mx-0 transition-all duration-300 ease-in ${style}`}>{children}</button>
)
}