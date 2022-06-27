import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextPage } from 'next';

import { APIURL } from '../components/constants/page3Const';
import {aumLpcorp, rateAtData} from "../components/const/p2Usertyp";

const DetailINfo: NextPage  = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log('home')
    console.log(props)
    return (
        <div></div>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {

   const data = await fetch('https://gw.alipayobjects.com/os/bmw-prod/0b37279d-1674-42b4-b285-29683747ad9a.json')
        .then((response) => response.json())

    // const res = await fetch(
    //     APIURL.TABLE + '?' + new URLSearchParams({
    //         fc: '112001',
    //         idx: '4',
    //     }),
    //     {
    //         method: "get",
    //         mode: "no-cors"
    //     }
    // );
    // const data = await res.json();
    const numVal = [1,2,3]
    return {
        props: { data , numVal },
    }
};

// function Sup({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//     console.log('s' + data.desc);

// };



export default DetailINfo;

// export default Sup;

