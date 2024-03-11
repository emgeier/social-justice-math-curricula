import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getUrl } from 'aws-amplify/storage';
import { list } from 'aws-amplify/storage';
import { getLessonPlan } from '../graphql/queries';

//This has been set up to show how to set up a download link, not for production use.

const client = generateClient();

const Download = (props) => {
    const [s3DownloadLinks, setS3DownloadLinks] = useState([]);

    async function listObjectsInBucket() {
        try {
            const s3Objects = await list('');
            const downloadLinks = await Promise.all(
                s3Objects.items.map(async (item) => {
                    const fileInfo = await generateDownloadLinks(item.key);
                    return fileInfo;
                })
            );

            setS3DownloadLinks(downloadLinks);
        } catch (error) {
            console.log(error);
        }
    }
    //This is the only function necessary for the production version
       
    async function generateDownloadLinks(fileKey){
        try {
            const getUrlResult = await getUrl({key: fileKey});
            console.log('signed url: ', getUrlResult.url.href);

            const title = await findLessonPlan(fileKey);

            return { key: fileKey, downloadLink: getUrlResult.url.href, title: title };
        } catch (error) {
            console.log('Error : ', error);
        }
    }
    
    async function findLessonPlan(fileKey){
        try {
            const lessonPlanData = await client.graphql({ query: getLessonPlan, variables: { id: fileKey } });
            console.log(lessonPlanData.data.getLessonPlan.title);
            return lessonPlanData.data.getLessonPlan.title;
        } catch (error) {
            console.log('Error fetching lesson plan title: ', error);
            return '';
        }
    }

    useEffect(() => {
        listObjectsInBucket();
    }, []);

    return (
        <div>
            {s3DownloadLinks.map((item, index) => (
                <div key={index}>
                    <a href={item.downloadLink} target="_blank" download="">
                        {index + 1}. {item.key} - {item.title}
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Download;
