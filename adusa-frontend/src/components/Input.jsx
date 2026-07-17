export default function Input({label,name,type,placeholder,value,onChange,id}){
    return(
        <div className="flex flex-col">
           <label htmlFor={id} className="text-muted my-1 mx-0">{label}</label>
           <input className="w-full rounded-md border border-border py-3 px-4 focus:outline-none focus:border-primary bg-surface text-text transition-all duration-300 ease-in" type={type} name={name} value={value} placeholder={placeholder}  onChange={onChange} id={id}/>
        </div>
    )
}