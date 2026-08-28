export default function Button({onClick,type,children,variant="primary",size="md",fullWidth=false}){
    const sizes = {
        sm: "py-2 px-3 text-sm",
        md: "py-3 px-4 text-base",
    }
    const width = fullWidth ? "w-full" : "";
    const style = (variant==="secondary")
    ? "border border-border text-muted bg-transparent hover:border-text hover:text-text active:border-muted"
    : "bg-primary text-text border-none  hover:bg-primary-hover active:bg-primary-active"; 

return(
    <button 
        type={type} 
        onClick={onClick} 
        className={`rounded-full outline-none cursor-pointer transition-all duration-150 ease-in ${style} ${sizes[size]} ${width}`}
    >
        {children}
    </button>   
);
}