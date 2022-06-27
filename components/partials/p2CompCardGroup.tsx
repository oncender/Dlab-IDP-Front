// import styles from "../../styles/Card.scss"
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import {Avatar, Card, Skeleton, Switch, Col, Row} from 'antd';
import React, {ReactNode, useState} from 'react';

import {getTempRem} from "../const/p2Utils"
import {cardComp} from "../const/p2Usertyp";
import {CARD_LABELS, TEMPCSS} from "../const/p2Constant"

const {Meta} = Card;

const CartPart = ({keystring, cardData}:
                      { keystring: string, cardData: cardComp, }) => {
    const image_url = cardData.img ? cardData.img : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
    console.log("cardD", cardData.img)
    const w = '100%';
    const h = 200;
    const col4Data = [`${cardData.loanamt}억`, `${cardData.aum}억`, `${cardData.sdaterate.toFixed(2)}%`, cardData.duration]
    const bodyS = {
        'width': w, 'height': h, display: 'grid',
        gridTemplateRows: 'repeat(10,10%)', gridTemplateColumns: 'repeat(40, 2.5%)',
        paddingBottom: '5px', paddingTop: '5px', paddingLeft: '5px', paddingRight: '5px'
    }
    const Col1S = {
        gridColumn: '1/7',
        gridRow: '1/11',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    }
    const Col2S = {
        display: 'flex',
        gridRow: '1/11',
        flexFlow: 'row wrap',
        gridColumn: '8/28',
        alignContent: 'space-around',
    }
    const Col3S = {
        display: 'flex',
        gridRow: '1/11',
        flexFlow: 'row wrap',
        gridColumn: '29/35',
        alignContent: 'space-around',
    }
    const Col4S = {
        display: 'flex',
        gridRow: '1/11',
        flexFlow: 'row wrap',
        gridColumn: '36/41',
        alignContent: 'space-around',
    }
    // @ts-ignore
    // @ts-ignore
    function byte_length(str:string) {
        var count = 0;
        var ch = '';
        for (var i = 0; i < str.length; i++) {
            ch = str.charAt(i);
            if (encodeURI(ch).length == 6) {
                count++;
            }
            count++;
        }
        return count;
    }
    console.log(cardData.fn,byte_length(cardData.fn))
    return (
        <Card key={keystring} hoverable
              custom="ROW"
              bodyStyle={bodyS}
        >
            {/*style={Col1S}*/}
            <div className={'col1'}>
                <img alt="example" src={image_url}
                     style={{
                         width: '100%',
                         height: '100%'
                     }}/>
            </div>
            <div className='col2'>
                <Meta description={cardData.lpcorp} key={`${keystring}col20`}
                      custom={'col20'}
                />
                <Meta description={cardData.fn} key={`${keystring}col21`}
                      custom={'col21'}
                />
                <Meta description={cardData.an} key={`${keystring}col22`}
                      custom={'col22'} style={{color: '#1C6FBC'}}/>
            </div>
            <div className='col3'>
                {[CARD_LABELS.loanamt, CARD_LABELS.aum, CARD_LABELS.sdaterate, CARD_LABELS.duration].map(
                    (val, id) => {
                        return (<Meta key={`${keystring}col3${id}`} description={val}/>)
                    }
                )}
            </div>
            <div className='col4'>
                {col4Data.map(
                    (val, id) => {
                        return (<Meta key={`${keystring}col4${id}`} description={val}
                                      />)
                    }
                )}
            </div>

            {/*<Skeleton loading={loading} avatar active>*/}
            {/*        <Meta*/}
            {/*            avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}*/}
            {/*            title="Card title"*/}
            {/*            description="This is the description"*/}
            {/*        />*/}
            {/*    </Skeleton>*/}
        </Card>)
}


const CompCardGroup = ({data, refFunc}:
                           { data: cardComp[], refFunc: Function }
) => {
    if (data == undefined) return;
    function byte_length(str:string) {
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
    function byte_slice(str:string,target:number) {
        var count = 0;
        var ch = '';
        for (var i = 0; i < str.length; i++) {
            ch = str.charAt(i);
            if (escape(ch).length == 6) {
                count++;
            }
            count++;
            if (count >=target){
                return i
            }
        }
        return i;
    }
    function moreThanFig(str:string,typ:string){
        switch (typ){
            case 'an':
                var tval = 60
                if (byte_length(str) > tval){
                    return str.slice(0,byte_slice(str,tval-3))+"..."
                } else {
                    return str
                }
            case 'fn':
                var tval = 42
                if (byte_length(str) > tval){
                    return str.slice(0,byte_slice(str,tval-3))+"..."
                } else {
                    return str
                }
        }
    }
    data = data.map((val) => {
        val.fn = moreThanFig(val.fn,'fn')
        val.an = moreThanFig(val.an,'an')
        return val
     })
    // console.log(cardData.fn,byte_length(cardData.fn))
    // console.log(cardData.an,byte_length(cardData.an))

    const cardParts = data.map((val, idx) => {
        const isLastElement = data.length - 1 === idx + 1;
        // keystring={val.fn + val.lpcorp}
        return (
            isLastElement ? (
                <div ref={refFunc}>
                    <CartPart key={`card${idx}`} cardData={val}/>
                </div>
            ) : (
                <CartPart key={`card${idx}`} cardData={val}/>
            )
        )
    })

    return (
        <div>
            {cardParts}
        </div>
    )
};

// {/*<Switch checked={!loading} onChange={() => (setLoading(!loading))}/>*/}


export default CompCardGroup
