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

    const [stock_name, setStock_name] = useState([{Symbol: "", price: ""}])
    const [stock_n2, setStock_n2] = useState({ "" : ""})

    const [price, setPrice] = useState('')
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(false);

    var list_s = ["AAPL", "T", "COX", "CHP", "GME", "AMC", "AMZ",  "GOOG"]

    const [accuse, setAccuse] = useState([{Symbol: "", Quantity: 0}])
    const [stock_c, setstock_c] = useState([{
                    "low range": "",
                    "high range": "",
                    "volume": "",
                    "avg volume": "",
                    "market cap": "",
                    "P/E": "",
                    "price": ""
                }])

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
            
            
        })
        .catch(error => console.log('This is the error going on: ', error));


        ////////////////////////
        /////// getstocks
        ////////////////////////
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          var url = "https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getData/?symbol="

        //hardcore values of stocks
          { 
          //1.GOOG
          var symb = "GOOG"
            var url2 = url + symb
          
          fetch(url2, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                //  console.log(result)},
                 setStock_name( arr => [... arr , {Symbol: symb , price: result.price  } ])
            }
                 )
            .catch(function(error)
            {
                console.log('error', error)
                setStock_name( arr => [... arr , {Symbol: symb , price: "???"  } ])
        
            }
            );

            //2. COX
            var symb2 = "COX"
            url2 = url + symb2
          
          fetch(url2, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                //  console.log(result)},
                 setStock_name( arr => [... arr , {Symbol: symb2 , price: result.price  } ])
            }
                 )
            .catch(function(error)
            {
                console.log('error', error)
                setStock_name( arr => [... arr , {Symbol: symb2 , price: "???"  } ])
        
            }
            );

            //3. apl
            var symb3 = "AAPL"
            url2 = url + symb3
          
          fetch(url2, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                //  console.log(result)},
                 setStock_name( arr => [... arr , {Symbol: "APL" , price: result.price  } ])
            }
                 )
            .catch(function(error)
            {
                console.log('error', error)
                setStock_name( arr => [... arr , {Symbol: "APL" , price: "???"  } ])
        
            }
            );


            //4. T
            var symb4 = "T"
            url2 = url + symb4
          
          fetch(url2, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                //  console.log(result)},
                 setStock_name( arr => [... arr , {Symbol: symb4 , price: result.price  } ])
            }
                 )
            .catch(function(error)
            {
                console.log('error', error)
                setStock_name( arr => [... arr , {Symbol: symb4 , price: "???"  } ])
        
            }
            );

            //5. CHP
            var symb5 = "CHP"
            url2 = url + symb5
          
          fetch(url2, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                //  console.log(result)},
                 setStock_name( arr => [... arr , {Symbol: symb5 , price: result.price  } ])
            }
                 )
            .catch(function(error)
            {
                console.log('error', error)
                setStock_name( arr => [... arr , {Symbol: symb5 , price: "???"  } ])
        
            }
            );

            //6. GME
            var symb6 = "GME"
            url2 = url + symb6
          
          fetch(url2, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                //  console.log(result)},
                 setStock_name( arr => [... arr , {Symbol: symb6 , price: result.price  } ])
            }
                 )
            .catch(function(error)
            {
                console.log('error', error)
                setStock_name( arr => [... arr , {Symbol: symb6 , price: "???"  } ])
        
            }
            );

            //7. AMZ
            var symb7 = "AMZ"
            url2 = url + symb7
          
          fetch(url2, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                //  console.log(result)},
                 setStock_name( arr => [... arr , {Symbol: symb7 , price: result.price  } ])
            }
                 )
            .catch(function(error)
            {
                console.log('error', error)
                setStock_name( arr => [... arr , {Symbol: symb7 , price: "???"  } ])
        
            }
            );

            //8. AMC
            var symb8 = "AMC"
            url2 = url + symb8
          
          fetch(url2, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                //  console.log(result)},
                 setStock_name( arr => [... arr , {Symbol: symb8 , price: result.price  } ])
            }
                 )
            .catch(function(error)
            {
                console.log('error', error)
                setStock_name( arr => [... arr , {Symbol: symb8 , price: "???"  } ])
        
            }
            );
        }


    }, []);

    function stock_l2(element)
    {
        console.log("stock_l happen")
        var unk = "???"
        var i =0
        while(i < stock_name.length)
        {
            console.log("stock_l happen with: ", stock_name[i].Symbol, " and ", element )
            if(stock_name[i].Symbol == element)
            {
                console.log("print happen")
                return  stock_name[i].price
            }
            i+=1
        }
        
        return unk

    }

  

    //  function stock_l(element)
    // {
    //     console.log("THIS IS STOKC_L working with: ", element)
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //       };
    //       var url = "https://stock-pipeli-users-fje2brrt8yy.herokuapp.com/getData/?symbol="
          
    //         var symb = element
    //         var url2 = url + symb
          
    //       fetch(url2, requestOptions)
    //         .then(response => response.json())
    //         .then(function(result) {
    //             //  console.log(result)},
    //             console.log("Set stock hapen"),
    //              setStock_n2( element , result.price )
    //             }
    //              )
    //         .catch(function(error)
    //         {
    //             console.log('error', error)
    //             setStock_name( element ,"???" )
        
    //         }
    //         );

    //         return stock_n2[element] 
    // }
   

   

    function StockList() {


        var dict = new Object();
        var dict = {
            "APL": "Apple",
            "T": "AT&T",
            "COX": "COX" , 
            "CHP": "Charge point",
            "GME": "GameStop", 
            "AMC": "AMC Entrateiment" , 
            "AMZ": "AMAZON",  
            "GOOG": "Google" 
        };
        var list_s = ["AAPL", "T", "COX", "CHP", "GME", "AMC", "AMZ",  "GOOG"]
        console.log(stock_name)


        const elements = [];
        var i =0
        return accuse.map((item) =>(

            <tr>
                <th>{item.Symbol}</th>
                <th>{dict[item.Symbol]}</th>
                {/* <th> {stock_calculator(item.Symbol)} </th> */}
                <th>
                    {
                        stock_l2(item.Symbol)
                    }
                 </th>
                <th>{item.Quantity}</th>
            </tr>   
     
            )
            )
    }

        return(
            
            <div>
            {errors ==true?
                <div> You had gotten Logout, your account has expired</div>
                :
                <div> 

                    {/* {console.log("This are my accuse ", accuse)} */}
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

                    {/* <div>
                    {stock_calculator("aapl")}
                    </div>
                    <div>
                    {stock_calculator("gme")}
                    </div> */}
            </div>
                }
            </div>
            
            
        );
    // }

}
export default Stocks;





