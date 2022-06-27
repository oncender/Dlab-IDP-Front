import styles from "../../styles/Card.module.scss"
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

const CardPart = ({key, cardData, stylesJS}:
                { key:string, cardData: cardComp, stylesJS: {[key:string]:string} }
    ) => {
    // console.log({
    //             width: getTempRem(TEMPCSS.width, 980),
    //             height: getTempRem(TEMPCSS.height, 180),
    //         })
    return (
        <div key={key} style={stylesJS} >
            <Card hoverable style={{
                'display':'grid',
                'grid-template-columns': 'repeat(10,10%fr)',
                'grid-template-rows': 'repeat(10,5%fr)',
                'width' :'200px'
            }}>
                <Card
                    className={styles.cardImage}
                    key={key + "col1"}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
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
                        { keystring: string, cardData: cardComp,  }) => {
return (
    <Card key={keystring} hoverable>
        <Row>
            <Col>
                <Card key={keystring+"col1"}
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



const CardGroup = ({data, refFunc}:
                   { data: cardComp[], refFunc: Function}
) => {
    if (data == undefined) return;

    const cardParts =  data.map((val, idx) => {
        const isLastElement = data.length - 1 === idx + 1;
        // keystring={val.fn + val.lpcorp}
        return (
            isLastElement ? (
                <div ref={refFunc}>
                    <CartPartBe key={`card${idx}`} cardData={val}  />
                </div>
            ) : (
                <CartPartBe key={`card${idx}`} cardData={val} />
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


export default CardGroup
