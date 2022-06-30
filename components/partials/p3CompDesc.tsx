import { Descriptions, Card } from "antd";
import React from 'react';

const LargeFundDesc: React.FC = ({ data, display }: { data:any, display: boolean }) => {
    if (!data) return;
    var d = ""
    if (!display) {
        d = "none"
    }
    return (
        <div
            style={{ margin: '0px 24px 0px', display: `${d}` }}
        >
            <Card style={{ width: 1080 }}>
                <Descriptions title="Asset Detail" bordered>
                    <Descriptions.Item label="대주수" span={3}>{data.data.lpnum}</Descriptions.Item>
                    <Descriptions.Item label="대주명분류" span={3}>{data.data.lpt}</Descriptions.Item>
                    <Descriptions.Item label="대출순위" span={3}>{data.data.seniorstr}</Descriptions.Item>
                    <Descriptions.Item label="대출용도" span={3}>{data.data.loanuse}</Descriptions.Item>
                    <Descriptions.Item label="대출종류" span={3}>{data.data.loantype}</Descriptions.Item>
                    <Descriptions.Item label="대출분류" span={3}>{data.data.loancls}</Descriptions.Item>
                    <Descriptions.Item label="토지주소" span={3}>{data.data.addr}</Descriptions.Item>
                    <Descriptions.Item label="상환방식" span={3}>{data.data.loanrpy}</Descriptions.Item>
                    <Descriptions.Item label="금리종류" span={3}>{data.data.rate}</Descriptions.Item>
                    <Descriptions.Item label="체결일이자율" span={3}>{data.data.sdaterate}</Descriptions.Item>
                    <Descriptions.Item label="연체이자율" span={3}>{data.data.laterate}</Descriptions.Item>
                    <Descriptions.Item label="조기상환수수료" span={3}>{data.data.earlypremium}</Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    )
}

export default LargeFundDesc;