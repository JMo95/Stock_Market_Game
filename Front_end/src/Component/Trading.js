import React  , { useState, useEffect, Fragment }  from "react";
import {Button, Container, Row, Col, Table, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import token from './token';



const Trading = () => {

    const [email, setEmail] = useState('')
    const [money, setMoney] = useState('')
    const [bearerX, setbearerX] = useState('')
    const [user, setUser] = useState('')
    const [username, setUsername] = useState('')
    const [stock_name, setStock_name] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(false);
  
    useEffect(() => {
      if (localStorage.getItem('token') == null) {
        window.location.replace('http://localhost:3000/');
      } else {
        setLoading(false);
      }

      var myHeaders = new Headers();
        var bearer = "bearer "
        // console.log("This is my bearer: ", bearer)
        bearer += localStorage.getItem('token')
        // console.log("This is my bearer: ", bearer)
        myHeaders.append("Authorization", bearer);
        setbearerX(bearer)
  
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
  
        var tomato = {
          "money": 0,
          "user__email": "",
          "user__username": "",
        };
  
        
        fetch("https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getuser/", requestOptions)
        .then(response => response.json())
        .then(function(result){
          console.log("This is a result: ", result[0])
          setUsername(result[0].user__username)
          setEmail(result[0].user__email)
          setMoney(result[0].money)
  
         } )
        .catch(function(error){
            console.log('error', error) 
            console.log("Tomato")
            localStorage.clear()
             setErrors(true)
           });

    }, []);
  
  
    // const handleUser = e => {
  
    //     var myHeaders = new Headers();
    //     var bearer = "bearer "
    //     // console.log("This is my bearer: ", bearer)
    //     bearer += localStorage.getItem('token')
    //     // console.log("This is my bearer: ", bearer)
    //     myHeaders.append("Authorization", bearer);
  
    //     var requestOptions = {
    //       method: 'GET',
    //       headers: myHeaders,
    //       redirect: 'follow'
    //     };
  
    //     var tomato = {
    //       "money": 0,
    //       "user__email": "",
    //       "user__username": "",
    //     };
        
  
        
    //     fetch("https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getuser/", requestOptions)
    //     .then(response => response.json())
    //     .then(function(result){
    //       console.log("This is a result: ", result[0])
    //       // console.log("This is a map user: ", result[0].user__username)
    //       // console.log("This is a map email: ", result[0].user__email)
    //       // console.log("This is a username: ", result[0].getElementBy('user_username'))
    //       // console.log("This is a result: ", result[0].user_username)
    //       // tomato["user__username"] = result[0].user__username
    //       // tomato.money = result[0].money
    //       // tomato.user__email = result[0].user__email
    //       setUsername(result[0].user__username)
    //       setEmail(result[0].user__email)
    //       setMoney(result[0].money)
  
    //      } )
    //     .catch(error => console.log('error', error));
  
    //   };


// class Trading extends React.Component
// {
//     constructor(props) 
//     {
//           super(props);
//     }

//     state = {   
//         token: {}

//     }

    // async componentDidMount() {
    const componentDidMount = e => {
        // Simple POST request with a JSON body using axios
        //const article = { title: 'React POST Request Example' };
        const dataForm = new FormData();
        dataForm.append('username', "testwjose");
        dataForm.append('password', "password");
        console.log("Component Did Mount");
        for (var value of dataForm.values()) {
            console.log(value);
        }


        // token.value = await axios.post('https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/login/', dataForm, );

        token.value =  axios.post('https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/login/', dataForm, );
        
        console.log(token.value.data.token);

        const userdataForm = new FormData();
        userdataForm.append('username', "regtest");
        
        // var res = await axios.post('https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getstocks/', userdataForm);
        var res =  axios.post('https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getstocks/', userdataForm);

        console.log(res);
        

        // axios.post('https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/login/', dataForm)
        //     .then(response => this.setState({token : response.data}));
    }

    function onSucess(e)
    {
        console.log("Sucess happen on the user: ", username)
        console.log("This is stock name: ", stock_name)
        console.log("This is quantity: ", quantity)
        console.log("This is money: ", money)

        var myHeaders = new Headers();
        myHeaders.append("Authorization", bearerX);

        var formdata = new FormData();
        formdata.append("quantity", quantity);
        formdata.append("stock", stock_name); //GME
        formdata.append("user", username);

        var requestOptions = 
        {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/addstock/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }

    // render()
    // {

        return(
            
            <div>
            {errors ==true?
                <div> You had gotten Logout, your account has expired</div>
                :
                <div> <Container>
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
                                {/* <input></input> */}
                                <Form.Control placeholder="Enter stock name..." onChange={(e) => setStock_name(e.target.value) } />
                                {/* ; 
                                    console.log("This is the text value ", e.target.value )
                                */}
                                <p className="mt-2"></p>
                                
                                </Col>
                                <Col>
                                <h6>Quantity</h6>
                                <Form.Control placeholder="Qty..." onChange={(e) => setQuantity(e.target.value) }/>
                                </Col>
                                <Col>
                                <h6>Price</h6>
                                <Form.Control placeholder="$4383.33" onChange={(e) => setMoney(e.target.value) }/>
                                </Col>
                            </Form.Row>
                            <Row>
                                <Col>
                                    <Button variant="success" onClick={(e) => onSucess(e)} size="lg" block >Buy</Button>
                                    {/*   */}

                                </Col>
                                <Col>
                                    <Button variant="danger" size="lg" block>Sell</Button>  
                                </Col>
                            </Row>
                        </Form>
                            
                    </Col>
                </Row>
            </Container></div>
                }
            </div>
            
            
        );
    // }

}
export default Trading;
