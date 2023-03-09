require('dotenv').config()
module.exports = () => {
  
  const rewrites = () => {
    // const url = 'http://localhost:3001'
     const url = 'https://i-voting-server.onrender.com'
    return [
      
      {
        source: "/admin_login",
        destination: `${url}/admin_login`,
      },
      {
        source: "/admin_profile",
        destination: `${url}/admin_profile`,
      },
      {
        source: "/admin_getdata",
        destination: `${url}/admin_getdata`,
      },
      {
        source: "/admin_logout",
        destination: `${url}/admin_logout`,
      },

      {
        source: "/add_candidate",
        destination: `${url}/add_candidate`,
      },
      {
        source: "/update_candidate",
        destination: `${url}/update_candidate`,
      },
      {
        source: "/delete_candidate",
        destination: `${url}/delete_candidate`,
      },
      {
        source: "/getAllCandidate",
        destination: `${url}/getAllCandidate`,
      },
      {
        source: "/getAllVoter",
        destination: `${url}/getAllVoter`,
      },
      {
        source: "/add_voter",
        destination: `${url}/add_voter`,
      },
      {
        source: "/update_voter",
        destination: `${url}/update_voter`,
      },
      {
        source: "/delete_voter",
        destination: `${url}/delete_voter`,
      },
      
      {
        source: "/admin_all",
        destination: `${url}/admin_all`,
      },
      {
        source: "/getAllPositions",
        destination: `${url}/getAllPositions`,
      },
      {
        source: "/add_position",
        destination: `${url}/add_position`,
      },
      {
        source: "/update_position",
        destination: `${url}/update_position`,
      },
      {
        source: "/delete_position",
        destination: `${url}/delete_position`,
      },
      {
        source: "/updatePositioCandidatesList",
        destination: `${url}/updatePositioCandidatesList`,
      },

      // Users 
      {
        source: "/login",
        destination: "http://localhost:3001/login",
      },
      {
        source: "/voter_profile",
        destination: "http://localhost:3001/voter_profile",
      },
      {
        source: "/voter_logout",
        destination: "http://localhost:3001/voter_logout",
      },
    ];
    
  };
  return {
    rewrites,
    
  };
};