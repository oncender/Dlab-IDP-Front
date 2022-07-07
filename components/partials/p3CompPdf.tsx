import React, {useState} from 'react';
import {Button, Card} from "antd";
import {Document, Page, pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({fileLoc, display}: { fileLoc: string, display: boolean }) => {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    var d = ""
    if (!display) {
        d = "none"
    }
    console.log(fileLoc)

    function onDocumentLoadSuccess({numPages}: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return (
        <div style={{padding: 24, display: `${d}`, alignContent: 'center'}}>
            <div>Page {pageNumber} of {numPages}</div>
            <Button
                    key="3"
                    size="small"
                    style={{margin: '0 2px',display:`${pageNumber > 1 ? 'inline-block' : 'none'}`}}
                    onClick={() => setPageNumber(prev => prev + -1)}
                >
                    이전페이지
                </Button>
            <Button
                    key="3"
                    size="small"
                    style={{margin: '0 2px',display:`${pageNumber < numPages ? 'inline-block':'none'}`}}
                    onClick={() => setPageNumber(prev => prev + +1)}
                >
                    다음페이지
                </Button>
            <br/>
            <Card style={{width: 1080}}>
                <Document
                    file={fileLoc}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page height={1480} pageNumber={pageNumber}/>
                </Document>
            </Card>
            <br/>
            <div>Page {pageNumber} of {numPages}</div>
            <Button
                    key="3"
                    size="small"
                    style={{margin: '0 2px',display:`${pageNumber > 1 ? 'inline-block' : 'none'}`}}
                    onClick={() => setPageNumber(prev => prev + -1)}
                >
                    이전페이지
                </Button>
            <Button
                    key="3"
                    size="small"
                    style={{margin: '0 2px',display:`${pageNumber < numPages ? 'inline-block':'none'}`}}
                    onClick={() => setPageNumber(prev => prev + +1)}
                >
                    다음페이지
                </Button>

            <br/>

        </div>
    )
}

export default PDFViewer;