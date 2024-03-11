import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getUrl } from 'aws-amplify/storage';
import {
    Button
    
  } from "@aws-amplify/ui-react";



const client = generateClient();

const DownloadButton = ({fileKey}) => {
    const [s3DownloadLink, setS3DownloadLink] = useState([]);


    //This is the only function necessary for the production version
       
    async function generateDownloadLink(){
        try {
            
            const urlResult = await getUrl({key: fileKey});
            console.log('signed url: ', urlResult.url.href);
            const link = document.createElement('a');
            link.href = urlResult.url.href;
           
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Cleanup

            setS3DownloadLink(urlResult.url.href);
            return urlResult.url.href;
        } catch (error) {
            console.log('Error : ', error);
        }
    }
    

    return (
        <div>
            <Button onClick={generateDownloadLink}/>Download
        </div>
    );
}

export default DownloadButton;
