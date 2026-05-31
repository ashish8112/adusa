import FetchUser from "../component/FetchComponent"
import ProfileCard from "./ProfileCard"
import TimeCount from "./TimeCountuseRef"
import { UserContext } from "./UseContext"
import MyForm from "./useRef"

export default OldApp()
{
     // return (
  //   <div className='container'>
  //     <h1>Welcome to Adusa</h1>
  //     <StudentCard name="Ashu" college="Kristu Jayanti" branch="MCA" />
  //     <br></br>
  //     <StudentCard name="Amrita" college="IIM" branch="MBA" bio="Radhey Radhey" />
  //     <h2>To Run on mobile use npm run dev -- --host. It will expose to ip not only on localhost</h2>
  //   </div>
  // )
  const user = {name:"Ashu",college:"Kristu Jayanti",branch:"MCA"}
  return(
    <div>
         <UserFetch />  {/* To fetch users using fetch component */}
    <MyForm/>
    <TimeCount/>
    <UserContext.Provider value={user}>{/*Wrapping UserContext global variable*/} 
      <ProfileCard/>
    </UserContext.Provider>
    <FetchUser/>  {/*Fetching User using custom hooks*/}
    </div>
  )
}