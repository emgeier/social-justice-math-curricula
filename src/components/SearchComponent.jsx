import React, { useState, useEffect } from 'react';
import { listLessonPlans } from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import Viewer from './Viewer'; // PDF viewer component
import { getUrl } from 'aws-amplify/storage';
import './search.css';

// Client to connect with GraphQL
const client = generateClient();
// Easiest search function implemented: use built-in list query, then filter results. 
// Add pagination.
//Eventually integrate download option for search/view results
//Filter out those approved == false

function SearchComponent() {
  const [lessonPlans, setLessonPlans] = useState([]);
  useEffect(() => {
    console.log("fetching lesson plans");
    fetchLessonPlans();
  }, []);

  async function fetchLessonPlans() {
    try {
      const lessonPlanData = await client.graphql({ query: listLessonPlans, variables: variables });
      const lessonPlans = lessonPlanData.data.listLessonPlans.items;
      setLessonPlans(lessonPlans);
    } catch (err) {
      console.log('Error fetching lesson plans:', err);
    }
  }
  const variables = {
    filter: {
      approved: {
        eq: true
      }
    }
  };

  const [searchResults, setSearchResults] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);

  const handleSearch = (socialJusticeTerm, mathTerm) => {
    const results = lessonPlans.filter(item =>
      item.socialJusticeTopic.toLowerCase().includes(socialJusticeTerm.toLowerCase()) &&
      item.mathTopic.toLowerCase().includes(mathTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handlePDFClick = async (fileKey) => {
    try {
      const viewableLink = await generateViewableLink(fileKey);
      setSelectedPDF(viewableLink);
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
    <div >
      <div className='input-container'>
      <input
      
        type="text"
        placeholder="Social Justice Topic"
        onChange={(e) => handleSearch(e.target.value, '')}
      />
      </div>
      <div className='input-container'>

      <input
        type="text"
        placeholder="Math Topic"
        onChange={(e) => handleSearch('', e.target.value)}
      />
      </div>
      <ul>
        {searchResults.map(item => (
          <ul key={item.id}>
            <button onClick={() => handlePDFClick(item.id)}>
              {item.title} : {item.socialJusticeTopic} : {item.mathTopic}
            </button>
          </ul>
        ))}
      </ul>
      {selectedPDF && <Viewer pdfUrl={selectedPDF} />}
    </div>
  );
}

export default SearchComponent;
