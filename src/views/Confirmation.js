import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import styled from "styled-components";


const Confirmation = () => {
  const { ActivateAccount } = useParams();
  useEffect(() => {
    axios.put(`http://54.38.33.104:8000/api/ActivateAccount/${ActivateAccount}`, {}) //
      .then(res => {
        if (res.data.success === true) {
          window.location = '/Auth#/sign-in';
        }
      }, [])
  })



  return (
    <div>
      <H>Thank you for confirming your account!</H>
    </div >
  );
}



const H = styled.h1`

  padding: 150px 0;
  margin: 70px 0;
  text-align: center;
`;

export default Confirmation;