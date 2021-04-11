import React from "react";
import {Button, Container, Row, Col, Table, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import token from './token';


class Trading extends React.Component
{
    constructor(props) 
    {
          super(props);
    }

    state = {   
        token: {}

    }

    async componentDidMount() {
        // Simple POST request with a JSON body using axios
        //const article = { title: 'React POST Request Example' };
        const dataForm = new FormData();
        dataForm.append('username', "testwjose");
        dataForm.append('password', "password");
        console.log("Component Did Mount");
        for (var value of dataForm.values()) {
            console.log(value);
        }


        token.value = await axios.post('https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/login/', dataForm, 
        );

        
        console.log(token.value.data.token);

        const userdataForm = new FormData();
        userdataForm.append('username', "regtest");
        
        var res = await axios.post('https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getstocks/', userdataForm);

        console.log(res);
        

        // axios.post('https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/login/', dataForm)
        //     .then(response => this.setState({token : response.data}));
    }

    render()
    {

        return(
            
            <div>
                <Container>
                    <Row>
                        <p>User Test</p>
                        <p> </p>
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
