import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Create() {
  let history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastPrix
    , setLastPrix
  ] = useState('');
  const [image
    , setimage
  ] = useState('');

  const data = new FormData();


  const sendDataToAPI = () => {
    data.append('name',firstName)
    data.append('prix',parseInt(lastPrix))
    data.append('productImage',image)  
    axios.post(`http://produitgestion.herokuapp.com/api/v1/Produits`,data, {
      headers: {
         authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWFuc291ciIsInBhc3N3b3JkIjoicHdkMTIzIiwiaWF0IjoxNjYwODE2NjMyfQ.Fz3RwBEo4uoGfFE8VRHPVOCd36I6eiYSSHPdfXIKn6g' ,
         'Content-Type': 'multipart/form-data',
      }}).then(() => {
      history.push('/read')
    })
  }
  return (
    <div>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input name="fname" 
          onChange={(e) => setFirstName(e.target.value)} 
          placeholder='Name' />
        </Form.Field>
        <Form.Field>
          <label>Prix</label>
          <input 
          name="lname" 
          placeholder='Prix' 
          onChange={(e) => setLastPrix
            (e.target.value)} 
          />
        </Form.Field>
        <Form.Field>
          <input type='file' name='file'onChange={(e) => setimage
            (e.target.files[0])} />
        </Form.Field>
        <Button type='submit' onClick={sendDataToAPI}>Submit</Button>
      </Form>
    </div>
  )
}
