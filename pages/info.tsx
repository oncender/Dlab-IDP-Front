import BarExample from "../components/graphs/Bar_ts";
import Graph from "../components/graphs/AntBar"

import {NextPage} from "next";
import React, {useState} from "react";
// import { useRouter } from "next/router";
// import {Button, Slider} from "antd";

import { useEffect } from "react";

const Info: NextPage = () => {
  // const router = useRouter();
  //
  // let location;
  // let windowTest;

  useEffect( () => {
      console.log(document.location);
      console.log(window.location.href);
  }, []);
  console.log('start');

  return (
    <div className="flex min-h-screen justify-center items-center">
        <div className="w-96 max-w-md md:max-w-lg rounded flex-col item-center shadow-lg my-2 px-2">
            <Graph />
            <BarExample />
        </div>
    </div>
  )
}

export default Info
