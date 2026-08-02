export function getInitials(name)
{
    if(!name)
        return "?"
    return name.trim().split(/\s+/).map(w=>w[0]).join("").toUpperCase();
    //Suppose Ashish Kr. Shukla so name.split(" ") => ["Ashish","Kr.","Shukla"] now .map(w(Ashish)=>w[0](A)).join("").To captial 
    //note map is at array means first Ashish then Kr. and then Shukla will traverse like this for each index we are performing w[0] AKS 
}