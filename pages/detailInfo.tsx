import Buttonstyles from "../styles/Button.module.scss"
import Layoutstyles from "../styles/DetailInfo.module.scss"
import {useRouter} from 'next/router'
import React, {useEffect, useMemo, useState} from 'react';
import {InferGetServerSidePropsType} from 'next';

// page layout
import {Layout, Button} from 'antd';

// page constant
import {APIURL} from "../components/const/p3Const"
// page component
import LargeFundDesc from "../components/partials/p3CompDesc"
import AssetDescSummary from "../components/partials/p3CompSumm"
import PDFViewer from "../components/partials/p3CompPdf"
import axios from "axios";


const {Header, Content} = Layout;

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


    console.log('router', router.query)
    console.log('data', fundData)
    const handleClickDesc = (e: MouseEvent) => {
        setShowDesc(true)
        setShowPDF(false)
    }
    const handleClickPDF = (e: MouseEvent) => {
        setShowDesc(false)
        setShowPDF(true)
    }


    useEffect(() => {
        DataFetch(router.query.fc, router.query.idx);
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
                    상세 정보
                </Button>
                <Button
                    className={!showDesc ? Buttonstyles["ant-btn-primary"] : Buttonstyles["ant-btn-default"]}
                    key="2" size="large" style={{margin: '0 10px'}}
                    type={!showDesc ? 'primary' : 'default'}
                    onClick={(e) => handleClickPDF(e)}>
                    계약서 보기
                </Button>
            </div>
        )
    }, [showDesc])
    const PDF = useMemo(() => {
        var contractFile = "/pdfs/test.pdf"
        return (<PDFViewer fileLoc={contractFile} display={showPDF}/>)
    }, [fundData,showPDF])

    return (
        <div
            style={{display: 'flex', flexDirection: 'row'}}>
            <Layout>
                <Header></Header>
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
            </Layout>
        </div>
    )
};

export default Home;