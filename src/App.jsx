import React, { useEffect } from 'react';

import { Amplify } from 'aws-amplify';
//old way of importing configuration profile for authentication
import awsconfig from './aws-exports.js'
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';

import config from './amplifyconfiguration.json';

import './App.css';

import Admin from './components/Admin.jsx';
import Download from './components/Download.jsx';
import Contribute from './components/Contribute.jsx';
import Navbar from './components/Navbar.jsx';
import Overview from './components/Overview.jsx';
import SearchComponent from './components/SearchComponent.jsx';
import NavbarAlt from './components/NavbarAlt.jsx';
import { signOut } from 'aws-amplify/auth';


//Configure is used for authentication

Amplify.configure(config)


function App() {
 

async function currentSession() {
  try {
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    console.log(accessToken);
  } catch (err) {
    console.log(err);
  }
}

async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails}`);
  } catch (err) {
    console.log(err);
  }
}
  return (
    <Router>
      
      
        <div className="App">
          <div className="navbar">
          <NavbarAlt />
          <button className="admin-button" onClick={currentAuthenticatedUser}>current user</button>
          
            </div> 
              
          
          <button className="admin-button" onClick={currentAuthenticatedUser}>current user</button>
          <button className="admin-button-2" onClick={currentSession}>current session</button>

            <header className='App-header'>

             <div>
             </div>
       <Routes>
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/" element={<Overview/>} />
          <Route path="/search" element={<SearchComponent/>} />
          <Route path="/download" element={<Download/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
        </header> 
            </div>
    
    </Router>
  );
}

export default App;
