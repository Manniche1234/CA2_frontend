import React, { useEffect, useState } from "react";
import { Nba_players, backEndApi, dropletURL} from "./Urls";
import facade from "../apiFacade";

const GetNbaPlayer = () => {
    const [nbaplayers, setNbaplayers] = useState();
    const [DataisLoaded, setDataisLoaded] = useState(false);
    const [searchPlayer, setSearchPlayer] = useState();
    const [playerList, setPlayerList] = useState(true);
    const [inputField, setInputField] = useState();
    const [responseFromBackEnd, setResponseFromBackEnd] = useState("");
    let idPage = 1;

    useEffect(() => {
        setDataisLoaded(false)
        fetch(Nba_players + "?pages=" + idPage)
          .then((res) => res.json())
          .then((json) => {
            setNbaplayers(json);
            setDataisLoaded(true)
          })
    }, [])

    const handleChange = (evt) =>{
      setInputField(evt.target.value);
    } 
    
    const addPlayerToUser = (first_name,last_name) =>{
      const options = facade.makeOptions("POST",true, {first_name,last_name});
      fetch(backEndApi + "/api/user/addplayer", options)
        .then((res) => res.text())
        .then((text) =>{
            setResponseFromBackEnd(text);
      })
    }
    
//      const getTables = (nbaplayers) =>{
//       return <div><ul>{nbaplayers.data.filter().map (el => {
//         return <li>{el.first_name} {el.last_name}. Played in: {el.team.full_name} <button onClick={() => addPlayerToUser(el.first_name, el.last_name)} >Add player to your roaster</button></li>
//       })}</ul>
//       <div>
//         <input onChange={handleChange} type="text" id="textInput" placeholder="Type player name"></input> 
//         <button onClick={searchplayer} type="submit">Search</button>
//         <p>{responseFromBackEnd}</p>
//        </div>
//       </div>
// }

    const searchplayer = (evt) =>{
      evt.preventDefault();
      fetch(Nba_players + "?search=" + inputField)
      .then((res)=> res.json())
      .then((json) =>{
        setSearchPlayer(json);
        setPlayerList(false);
      })
  }

    if (!DataisLoaded)
    return (
      <div>
        <h1> Fetching Data! Please wait.... </h1>{" "}
      </div>
      
    );
        if(playerList)
        return <div><ul>{nbaplayers.data.map (el => {
          return <li>{el.first_name} {el.last_name}. Played in: {el.team.full_name} <button onClick={() => addPlayerToUser(el.first_name, el.last_name)} >Add player to your roaster</button></li>
        })}</ul>
        <p>{responseFromBackEnd}</p>
        <div>
          <input onChange={handleChange} type="text" id="textInput" placeholder="Type player name"></input> 
          <button onClick={searchplayer} type="submit">Search</button>
        </div>
      
      </div>
       
    //   if (playerList){
    //     return getTables(nbaplayers);
    //   }


    // return getTables(searchPlayer);

       return <div>{searchPlayer.data.map (el => {
        return <li>{el.first_name} {el.last_name}. Played in: {el.team.full_name} <button onClick={() => addPlayerToUser(el.first_name, el.last_name)}>Add player to your roaster</button></li>
        })}
        <p>{responseFromBackEnd}</p>
         <div>
          <input onChange={handleChange} type="text" id="textInput" placeholder="Type player name"></input>
          <button  onClick={searchplayer} type="submit">Search</button>
        </div>
       </div>
        

}


export default GetNbaPlayer;
