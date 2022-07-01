// import styles from "../../styles/Card.scss"
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import Link from 'next/link'
import {Avatar, Card, Skeleton, Switch, Col, Row} from 'antd';
import React, {ReactNode, useState} from 'react';
import {useRouter} from "next/router";


import {getTempRem} from "../const/p2Utils"
import {cardComp} from "../const/p2Usertyp";
import {CARD_LABELS, TEMPCSS} from "../const/p2Constant"

const {Meta} = Card;

const CartPart = ({keystring, cardData}:
                      { keystring: string, cardData: cardComp, }) => {
    if (!cardData.sdaterate){
        return};
    const image_url = cardData.img ? cardData.img : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
    const col4Data = [`${cardData.loanamt}억`, `${cardData.loan}억`, `${cardData.sdaterate.toFixed(2)}%`, cardData.duration,
            cardData.it,cardData.at,cardData.seniorstr
    ]


    const router = useRouter()

    return (

        <Card key={keystring} hoverable
              custom="ROW" onClick={() => router.push({
                pathname: '/detailInfo',
                query: {idx: cardData.idx, fc: cardData.fc},
                options: { shallow: true }
            },
            "/detailInfo")
        }>
            {/*style={Col1S}*/}
            <div key = {keystring+'col1'} className={'col1'}>
                <img
                    key = {keystring+'col1'+'img'}
                    alt="example" src={image_url}
                     style={{
                         width: '100%',
                         height: '100%'
                     }}/>
            </div>
            <div key = {keystring+'col2'} className='col2'>
                <Meta description={cardData.loancls} key={`${keystring}col20`}
                      custom={'col20'}
                />
                <Meta description={cardData.an} key={`${keystring}col21`}
                      custom={'col21'}
                />
                <Meta description={cardData.fn} key={`${keystring}col22`}
                      custom={'col22'} style={{color: '#1C6FBC'}}/>
                <Meta description={cardData.lpcorp} key={`${keystring}col23`}
                      custom={'col23'} style={{color: '#1C6FBC'}}/>
            </div>
            <div key = {keystring+'col3'} className='col3'>
                {[CARD_LABELS.loanamt, CARD_LABELS.loan, CARD_LABELS.sdaterate, CARD_LABELS.duration,
                    CARD_LABELS.it,CARD_LABELS.at,CARD_LABELS.seniorstr
                ].map(
                    (val, id) => {
                        return (<Meta key={`${keystring}col3${id}`} description={val}/>)
                    }
                )}
            </div>
            <div key = {keystring+'col4'} className='col4'>
                {col4Data.map(
                    (val, id) => {
                        return (<Meta key={`${keystring}col4${id}`} description={val}
                        />)
                    }
                )}
            </div>
        </Card>
)
}


const CompCardGroup = ({data, refFunc,fontRel}:
                           { data: cardComp[], refFunc: Function,fontRel:{[key:string]:number}}
) => {
    if (data == undefined) return;

    function byte_length(str: string) {
        var count = 0;
        var ch = '';
        for (var i = 0; i < str.length; i++) {
            ch = str.charAt(i);
            if (escape(ch).length == 6) {
                count++;
            }
            count++;
        }
        return count;
    }

    function byte_slice(str: string, target: number) {
        var count = 0;
        var ch = '';
        for (var i = 0; i < str.length; i++) {
            ch = str.charAt(i);
            if (escape(ch).length == 6) {
                count++;
            }
            count++;
            if (count >= target) {
                return i
            }
        }
        return i;
    }

    function moreThanFig(str: string, tval: number) {
        if (byte_length(str) > tval) {
                    return str.slice(0, byte_slice(str, tval - 3)) + "..."
                } else {
                    return str
                }
    }

    var newdata = [...data.map((val)=>Object.assign({},val))]
    newdata = newdata.map((val) => {
        val.fn = moreThanFig(val.fn, fontRel.fn)
        val.an = moreThanFig(val.an, fontRel.an)
        val.lpcorp = moreThanFig(val.lpcorp, fontRel.lpcorp)
        return val
    })
    // console.log(cardData.fn,byte_length(cardData.fn))
    // console.log(cardData.an,byte_length(cardData.an))

    const cardParts = newdata.map((val, idx) => {
        const isLastElement = data.length === idx + 1;
        // keystring={val.fn + val.lpcorp}
        return (
            isLastElement ? (
                <div key={'cardlast'} ref={refFunc} >
                    <CartPart key ={`card${idx}main`}  keystring={`card${idx}`} cardData={val}/>
                </div>
            ) : (
                <CartPart key ={`card${idx}main`} keystring={`card${idx}`} cardData={val}/>
            )
        )
    })

    return (
        <div key={'cardGroup'} className="cardGroupWrap">
            {cardParts}
        </div>
    )
};

// {/*<Switch checked={!loading} onChange={() => (setLoading(!loading))}/>*/}


export default CompCardGroup
