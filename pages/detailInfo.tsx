import Buttonstyles from "../styles/Button.module.scss"
import Layoutstyles from "../styles/DetailInfo.module.scss"
import {useRouter} from 'next/router'
import Header from '../components/Header'
import Footer from "../components/Footer";
import React, {useLayoutEffect, useMemo, useState} from 'react';

// page layout
import {Layout, Button} from 'antd';

// page constant
import {APIURL} from "../components/const/p3Const"
// page component
import LargeFundDesc from "../components/partials/p3CompDesc"
import AssetDescSummary from "../components/partials/p3CompSumm"
import PDFViewer from "../components/partials/p3CompPdf"
import axios from "axios";
import {getCookie, setCookie} from "../components/const/p2Utils";
import {ParsedUrlQuery} from "querystring";


const {_, Content} = Layout;

const Home = () => {
    async function DataFetch(fc: string, idx: string) {
        var cancel
        let reqConfig: {} = {
            method: "GET",
            url: APIURL.TABLE,
            params: {fc: fc, idx: idx},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }
        var res
        try {
            res = await axios(reqConfig);
        } catch (e) {
            if (axios.isCancel(e)) {
                console.log("error", e)
            }
        }
        setFundData(res.data)
    }

    const router = useRouter()
    const [fundData, setFundData] = useState();
    const [showDesc, setShowDesc] = useState(true);
    const [showPDF, setShowPDF] = useState(false);

    const handleClickDesc = (e: MouseEvent) => {
        setShowDesc(true)
        setShowPDF(false)
    }
    const handleClickPDF = (e: MouseEvent) => {
        setShowDesc(false)
        setShowPDF(true)
    }


    useLayoutEffect(() => {
        var querydetail: ParsedUrlQuery
        if (Object.keys(router.query).length !== 0) {
            querydetail = router.query;
            setCookie('detailInfoCookie', JSON.stringify(querydetail), {secure: true, 'max-age': 3600})
        } else {
            var cookietemp = getCookie('detailInfoCookie')
            if (cookietemp) {
                querydetail = JSON.parse(cookietemp)
            } else {
                querydetail = {fc: '', idx: ''}
            }
        }
        DataFetch(querydetail.fc as string, querydetail.idx as string);
    }, [])

    const ADS = useMemo(() => {
            return (<AssetDescSummary data={fundData}/>)
        }
        , [fundData])
    const LFD = useMemo(() => {
            return (<LargeFundDesc data={fundData} display={showDesc}/>)
        }
        , [fundData, showDesc])
    const ButtonG = useMemo(() => {
        return (
            <div className={Layoutstyles.ButtonGroup}>
                <Button
                    className={showDesc ? Buttonstyles["ant-btn-primary"] : Buttonstyles["ant-btn-default"]}
                    key="1" style={{margin: '0 10px'}} size="large"
                    type={showDesc ? 'primary' : 'default'}
                    onClick={(e) => handleClickDesc(e)}>
                    <span style={{'justifyContent': 'center'}}>상세 정보</span>
                </Button>
                <Button
                    className={!showDesc ? Buttonstyles["ant-btn-primary"] : Buttonstyles["ant-btn-default"]}
                    key="2" size="large" style={{margin: '0 10px'}}
                    type={!showDesc ? 'primary' : 'default'}
                    onClick={(e) => handleClickPDF(e)}>
                    <span style={{'justifyContent': 'center'}}>계약서 보기</span>
                </Button>
            </div>
        )
    }, [showDesc])
    const PDF = useMemo(() => {
        if (!fundData) return;
        return (<PDFViewer fileLoc={`/pdf/${fundData.data.fc}/${fundData.data.file}.pdf`} display={showPDF}/>)
    }, [fundData, showPDF])

    return (

        <div
            style={{display: 'flex', flexDirection: 'row',justifyContent:'center'}}>
            <Layout>
                <Header link={"/detail"}/>
                <Content
                    style={{margin: '24px 290px 24px'}}
                >
                    <div
                        className={Layoutstyles.MainBoard}>
                        {ADS}
                        {ButtonG}
                        {LFD}
                        {PDF}
                    </div>
                </Content>
                <Footer/>
            </Layout>

        </div>
    )
};

export default Home;