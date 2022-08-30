import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Update() {
    let history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastPrix, setLastPrix] = useState('');
    const [ID, setID] = useState('');
    const [image
        , setimage
      ] = useState('');
      const [image0
        , setimage0
      ] = useState('');
    const sendDataToAPI = () => {
        const data = new FormData();


        data.append('name',firstName)
        data.append('prix',parseInt(lastPrix))
        data.append('productImage',image)  
        console.log(data)
        axios.put(`http://produitgestion.herokuapp.com/api/v1/Produits/${ID}`,data, {
            headers: {
               authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWFuc291ciIsInBhc3N3b3JkIjoicHdkMTIzIiwiaWF0IjoxNjYwODE2NjMyfQ.Fz3RwBEo4uoGfFE8VRHPVOCd36I6eiYSSHPdfXIKn6g' ,
               'Content-Type': 'multipart/form-data',
            } }).then(() => {
            history.push('/read')
        })
    }

    useEffect(() => {
        setFirstName(localStorage.getItem('firstName'));
        setLastPrix(localStorage.getItem('lastPrix'));
        setID(localStorage.getItem('ID'))
        setimage0(localStorage.getItem('image'))

    }, [])

    return (
        <div>
            <Form>
                <Form.Field>
                    <label> Name</label>
                    <input name="fname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='Name' />
                </Form.Field>
                <Form.Field>
                    <label>Prix</label>
                    <input
                        name="lname"
                        value={lastPrix}
                        placeholder='Prix'
                        onChange={(e) => setLastPrix(e.target.value)}
                    />
                       <input type='file' name='file'onChange={(e) => setimage
            (e.target.files[0])} />
            <img src={image0} width='100' height='100'/>
                </Form.Field>
                <Button type='submit' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}
