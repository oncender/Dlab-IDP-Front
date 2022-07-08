import {Card, Descriptions, PageHeader, Row, Tag} from 'antd';
import React from 'react';

const Content: React.FC<{ children: React.ReactNode; extraContent: React.ReactNode }> = ({
                                                                                             children,
                                                                                             extraContent,
                                                                                         }) => (
    <Row
        style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'nowrap'}}
    >
        <div
            className="image"
            style={{margin: "0 10px"}}
        >
            {extraContent}
        </div>
        <div
            style={{flex: 1, margin: "0 10px"}}>
            {children}
        </div>
    </Row>
);

const AssetDescSummary: React.FC = ({data}: { data: any }) => {
    if (!data) return;
    var imageLoc: string
    if (!parseInt(data.data.img)) {
        imageLoc = `no_pic_building/${data.data.at}2.png`
    } else {
        imageLoc = `building_pic/${data.data.img}.png` // only {number} returned in api
    }
    var antagsPreprocess: string
    const maxLength:int = 50
    if (data.data.an.length > maxLength) {
        antagsPreprocess = data.data.an.slice(0, maxLength)+"...";
    } else {
        antagsPreprocess = data.data.an
    }

    return (
        <PageHeader
            title={data.data.lp}
            className="site-page-header"
            subTitle={data.data.fn}
            tags={<Tag color="blue">{antagsPreprocess}</Tag>}
        >
            <Content
                extraContent={
                    <img
                        src={imageLoc}
                        alt="content"
                        width="247"
                    />
                }
            >
                <Card style={{width: 800}}>
                    <Descriptions title="Summary">
                        <Descriptions.Item label="대출약정금">{data.data.loanamt + " ₩"}</Descriptions.Item>
                        <Descriptions.Item label="대출총액">{data.data.loan + " ₩"}</Descriptions.Item>
                        <Descriptions.Item label="체결이자">{data.data.sdaterate}</Descriptions.Item>
                        <Descriptions.Item label="듀레이션">{data.data.duration}</Descriptions.Item>
                        <Descriptions.Item label="투자전략">{data.data.strat}</Descriptions.Item>
                        <Descriptions.Item label="투자자산유형">{data.data.at}</Descriptions.Item>
                        <Descriptions.Item label="펀드구분">{data.data.ft}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Content>
        </PageHeader>
    );
};

export default AssetDescSummary;