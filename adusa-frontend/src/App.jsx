import StudentCard from './component/StudentCard'
import UserFetch from './component/UserFetch';
function App()
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
  return(
    <UserFetch />
  )
}

export default App;