import React  , { useState, useEffect, Fragment }  from "react";
import {Button, Container, Row, Col, Table, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import axios from "axios";



const Stocks = () => {


    const [symbol, setSymbol] = useState([])
    const [quantity, setQuantity] = useState([])
    const [length, setLength] = useState(0)

    const [bearerX, setbearerX] = useState('')
    const [username, setUsername] = useState('')
    const [stock_name, setStock_name] = useState('')
    const [price, setPrice] = useState('')
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(false);

    const [accuse, setAccuse] = useState([{Symbol: "", Quantity: 0}])
  
    useEffect(() => {
      if (localStorage.getItem('token') == null) {
        window.location.replace('http://localhost:3000/');
      } else {
        setLoading(false);
      }

    //   Babuinuu92


        var myHeaders = new Headers();
        var bearer = "bearer "
        // console.log("This is my bearer: ", bearer)
        bearer += localStorage.getItem('token')
        // console.log("This is my bearer: ", bearer)
        myHeaders.append("Authorization", bearer);
        setbearerX(bearer)

        ////////////////////////////////
        //////////GET STOCK
        ///////////////////////////////
        var formdata = new FormData();
        // formdata.append("username", "Babuinuu92");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var tomato = []
        fetch("https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getstocks/", requestOptions)
        .then(response => response.json())
        .then(function(result)
        {
            console.log("This are the tock available ",result)
            setLength(Object.keys(result).length)
            setAccuse(result)
            

            var i = 0
            while (i < length)
            {
                // tomato.push(result[i])
                // console.log("This is Tomoto Omega ",tomato[i].Symbol)
                // console.log("This is symbol ",result[i].Symbol)
                setSymbol( sym => [...sym, result[i].Symbol ])
                setQuantity( quant => [...quant, result[i].Quantity ])
                i++
            }
            return true
            
        })
        .catch(error => console.log('This is the error going on: ', error));
           
        // console.log("This is Tomoto ",tomato)
        // console.log("This is Tomato 2:  ", tomato[0].Symbol)

    }, []);
  


function StockList() {

    const elements = [];
    return accuse.map((item) =>(

        <tr>
            <th>{item.Symbol}</th>
            <th>???</th>
            <th>???</th>
            <th>{item.Quantity}</th>
        </tr>         
        )
        )
  
    // for (let i = 0; i < length; i++) {
    
    //   elements.push( <tr>
    //     <th>{symbol[i]}</th>
    //     <th>???</th>
    //     <th>???</th>
    //     <th>{quantity[i]}</th>
    // </tr> );
    // }
  
    // return elements;
  }

        return(
            
            <div>
            {errors ==true?
                <div> You had gotten Logout, your account has expired</div>
                :
                <div> 

                    {console.log("This are my accuse ", accuse)}
                    <Container>
                        <p className="mt-5"></p>
                        <Row>
                            <Table striped hover>
                                <thread>
                                    <tr>
                                        <th>Symbol</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                <tbody>
                                    < StockList />
                                </tbody>
                                </thread>
                            </Table>
                            
                        </Row>
                    </Container>
            </div>
                }
            </div>
            
            
        );
    // }

}
export default Stocks;





