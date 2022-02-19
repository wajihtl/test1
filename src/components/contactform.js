import React from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

import '../App.css';


const SERVICE_ID = "service_n2i5pk5";
const TEMPLATE_ID = "template_st8ip4l";
const USER_ID = "user_Us8hRW4hqMla9pNa5waSc";

const ContactForm = () => {


  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully'
        })
      }, (error) => {
        console.log(error.text);
        Swal.fire({
          icon: 'error',
          title: 'Ooops, something went wrong',
          text: error.text,
        })
      });
    e.target.reset()
  };

  return (
    <div>
      <div className='ContactForm' >
        <Form onSubmit={handleOnSubmit}>
          
         
          <Form.Field
            id='form-input-control-email'
            control={Input}
            label='Email'

            name='from_name'
            placeholder='Email..'
            required
            icon='mail'
            iconPosition='left'
          />
          <Form.Field
            id='form-textarea-control-opinion'
            control={TextArea}
            label='Message'
            name='message'
            placeholder='Message…'

            required
          />
          <Button type='submit' className='btn btn-success'>Submit</Button>
        </Form>
      </div>
    </div>

  );



};








export default ContactForm;