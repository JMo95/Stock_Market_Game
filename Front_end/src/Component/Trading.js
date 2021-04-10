import React from "react";
import {Button, Container, Row, Col, Table, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class Trading extends React.Component
{
    constructor(props) 
    {
          super(props);
    }

    render()
    {

        return(
            
            <div>
                <Container>
                    <Row>
                        <Col><h4>Balance: $420.69</h4></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                    <p className="mt-5"></p>
                    <Row>
                        <Col xs={6}>
                            <h2>Your Stock List</h2>
                            <p className="mt-5"></p>
                            <Table striped hover>
                            <thread>
                                <tr>
                                    <th>Symbol</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            <tbody>
                                <tr>
                                    <th>GME</th>
                                    <th>Gamestop</th>
                                    <th>$349.22</th>
                                    <th>233</th>
                                </tr>
                                <tr>
                                    <th>AMC</th>
                                    <th>AMC Entertainment</th>
                                    <th>$49.22</th>
                                    <th>2333</th>
                                </tr>
                                <tr>
                                    <th>RKT</th>
                                    <th>RKT Mortgage</th>
                                    <th>$33.22</th>
                                    <th>213</th>
                                </tr>
                                <tr>
                                    <th>TLRY</th>
                                    <th>Tilray</th>
                                    <th>$19.85</th>
                                    <th>42</th>
                                </tr>
                            </tbody>
                            </thread>
                            </Table>
                        </Col>
                        <Col xs={6}>
                            <h2> Buy/Sell</h2>
                            <p className="mt-4"></p>
                            <Form>
                                <Form.Row>
                                    <Col xs={6}>

                                    <h6>Stock Name</h6>
                                    <Form.Control placeholder="Enter stock name..." />
                                    <p className="mt-2"></p>
                                    
                                    </Col>
                                    <Col>
                                    <h6>Quantity</h6>
                                    <Form.Control placeholder="Qty..." />
                                    </Col>
                                    <Col>
                                    <h6>Price</h6>
                                    <Form.Control placeholder="$4383.33" />
                                    </Col>
                                </Form.Row>
                                </Form>
                                <Row>

                                <Col>
                                <Button variant="success" size="lg" block>Buy</Button>
                                </Col>
                                <Col>
                                <Button variant="danger" size="lg" block>Sell</Button>  
                                </Col>
                                </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            
            
        );
    }

}
export default Trading;
