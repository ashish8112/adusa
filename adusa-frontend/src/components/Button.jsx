export default function Button({onClick,type,children,variant="primary"}){
    const style=(variant==="secondary")?"border border-border text-muted bg-transparent hover:border-text hover:text-text active:border-muted":"bg-primary text-text border-none  hover:bg-primary-hover active:bg-primary-active"; 

return(
    <button type={type} onClick={onClick} className={`py-3 px-4 rounded-full outline-none w-full md:w-auto cursor-pointer  transition-all duration-150 ease-in ${style}`}>{children}</button>
)
}