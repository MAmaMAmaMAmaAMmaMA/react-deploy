import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Read() {
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        axios.get(`http://produitgestion.herokuapp.com/api/v1/Produits`, {
            headers: {
               authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWFuc291ciIsInBhc3N3b3JkIjoicHdkMTIzIiwiaWF0IjoxNjYwODE2NjMyfQ.Fz3RwBEo4uoGfFE8VRHPVOCd36I6eiYSSHPdfXIKn6g' ,
               'Content-Type': 'application/json'
            } })
            .then((getData) => {
                setApiData(getData.data);
            })
    }, [])

    const setData = (id, image,firstName, lastPrix) => {
        localStorage.setItem('ID', id)
        localStorage.setItem('firstName', firstName)
        localStorage.setItem('lastPrix', lastPrix)
        localStorage.setItem('image', image)
    }

    const getData = () => {
        axios.get(`http://produitgestion.herokuapp.com/api/v1/Produits`, {
            headers: {
               authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWFuc291ciIsInBhc3N3b3JkIjoicHdkMTIzIiwiaWF0IjoxNjYwODE2NjMyfQ.Fz3RwBEo4uoGfFE8VRHPVOCd36I6eiYSSHPdfXIKn6g' ,
               'Content-Type': 'application/json'
            } })
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://produitgestion.herokuapp.com/api/v1/Produits/${id}`, {
            headers: {
               authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWFuc291ciIsInBhc3N3b3JkIjoicHdkMTIzIiwiaWF0IjoxNjYwODE2NjMyfQ.Fz3RwBEo4uoGfFE8VRHPVOCd36I6eiYSSHPdfXIKn6g' ,
               'Content-Type': 'application/json'
            } })
        .then(() => {
            getData();
        })
    }

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Prix</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {apiData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell><img src={data.image} width='100' height='100' /></Table.Cell>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.prix}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/update'>
                                        <Button
                                            color="green"
                                            onClick={() => setData(data._id,data.image, data.name, data.prix)}>
                                            Update
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color="red" onClick={() => onDelete(data._id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}

                </Table.Body>
            </Table>
        </div>
    )
}
