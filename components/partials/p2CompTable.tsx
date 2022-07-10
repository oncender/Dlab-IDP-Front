import {Table} from 'antd';
import React, {useMemo, useState, useEffect} from 'react';
import {FundColumns, NumberColumns, FilterColumns} from "../const/p2Constant"
import {sortFloat, sortString} from "../const/p2Utils";
import {ColumnsType} from "antd/lib/table";
import {FundDataType} from "../const/p2Usertyp";
import {filter} from "@antv/util";
import ReactDragListView from "react-drag-listview"

var FundColumnsReal: ColumnsType<FundDataType> = FundColumns

FundColumnsReal.map((val) => {
    if (NumberColumns.has(val.key)) {
        val["sorter"] = true
    }
    if (FilterColumns.has(val.key)) {
        val["filters"] = []
    }
})


const CompDataTable: React.FC = ({data}: { data: any}) => {
    const [currentData, setCurrentData] = useState(data)
    const [pagenationNow, setPagenationNow] = useState(10)
    const [columnType, setColumnType] = useState(FundColumnsReal)
    useEffect(() => {
        var cols = FundColumnsReal.map((val) => {
            if (FilterColumns.has(val.key)) {
                val['filters'] = Array.from(new Set(data.map((dat) => dat[val.key]))).sort((a, b) => {
                        var fa = a.toLowerCase();
                        var fb = b.toLowerCase();
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    }
                ).map((dat2) => {
                    return {text: dat2, value: dat2}
                })
            }
            return val
        })
        setColumnType(cols)
        setCurrentData(data)
    }, [data]);

    const dragProps = {
        onDragEnd(fromIndex: number, toIndex: number) {
            const nowcolumns = [...columnType];
            const item = nowcolumns.splice(fromIndex, 1)[0];
            nowcolumns.splice(toIndex, 0, item);
            setColumnType(nowcolumns);
        },
        nodeSelector: "th"
    };


    const sortingLogic = (order: string | null, targetData: any[], columnKey: string) => {
        if (order == undefined) {
            return targetData
        } else {
            if (NumberColumns.has(columnKey)) {
                return targetData.sort((a, b) => sortFloat(a, b, columnKey, (order == 'ascend') ? true : false))
            } else {
                return targetData.sort((a, b) => sortString(a, b, columnKey, (order == 'ascend') ? true : false))
            }
        }
    }
    return (
        <ReactDragListView.DragColumn {...dragProps}>
            <Table
                key='TableAll'
                columns={columnType}
                dataSource={currentData}
                size="middle"
                scroll={{x: 2000}}

                pagination={{
                    pageSize: pagenationNow, size: "small", showSizeChanger: true, showQuickJumper: false,
                    pageSizeOptions: [10, 20, 50, 100, data.length]
                }}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                        }, // click row
                        onDoubleClick: event => {
                        }, // double click row
                        onContextMenu: event => {
                        }, // right button click row
                        onMouseEnter: event => {
                        }, // mouse enter row
                        onMouseLeave: event => {
                        }, // mouse leave row
                    };
                }}
                onHeaderRow={(columns, index) => {
                    console.log("columns,index", columns, index)
                    return {
                        onClick: () => {
                        }, // click header row
                    };
                }}
                onChange={(pagination, filters, sorter, extra) => {
                    if (extra.action == 'paginate') {
                        if (pagination.pageSize != pagenationNow) {
                            setPagenationNow(pagination.pageSize)
                        }
                        return
                    }
                    const availKeys: string = Object.keys(filters).filter((k) => (filters[k]))
                    var nowData = extra.currentDataSource
                    if (availKeys.length) {
                        var filterTarget: Set<string>
                        for (let i = 0; i < availKeys.length; i++) {
                            filterTarget = new Set(filters[availKeys[i]])
                            nowData = nowData.filter((dat) => (filterTarget.has(dat[availKeys[i]])))
                        }
                    } else {
                        nowData = data
                    }
                    nowData = sortingLogic(sorter.order, nowData, sorter.columnKey)
                    setCurrentData(nowData)
                    console.log("extra", extra)
                }}
            />
        </ReactDragListView.DragColumn>
    );
}


export default CompDataTable;