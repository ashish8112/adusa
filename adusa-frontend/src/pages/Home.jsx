import { Link,useNavigate } from "react-router-dom";
import AxiosDemo from "../component/AxiosDemo";
import ErrorBoundary from "../practice/ErrorBoundary";
import BuggyComponent from "../practice/BuggyComponent";

function Home(){
  const navigate= useNavigate();

  return(
    <div className='parent'>
    <h1>Home Page</h1>
    <Link to ="/login">Go to Login</Link> {/*It is creating clickable link which is appending this string in our url */}
    <br></br>
    <button onClick={()=>navigate("/profile/123")}>Go to Profile</button> {/*Same as above but in button */} 
    <AxiosDemo/>
     <ErrorBoundary>
        <BuggyComponent/>
    </ErrorBoundary>
    </div>
  )
  
}
export default Home;