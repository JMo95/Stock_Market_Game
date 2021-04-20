import React  , { useState, useEffect, Fragment }  from "react";
import {Button, Container, Row, Col, Table, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import Stocks from './table';




const Trading = () => {

    const [email, setEmail] = useState('')
    
    const [money, setMoney] = useState('')
    const [bearerX, setbearerX] = useState('')
    const [username, setUsername] = useState('')
    const [stock_name, setStock_name] = useState('')
    const [quantity, setQuantity] = useState('')
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(false);
    const [reload, setReload] = useState(false);

    
  
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
  

        ////////////////////////////////
        //////////GET USER
        ///////////////////////////////

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
            localStorage.clear()
             setErrors(true)
           });


    }, []);
  


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
        // // Simple POST request with a JSON body using axios
        // //const article = { title: 'React POST Request Example' };
        // const dataForm = new FormData();
        // dataForm.append('username', "testwjose");
        // dataForm.append('password', "password");
        // console.log("Component Did Mount");
        // for (var value of dataForm.values()) {
        //     console.log(value);
        // }


        // // token.value = await axios.post('https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/login/', dataForm, );

        // token.value =  axios.post('https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/login/', dataForm, );
        
        // console.log(token.value.data.token);

        // const userdataForm = new FormData();
        // userdataForm.append('username', "regtest");
        
        // // var res = await axios.post('https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getstocks/', userdataForm);
        // var res =  axios.post('https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getstocks/', userdataForm);

        // console.log(res);
        

        // axios.post('https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/login/', dataForm)
        //     .then(response => this.setState({token : response.data}));
    }

    function onSucess(e)
    {
        setReload(false)
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
        .then(function(result){ 
            console.log(result)
            setReload(true)
        })
        .catch(function(error){
            console.log(' there is an error', error)
            setErrors(true)
        });

        if (reload)
        {
            window.location.reload();
        }

    }

    function onSell(e)
    {
        setReload(false)
        console.log("SELL SHOUULD HAPPEN ")
        console.log("Sucess happen on the user: ", username)
        console.log("This is stock name: ", stock_name)
        console.log("This is quantity: ", quantity)
        console.log("This is money: ", money)

        var myHeaders = new Headers();
        myHeaders.append("Authorization", bearerX);

        var formdata = new FormData();
        formdata.append("quantity", quantity);
        formdata.append("stock", stock_name);
        formdata.append("user", username);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

        fetch("https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/sellStock/", requestOptions)
        .then(response => response.text())
        .then(function(result) {
            console.log(result)
            setReload(true)
        })
        .catch(function(error) {
            console.log('error', error)
            setReload(false)
            setErrors(true)
        });

        if(reload)
        {
            window.location.reload();
        }

    }

    // render()
    // {

        return(
            
            <div>
            {errors ==true?
                <div> You had gotten Logout, your account has expired</div>
                :
                <div> 
                    <Container>
                        <Row>
                            <p> </p>
                            <Col><h4>Balance: ${money}</h4></Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                        <p className="mt-5"></p>
                        <Row>
                            
                            <Col xs={6}>
                                <h2>Your Stock List</h2>
                                <p className="mt-5"></p>
                                < Stocks />
                            </Col>
                            <Col xs={6}>
                                <h2> Buy/Sell</h2>
                                <p className="mt-4"></p>
                                <Form>
                                    {errors == true?
                                    <div>Wrong input</div>
                                :
                                    <div></div>}
                                    <Form.Row>
                                        <Col xs={6}>

                                        <h6>Stock Name</h6>
                                        {/* <input></input> */}
                                        <Form.Control placeholder="Enter stock name..." value={stock_name} onChange={(e) => setStock_name(e.target.value) } />
                                        {/* ; 
                                            console.log("This is the text value ", e.target.value )
                                        */}
                                        <p className="mt-2"></p>
                                        
                                        </Col>
                                        <Col>
                                        <h6>Quantity</h6>
                                        <Form.Control placeholder="Qty..."  onChange={(e) => setQuantity(e.target.value) }/>
                                        </Col>
                                        {/* <Col>
                                        <h6>Price</h6>
                                        <Form.Control placeholder="$0.0" onChange={(e) => setMoney(e.target.value) }/>
                                        </Col> */}
                                    </Form.Row>
                                    <Row>
                                        <Col>
                                            <Button variant="success" onClick={(e) => onSucess(e)} size="lg" block >Buy</Button>
                                            {/*   */}

                                        </Col>
                                        <Col>
                                            <Button variant="danger" onClick={(e) => onSell(e)}  size="lg" block>Sell</Button>  
                                        </Col>
                                    </Row>
                                </Form>
                                    
                            </Col>
                        </Row>
                    </Container>
            </div>
                }
            </div>
            
            
        );
    // }

}
export default Trading;
