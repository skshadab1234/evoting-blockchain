import React, { useState, useEffect } from 'react'

const index = () => {
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
      if (!data.status === 200) {
        throw new Error(data.error);
      } else {
        setelection_manager_data(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    callData()
  }, [])
  return (
      <>{election_manager_data.email}</>

  )
}

export default index