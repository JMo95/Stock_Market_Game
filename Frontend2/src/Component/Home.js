import React from "react";
import "./../css/Landing.css"
import pict from "./../Image/Stock.jfif"
import search_p from "./../Image/BUTTON_search.png"
import {Button, Container, Row, Col, Table, Form, Card} from 'react-bootstrap'


class Home extends React.Component
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
                    <p className="text-md-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque iaculis arcu a dui auctor pellentesque. Fusce nec lectus scelerisque magna ultricies finibus at eleifend arcu. Aliquam lacinia blandit erat, ac eleifend neque dapibus ut. Quisque varius molestie nisl rhoncus tempus. Maecenas elementum vestibulum tellus. Cras cursus varius venenatis. Aenean sit amet felis turpis.</p>
                    </Col>

                    <Col>
                    <p className="mt-5"></p>
                    <Card className="bg-dark text-white">
                    <Card.Img src={[pict]} height={360} alt="Card image" />
                    <Card.ImgOverlay>
                        <Card.Title></Card.Title>
                    </Card.ImgOverlay>
                    </Card>
                    </Col>

                </Row>
                
                </Container>
            );
        }
}

export default Home;
