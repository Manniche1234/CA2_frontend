import React, { useEffect, useState } from "react";
import {backEndApi,dropletURL} from "./Urls";
import facade from "../apiFacade";

const User = () => {
    const [user, setUser] = useState();
    const [DataisLoaded, setDataisLoaded] = useState(false);



    useEffect(()=>{
        setDataisLoaded(false)
        const options = facade.makeOptions("GET",true);
        fetch(backEndApi + "/api/user/getuser", options)
        .then((res) => res.json())
        .then((json) => {
            setUser(json);
            setDataisLoaded(true);
        })
    },[])



    if (!DataisLoaded)
    return (
      <div>
        <h1> Fetching Data! Please wait.... </h1>{" "}
      </div>
    );

    return <div><ul>{user.players.map (el => {
        return <li>{el.first_name} {el.last_name}</li>
    })} </ul></div>
          

}

export default User;