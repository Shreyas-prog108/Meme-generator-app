import React, { useEffect, useState } from "react";
import MemeCard from "../components/cards";
import { getAllMemes } from "../api/memes";

const HomePage=()=>{
    const [data,getData]=useState([]);
    useEffect(()=>{
        getAllMemes().then((memes)=>getData(memes.data.memes));
    },[]);

    return (
        <div className="row">
           {data.map((el)=>(
            <MemeCard img={el.url} title={el.name}/>
           ))}
        </div>
    )
}

export default HomePage;