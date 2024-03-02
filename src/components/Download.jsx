import { useEffect, useState } from 'react';

import { generateClient } from 'aws-amplify/api';

import { getUrl } from 'aws-amplify/storage';

import { list } from 'aws-amplify/storage';

const client = generateClient();

//This is a barebones download function-- it just lists all the objects in our bucket so you can choose to download one.
//The functionality will be hooked up to the search function for more meaningful downloads. 
//This is example code to show how it works.

const Download = (props) => {
    const [fileData, setFileData] = useState();
    const [fileStatus, setFileStatus] = useState(false);
    const [s3DownloadLinks, setS3DownloadLinks] = useState([]);

    async function listObjectsInBucket() {
        try {
            const s3Objects = await list('');
            const downloadLinks = await Promise.all(
                s3Objects.items.map(async (item) => {
                    const downloadLink = await generateDownloadLinks(item.key);
                    console.log("downloadLink: "+ downloadLink);
                    return downloadLink;
                })
            );
            setS3DownloadLinks(downloadLinks);
        } catch (error) {
            console.log(error);
        }
    }
       
    async function generateDownloadLinks(fileKey){
        try {
            const getUrlResult = await getUrl({key: fileKey});
            console.log('signed url: ', getUrlResult.url.href);
            console.log('searchparams url: ', getUrlResult.url.searchParams);

            return getUrlResult.url.href;


        } catch (error) {
            console.log('Error : ', error);
        }

    }
// Alternatively, you can use `downloadResult.body.text()`
   // async function downloadBlob(blob, filename) {
    //     const url = URL.createObjectURL(blob);
    //     // const a = document.createElement("a");
    //     // a.href = url;
    //     return url;
    // }


    useEffect(() => {
        listObjectsInBucket();
// the [] means that the listObjects will only happen once, not every time download is rerendered.
    }, []);

    return (
        <div>
            {s3DownloadLinks.map((item, index) => (
                <div key = {index}>
                    <a href={item} target="_blank" download="">
                        Lesson {item.title} {index+1} 
                    </a>
                </div>
            ))}
        </div>
    );

}
export default Download;

