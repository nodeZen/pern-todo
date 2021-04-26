import React,{Fragment, useEffect, useState} from 'react';
import axios from 'axios';

const Dashboard =({setAuth})=>{
    const [name,setName]= useState("");
    const getName = async()=>{
        const response = await axios.get("http://localhost:3001/todo-crud/",{
            headers:{
                token:localStorage.token
            }
        })

        setName(response.data);
    };

    useEffect(()=>{
        getName();
    },[]);

    const logoutHandler = ()=>{
        localStorage.removeItem("token");
        setAuth(false);
    }

    return <Fragment>
         <h1 className="text-center my-5">Dashboard</h1>
         <h2 className="text-center my-5">Hi {name}</h2>
         <button className="btn btn-success" onClick = {logoutHandler}>
          Logout
        </button>
    </Fragment>
}

export default Dashboard;