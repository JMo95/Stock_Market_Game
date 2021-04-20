import React from "react";
import "./../css/Landing.css"
import pict from "./../Image/Stock.jfif"
import search_p from "./../Image/BUTTON_search.png"
import {Button, Container, Row, Col, Table, Form, Card} from 'react-bootstrap'
import token from './table';

token.value = 'test123';


class landing extends React.Component
{
  constructor(props) 
  {
    super(props);
  }


  render()
  {
      return(
          <Container fluid>
          <h1>CEN 4914 Beginner Stock Trading Resource</h1>
          <Row>
              <Col>
              <p className="mt-5"></p>
              <h3>About Us</h3>
              <p className="text-md-left">The Beginner Stock Trading Resource was created for our senior project at the University of Florida. We created this website to assist beginner stock traders who are interested in learning how to trade on the stock market. Our group is split up into two team’s; frontend and backend. On our frontend development team we have Jose Quintas and Joshua Morin. Our backend development team has Stephen Lu, Benjamin Berline, and Jacob Meisenheimer. We gained a great deal of knowledge and had a lot of fun creating this project. We hope you enjoy using it as much as we do.</p>
              <p className="mt-5"></p>
              <h3>How To Use</h3>
              <p className="text-md-left">
                  <ul>
                  <li><b>Navbar:</b> The navigation bar is used to switch between pages. From here you can access your account, the search page, and the trading page.</li>
                  <li><b>Search Page:</b> Search for any stock symbol you would like information on.</li>
                  <li><b>Trading Page:</b> Buy and sell stocks and view the list of stocks you are holding. You must be signed in to access this feature.</li>
                  <li><b>Welcome/User:</b> Login or register and manage your account from this page.</li>
                  </ul>
              </p>
              </Col>

              { <Col>
              <p className="mt-5"></p>
              <Card className="bg-dark text-white">
              <Card.Img src={[pict]} height={360} alt="Card image" />
              <Card.ImgOverlay>
                  <Card.Title></Card.Title>
              </Card.ImgOverlay>
              </Card>
              <p className="mt-5"></p>
              <h3>User Information</h3>
              <p className="text-md-left">To create an account click on the dropdown welcome button in the top right corner of the screen and click register. Once all of your information is filled in you will be able to sign into your account using your email and password that you registered with. Upon creating an account, you will be given $100,000 that you are free to trade with. To start trading click on the trade tab in the navigation bar. Once there, to purchase or sell a stock type in the symbol of the stock you want to trade and the quantity. The stock will now be added or removed to your stock list and your balance will be updated as the stock(s) rise or fall.</p>
              </Col> }

          </Row>
          
          </Container>
      );
  }
}

export default landing;
