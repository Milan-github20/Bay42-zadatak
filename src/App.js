import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";
// import dataJson from "./data/data.json";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

//Zakomentarisani su dijelovi koda koji ste rekli da se skinu sa onog linka JSON podaci pa da se manipuliše sa njima
//Napravio sam i data.json fajl pa sam tu skinute JSON podatke smjesio pa kasnije manipulisao s njima
//Drugi način je sa AXIOS bibliotekom, zato ću morati koristiti url adresu JSON-a

function App() {
  // const [data, setData] = useState([]);
  const [dataAxios, setDataAxios] = useState([]);
  const [loading, setLoading] = useState(false);

  //Funkcija za fetchovanje podataka sa datog linka

  const fetchData = () => {
    // setData(dataJson);
    axios
      .get("https://data.binance.com/api/v3/ticker/24hr")
      .then((response) => {
        setDataAxios(response.data);
      });
  };

  //Pozivanje funkcije samo jednom pri pokretanju aplikacije

  useEffect(() => {
    setLoading(true);
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="main">
      {loading ? (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          height="100"
          width="50"
          visible={true}
        />
      ) : (
        <Table
          // data={data}
          dataAxios={dataAxios}
        />
      )}
    </div>
  );
}

export default App;
