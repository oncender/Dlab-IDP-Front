import React, {Component} from "react";
import {Column} from '@ant-design/plots';
import Header from "../Header";
import Footer from "../Footer";
import {Bar} from "react-chartjs-2";

const data = [
            {
                type: 'test1',
                value: 38,
            },
            {
                type: 'test2',
                value: 52,
            },
            {
                type: 'test3',
                value: 61,
            },
            {
                type: 'test4',
                value: 145,
            }
            ]

function Graph() {
    const config = {
        data: data,
        xField: 'type',
        yField: 'value',
        style: {
            height: '400px',
            width: '400px'
        }
    };
    return (
        <Column {...config} />
    );
}



export default Graph;