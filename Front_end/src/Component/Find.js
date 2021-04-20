import React, { useEffect, useState } from "react";
import {Button, Container, Row, Col, Table, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useHistory, useParams } from "react-router";

function Find() {
var { symbol } = useParams()
const url = `https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getData/?symbol=${symbol}`
var [token, setToken] = useState(null)
const history = useHistory();
let lowRange = 'low range'

useEffect(() => {
    axios.get(url)
    .then(response => {
        setToken(response.data)
    })
}, [url])

const handleHistory = (evt) => {
    history.push(`/find/${symbol}`)
}

if(token){
    return (
        <div>

            <Container fluid>
            <h1>Search</h1>
            <p></p>
            <p></p>
        <Row>
            <Col xs={4}></Col>
            <Col xs={4}>
            <form>
            <Form.Control size="lg" type="search" placeholder="Search a stock name or symbol"
            
             />
             </form>
            </Col>
            <Col xs={1}>
            <Button type="submit" value="Submit" className="mb-1" size="lg"
            onClick={handleHistory}
            >Submit</Button>
            </Col>
            </Row>
            <Row>
            <Col xs={4}></Col>
            <Col xs={4}>

            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Ticker</th>
                <th>Name</th>
                <th>Price</th>
                <th>Volume</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>{symbol.toUpperCase()}</td>
                <td>{token.lowRange}</td>
                <td>{token.price}</td>
                <td>{token.volume}</td>
             
             
                </tr>
            </tbody>
            </Table>
            </Col>
        </Row>
        
        </Container>
        </div>
    )
}

return (
    <div></div>
)

}

export default Find
