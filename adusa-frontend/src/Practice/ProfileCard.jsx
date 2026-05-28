import { useContext } from "react";
import { UserContext } from "./UseContext";
export default function ProfileCard()
{
    const user = useContext(UserContext)
    return(<h2>{user.name}-{user.branch}</h2>)
}