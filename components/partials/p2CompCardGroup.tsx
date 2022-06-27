import styles from "../../styles/Card.module.scss"
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import {Avatar, Card, Skeleton, Switch, Col, Row} from 'antd';
import React, {ReactNode, useState} from 'react';

import {getTempRem} from "../const/p2Utils"
import {cardComp} from "../const/p2Usertyp";
import {CARD_LABELS, TEMPCSS} from "../const/p2Constant"

const {Meta} = Card;

const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
};

const CardPart = ({key, cardData, stylesJS}:
                      { key: string, cardData: cardComp, stylesJS: { [key: string]: string } }
) => {
    // console.log({
    //             width: getTempRem(TEMPCSS.width, 980),
    //             height: getTempRem(TEMPCSS.height, 180),
    //         })
    const image_url = cardData.img ? cardData.img : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
    console.log("cardD", cardData.img)
    return (
        <div key={key} style={stylesJS}>
            <Card hoverable style={
                {
                    'display': 'grid',
                    'grid-template-columns': 'repeat(10,10%fr)',
                    'grid-template-rows': 'repeat(10,5%fr)',
                    'width': '200px'
                }
            }>
                <Card
                    className={styles.cardImage}
                    key={key + "col1"}
                    cover={<img alt="example" src={image_url}/>}
                />
                <div>
                    <Meta title={cardData.lpcorp}/>
                    <Meta description={cardData.fn}/>
                    <Meta title={cardData.an}/>
                </div>
                <div>
                    <Meta description={CARD_LABELS.loanamt}/>
                    <Meta description={CARD_LABELS.aum}/>
                    <Meta description={CARD_LABELS.sdaterate}/>
                    <Meta description={CARD_LABELS.duration}/>
                </div>
                <div>
                    <Meta description={`${cardData.loanamt}억`}/>
                    <Meta description={`${cardData.aum}억`}/>
                    <Meta description={`${cardData.sdaterate.toFixed(2)}%`}/>
                    <Meta description={cardData.duration}/>
                </div>
                {/*<Skeleton loading={loading} avatar active>*/}
                {/*        <Meta*/}
                {/*            avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}*/}
                {/*            title="Card title"*/}
                {/*            description="This is the description"*/}
                {/*        />*/}
                {/*    </Skeleton>*/}
            </Card>
        </div>
    )
}
const CartPartBe = ({keystring, cardData}:
                        { keystring: string, cardData: cardComp, }) => {
    const image_url = cardData.img ? cardData.img : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
    console.log("cardD", cardData.img)
    const w = '100%';
    const h = 200;
    const bodyS = {
        'width': w, 'height': h, display: 'grid',
        gridTemplateRows: 'repeat(10,10%)', gridTemplateColumns: 'repeat(40, 2.5%)',
        paddingBottom: '5px', paddingTop: '5px', paddingLeft: '5px', paddingRight: '5px'
    }
    const Col1S = {
        gridColumn: '1/6',
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
        gridColumn: '7/28',
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

    return (
        <Card key={keystring} hoverable
              style={{
                  display: 'flex',
                  marginTop: '5px',
                  marginBottom: '5px',

              }}
              bodyStyle={bodyS}>
            <div style={Col1S}>
                <img alt="example" src={image_url}
                     style={{
                         width: '100%',
                         height: '100%'
                     }}/>
            </div>
            <div style={Col2S}>
                {[cardData.lpcorp, cardData.fn, cardData.an].map(
                    (val) => {
                        return (<span style={{width: '100%'}}>{val}</span>)
                    }
                )}
            </div>
            <div style={Col3S}>
                {[CARD_LABELS.loanamt, CARD_LABELS.aum, CARD_LABELS.sdaterate, CARD_LABELS.duration].map(
                    (val) => {
                        return (<span style={{width: '100%'}}>{val}</span>)
                    }
                )}
                {/*{[CARD_LABELS.loanamt, CARD_LABELS.aum, CARD_LABELS.sdaterate, CARD_LABELS.duration].map(*/}
                {/*    (val) => {*/}
                {/*        return (<Meta description={val}/>)*/}
                {/*    }*/}
                {/*)}*/}
            </div>
            <div style={Col4S}>
                <span style={{width: '100%'}}>{`${cardData.loanamt}억`} </span>
                <span style={{width: '100%'}}>{`${cardData.aum}억`}</span>
                <span style={{width: '100%'}}>{`${cardData.sdaterate.toFixed(2)}%`}</span>
                <span style={{width: '100%'}}>{cardData.duration} </span>
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

    const cardParts = data.map((val, idx) => {
        const isLastElement = data.length - 1 === idx + 1;
        // keystring={val.fn + val.lpcorp}
        return (
            isLastElement ? (
                <div ref={refFunc}>
                    <CartPartBe key={`card${idx}`} cardData={val}/>
                </div>
            ) : (
                <CartPartBe key={`card${idx}`} cardData={val}/>
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
