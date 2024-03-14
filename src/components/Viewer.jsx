import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import {
  Button,
  Flex
} from "@aws-amplify/ui-react";


const pdfjs = await import('pdfjs-dist/build/pdf');
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


const Viewer = ({ pdfUrl, filekey }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  
  function turnPage() {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };
  function turnBack() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div>
      <Document file={pdfUrl}onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <div>
         <Flex justifyContent="space-between">
           <Button onClick= { turnBack }>Previous</Button>
           <a href={pdfUrl} target="_blank" download="">
          <Button >Download</Button>
          </a>
           <Flex gap="15px">
           <Button onClick={turnPage} >Next</Button>
          </Flex>
         </Flex>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
