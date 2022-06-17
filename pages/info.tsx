import BarExample from "../components/graphs/Bar_ts";
import Graph from "../components/graphs/AntBar"

import {NextPage} from "next";
import React, {useState, createContext} from "react";
// import { useRouter } from "next/router";
// import {Button, Slider} from "antd";

import { useEffect } from "react";


const dataContext = createContext([]);
const Info: NextPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('http://localhost:8080/api/v1/debt?yearFrom=2010&yearUntil=2020')
      .then((response) => response.json())
      .then((json) => setData(json,() => {console.log(data);}))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  console.log('data_req')
  console.log(data)
  return (
    <div className="flex min-h-screen justify-center items-center">
        <div className="w-96 max-w-md md:max-w-lg rounded flex-col item-center shadow-lg my-2 px-2">
            <dataContext.Provider value={ {data} }>
                <BarExample />
            </dataContext.Provider>
        </div>
    </div>
  )
}
export {Info, dataContext}
