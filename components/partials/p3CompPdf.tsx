import React, { useState } from 'react';
import { Button, Card } from "antd";
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ fileLoc, display }: { fileLoc:string, display: boolean }) => {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    var d = ""
    if (!display) {
        d = "none"
    }
    console.log(fileLoc)
    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return (
        <div
            style={{ padding: 24, display: `${d}`, alignContent: 'center' }}
        >
            <Card style={{ width: 1080 }}>
                <Document
                    file={fileLoc}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page height={1480} pageNumber={pageNumber}/>
                </Document>
            </Card>
            <br/>
            Page {pageNumber} of {numPages}
            <br/>
            {pageNumber > 1 && (
            <Button 
                key="3" 
                size="small" 
                style={{ margin: '0 2px' }}
                onClick={() => setPageNumber(prev => prev + -1)}
            >
                이전페이지
            </Button>
            )}
            {pageNumber < numPages && (
            <Button 
                key="3" 
                size="small" 
                style={{ margin: '0 2px' }}
                onClick={() => setPageNumber(prev => prev + +1)}
            >
                다음페이지
            </Button>
            )}
        </div>
    )
}
  
export default PDFViewer;