import { Table } from 'antd';
import React from 'react';
import { FundColumns} from "../const/p2Constant"

const CompDataTable: React.FC = ({ data, display }: { data: any, display: boolean}) => {

    return (
        <Table
            columns={FundColumns}
            dataSource={data}
            size="small"
            scroll={{ x: 2000, y: 1000 }}
            pagination={{ pageSize: 10 }}
        />
    );
}

export default CompDataTable;