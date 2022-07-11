import {Table} from 'antd';
import React, {useMemo, useState, useEffect} from 'react';
import {FundColumns, NumberColumns, FilterColumns} from "../const/p2Constant"
import {sortFloat, sortString} from "../const/p2Utils";
import {ColumnsType} from "antd/lib/table";
import {FundDataType} from "../const/p2Usertyp";
import {Button} from "antd";
import { CSVLink } from "react-csv";
import ReactDragListView from "react-drag-listview"

var FundColumnsReal: ColumnsType<FundDataType> = FundColumns

FundColumnsReal.map((val) => {
    if (NumberColumns.has(val.key)) {
        val["sorter"] = true
    }
})


const CompDataTable: React.FC = ({data,headers,exportFileName}: { data: any, headers: {label:string,key:string}[],exportFileName:string }) => {
    const [currentData, setCurrentData] = useState(data)
    const [pagenationNow, setPagenationNow] = useState(10)
    const [columnType, setColumnType] = useState(FundColumnsReal)
    const [filterAdd, setFilterAdd] = useState(false)
    var filNum = 10
    useEffect(() => {
        var newcolumnType = columnType.slice()
        if (filterAdd) {
            newcolumnType.map((val) => {
                if (FilterColumns.has(val.key)) {
                    val['width'] = val['width'] + filNum
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
                    val['onFilter'] = (value: string, record) => record[val.key].startsWith(value);
                    val['filterSearch'] = true;
                }
            })
        } else {
            newcolumnType.map((val) => {
                if (FilterColumns.has(val.key)) {
                    val['width'] = val['width'] - filNum
                    delete val["filters"]
                    delete val["onFilter"]
                    delete val["filterSearch"]
                }
            })
        }
        setColumnType(newcolumnType)
    }, [filterAdd])
    useEffect(() => {
        setColumnType(columnType)
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
        <>
            <Button onClick={() => setFilterAdd(!filterAdd)}>
                {filterAdd ? "필터X" : "필터O"}
            </Button>
            <ReactDragListView.DragColumn {...dragProps}>
                <Table
                    key='TableAll'
                    columns={columnType}
                    dataSource={currentData}
                    size="middle"
                    scroll={{x: 2000}}

                    pagination={{
                        pageSize: pagenationNow, size: "small", showSizeChanger: true, showQuickJumper: false,
                        pageSizeOptions: [10, 20, 50, 100, data.length],
                        position: [pagenationNow == 10 ? "none" : "topRight", "bottomRight"]
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
                        // console.log("columns,index", columns, index)
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
                        var nowData = data.slice()
                        if (availKeys.length && filterAdd) {
                            var filterTarget: Set<string>
                            for (let i = 0; i < availKeys.length; i++) {
                                filterTarget = new Set(filters[availKeys[i]])
                                nowData = nowData.filter((dat) => (filterTarget.has(dat[availKeys[i]])))
                            }
                        }
                        nowData = sortingLogic(sorter.order, nowData, sorter.columnKey)
                        setCurrentData(nowData)
                    }}
                />
            </ReactDragListView.DragColumn>
            <Button
                style={{marginTop: "-1.5%", marginBottom: "20%"}}
                type={'primary'}
            >
                <CSVLink
                    headers={headers}
                    data={[]}
                    filename={`${exportFileName}.csv`}
                    target="_blank"
                >
                    <span style={{fontWeight: 800, color: 'black'}}>다운로드</span>
                </CSVLink>
            </Button>
        </>
    );
}


export default CompDataTable;