export default function BuggyComponent(){
throw new Error ("I crashed");
return <h1>I am Fine </h1>
}