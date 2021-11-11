import React, { useEffect, useState } from "react";
import { bitCoinPrice_URL } from "./Urls";
const GetBTCPrice = () => {
  const [items, setItems] = useState();
  const [DataisLoaded, setDataisLoaded] = useState(false)
  const [coinList, setCoinList] = useState([])
  const [selectedCoin, setSelectedCoin] = useState();
  let id;

  useEffect(() => {
    setDataisLoaded(false)
    fetch(bitCoinPrice_URL)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setDataisLoaded(true)
      })
      setCoinList([])
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => res.json())
      .then((json) => {
        json.coins.map(el => {
          const coin = {symbol: el.item.symbol, id:el.item.name};
          coinList.push(coin)
        })
        setCoinList(coinList);
    })}, []);

  const seachCoin = (evt) =>{
      evt.preventDefault();
      fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`)
      .then((res) => res.json())
      .then((json) =>{
        setSelectedCoin(json);
        setDataisLoaded(true);
      })
  }


  if (!DataisLoaded)
    return (
      <div>
        <h1> Fetching Data! Please wait.... </h1>{" "}
      </div>
    );

  return <div>{JSON.stringify(selectedCoin)}
    <h4> Current price on BTC in USD: {items.bpi.USD.rate}</h4>
    <div>
      <datalist id="suggestions">
        {coinList.map((el,idx) =>{
          return(
        <option key={idx}>{el.id}</option>
        )})}
      </datalist>
      <input onChange={(evt)=> id = evt.target.value} autoComplete="on" list="suggestions" /> <button onClick={seachCoin} type="submit">Seach coin Price</button>
      
    </div>

  </div>;
}

export default GetBTCPrice;
