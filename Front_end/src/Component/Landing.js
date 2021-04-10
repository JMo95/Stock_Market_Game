import React from "react";
import "./../css/Landing.css"
import pict from "./../Image/Stock.jfif"
import search_p from "./../Image/BUTTON_search.png"
import {Button, Container, Row, Col, Table, Form, Card} from 'react-bootstrap'


class landing extends React.Component
{
  constructor(props) 
  {
    super(props);
  }

  render()
  {
      return(
          <Container>
          <h1>CEN 4914 Beginner Stock Trading Resource</h1>
          <Row>
              <Col>
              <p className="mt-5"></p>
              <h3>About Us</h3>
              <p className="text-md-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque iaculis arcu a dui auctor pellentesque. Fusce nec lectus scelerisque magna ultricies finibus at eleifend arcu. Aliquam lacinia blandit erat, ac eleifend neque dapibus ut. Quisque varius molestie nisl rhoncus tempus. Maecenas elementum vestibulum tellus. Cras cursus varius venenatis. Aenean sit amet felis turpis. Nulla eu porta libero, in laoreet felis. Ut sagittis nisi ut ipsum tincidunt porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies viverra diam nec pulvinar. Vestibulum interdum dolor sit amet congue imperdiet. Proin bibendum ante nec sem bibendum, ac ultricies sem tincidunt. Maecenas molestie id lectus pellentesque fermentum. In in viverra libero. Maecenas at maximus tellus. Ut ac interdum elit. Donec euismod vitae dui at ullamcorper. Sed tincidunt enim quis erat laoreet faucibus. Etiam pretium euismod massa non tempor. Etiam blandit justo in dignissim commodo.</p>
              <p className="mt-5"></p>
              <h3>How To Use</h3>
              <p className="text-md-left">
                  <ul>
                  <li>Navbar: </li>
                  <li>Search Page: </li>
                  <li>Trading Page: </li>
                  <li>User: </li>
                  </ul>
              </p>
              </Col>

              <Col>
              <p className="mt-5"></p>
              <Card className="bg-dark text-white">
              <Card.Img src={[pict]} height={360} alt="Card image" />
              <Card.ImgOverlay>
                  <Card.Title></Card.Title>
              </Card.ImgOverlay>
              </Card>
              <p className="mt-5"></p>
              <h3>User Information</h3>
                  <p>Nulla eu porta libero, in laoreet felis. Ut sagittis nisi ut ipsum tincidunt porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies viverra diam nec pulvinar. Vestibulum interdum dolor sit amet congue imperdiet. Proin bibendum ante nec sem bibendum, ac ultricies sem tincidunt. Maecenas molestie id lectus pellentesque fermentum. In in viverra libero. Maecenas at maximus tellus. Ut ac interdum elit. Donec euismod vitae dui at ullamcorper. Sed tincidunt enim quis erat laoreet faucibus. Etiam pretium euismod massa non tempor. Etiam blandit justo in dignissim commodo.</p>
              </Col>

          </Row>
          
          </Container>
      );
  }
}

export default landing;
