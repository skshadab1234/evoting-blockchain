import React, { useState, useEffect } from 'react'

const Token = () => {
  const [election_manager_data, setelection_manager_data] = useState([])
  const callData = async () => {
    try {
      const response = await fetch("/admin_profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }
      )
      const data = await response.json();
      setelection_manager_data(data)
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    callData()
    const tokens = election_manager_data.map(object => object.tokens);
      console.log(tokens)
  }, [election_manager_data])
  
}

export default Token