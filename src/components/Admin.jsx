import React, { useEffect } from 'react';
//import '../App.css';
import './search.css'
import { Amplify } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import {useState} from 'react';
import config from '../amplifyconfiguration.json';
import {generateClient} from 'aws-amplify/api';
import { updateLessonPlan } from '../graphql/mutations';
import { deleteLessonPlan } from '../graphql/mutations';
import { listLessonPlans } from '../graphql/queries';
import { getUrl } from 'aws-amplify/storage';
import {remove} from 'aws-amplify/storage'

import Viewer from './Viewer';


Amplify.configure(config);

//step 1: get clickable, viewable list of approved == false 
//step 2: update database if approved
//step 3: delete if not approved

function Admin() {
  const [lessonPlans, setLessonPlans] = useState([]);
  
  const client = generateClient();

  useEffect(() => {
    fetchLessonPlans();
  }, []);

  async function fetchLessonPlans() {
    try {
      const lessonPlanData = await client.graphql({ query: listLessonPlans });
      const lessonPlans = lessonPlanData.data.listLessonPlans.items;
      const results = lessonPlans.filter(item =>
        item.approved === false
      );
      setLessonPlans(results);
    } catch (err) {
      console.log('Error fetching lesson plans:', err);
    }
  }
  async function approveLessonPlan() {
    try {
      const fileId = selectedFile.id;
      console.log(fileId);
      await client.graphql({
        query: updateLessonPlan,
        variables: {
          input: {
            id: fileId,
            approved: true 
          }

        }
      });
    } catch (err) {
      console.log('error updating lesson plan:', err);
    }
  }
  async function rejectLessonPlan() {
    try {
 
      await client.graphql({
        query: deleteLessonPlan,
        variables: {
          input: {
            id: selectedFile.id
          }
        }
      });
      await handleRemove(selectedFile.id);
      setLessonPlans(lessonPlans => lessonPlans.filter(item => item.id !== selectedFile.id));
    } catch (err) {
      console.log('error removing lesson plan:', err);
    }
  }
 

const handleRemove = async (filekey) => {
  try {
    await remove({ 
      key: filekey
    });
    console.log("File deleted from S3");
  } catch (error) {
    console.log('Unable to remove file from S3', error);
  }

}

  const [selectedPDF, setSelectedPDF] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePDFClick = async (file) => {
    try {
      const viewableLink = await generateViewableLink(file.id);
      setSelectedPDF(viewableLink);
      
      console.log("id"+file.id);
      setSelectedFile(file);
    } catch (error) {
      console.log('Error generating viewable link:', error);
    }
  };

  async function generateViewableLink(fileKey) {
    try {
      const getUrlResult = await getUrl({ key: fileKey });
      return getUrlResult.url.href;
    } catch (error) {
      console.log('Error generating viewable link:', error);
      throw error;
    }
  } 


  return (
    
    <Authenticator >
    
        {({signOut, user}) => (
        
        <div className="Admin">
          <button className="sign-out-button" onClick={signOut}>Sign Out</button>

              <h2>Review Lesson Plans</h2>

              <ul>
                {lessonPlans.map(item => (
                  <ul key={item.id}>
                      <button onClick={() => handlePDFClick(item)}>
                    {item.title} : {item.socialJusticeTopic} : {item.mathTopic}
            </button>
          </ul>
        ))}
      </ul>
      {selectedPDF && <Viewer pdfUrl={selectedPDF} />}

                <div className='overview-container'>
                <button className="approve-button" onClick={approveLessonPlan}>Approve</button>
                <button className="delete-button" onClick={rejectLessonPlan}>Delete</button>

                </div>
                
      
            </div>
            )} 
      
    </Authenticator>

  );
}

export default withAuthenticator(Admin);

