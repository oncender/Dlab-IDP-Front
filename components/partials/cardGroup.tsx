import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import {Avatar, Card, Skeleton, Switch, Col, Row} from 'antd';
import React, {ReactNode, useState} from 'react';

import {getTempRem} from "../const/utils"
import {cardComp} from "../const/usertyp";
import {CARD_LABELS, TEMPCSS} from "../const/constant"

const {Meta} = Card;

const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
};

const CardPart = ({keystring, cardData, loading}: { keystring: string, cardData: cardComp, loading: boolean }) => {
    // console.log({
    //             width: getTempRem(TEMPCSS.width, 980),
    //             height: getTempRem(TEMPCSS.height, 180),
    //         })
    return (
        <Card key={keystring} hoverable>
            <Row>
                <Col>
                    <Card key={keystring + "col1"}
                          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                      style={{
                                          width: 184,
                                          height: 184
                                      }}/>}
                          style={{width: (980 / 5 * 1)}}
                    />
                </Col>
                <Col style={{width: (980 / 5 * 3)}}>
                    <Meta title={cardData.lpcorp}/>
                    <Meta description={cardData.fn}/>
                    <Meta title={cardData.an}/>
                </Col>
                <Col style={{width: (980 / 5 * 1)}}>
                    <Meta description={CARD_LABELS.loanamt}/>
                    <Meta description={CARD_LABELS.aum}/>
                    <Meta description={CARD_LABELS.sdaterate}/>
                    <Meta description={CARD_LABELS.duration}/>
                </Col>
                <Col style={{width: (980 / 5 * 1)}}>
                    <Meta description={`${cardData.loanamt}억`}/>
                    <Meta description={`${cardData.aum}억`}/>
                    <Meta description={`${cardData.sdaterate.toFixed(2)}%`}/>
                    <Meta description={cardData.duration}/>
                </Col>
            </Row>
            {/*<Skeleton loading={loading} avatar active>*/}
            {/*        <Meta*/}
            {/*            avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}*/}
            {/*            title="Card title"*/}
            {/*            description="This is the description"*/}
            {/*        />*/}
            {/*    </Skeleton>*/}
        </Card>)
}


const CardGroup = ({data, refFunc}: { data: cardComp[], refFunc: Function }) => {
    if (data == undefined) return;

    return  data.map((val, idx) => {
        const isLastElement = data.length - 1 === idx + 1;
        return (
            isLastElement ? (
                <div ref={refFunc}>
                    <CardPart keystring={val.fn + val.lpcorp} cardData={val}/>
                </div>
            ) : (
                <CardPart keystring={val.fn + val.lpcorp} cardData={val}/>
            )
        )
    })
};

// {/*<Switch checked={!loading} onChange={() => (setLoading(!loading))}/>*/}


export default CardGroup
