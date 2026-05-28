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