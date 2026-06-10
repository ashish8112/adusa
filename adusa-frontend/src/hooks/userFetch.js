import { useState, useEffect } from "react";

function useFetchData(url) //note custom hook should start use following any (Identifier)
{
const [data,setData]=useState([])
const [loading,setLoading]=useState(true)
const [error,setError]=useState(null)
useEffect(()=>{
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        setData(data);
        setLoading(false);
    })
    .catch((err)=>{
        setError(err.message);
        setLoading(false);
    })
},[])
return {data,loading,error}
}

export default useFetchData

//In simple we have created a function and returned some values like array we return likewise we are returning object. above
//This is customHook, In normal function jsx will give error we when use in-built hook like useState , useEffect etc . so we use prefix "use" to create 
// custom hooks to use in-built hooks , note : in-built hook can be used in inside component and custom hooks only..