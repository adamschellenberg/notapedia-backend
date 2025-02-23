import React from 'react';
import './HomePage.css';
import Container from 'react-bootstrap/Container';
import Masquiti from '../../assets/images/masquiti.png';

export const HomePage = () => {
  return (
    <div>
      <div className="homeBackground"/>
      <Container>
        <div className="main">
          <div><h1>Welcome to Notapedia</h1></div>
          <hr />
          <div>Notapedia is a fan-made wiki for the Notamon: Extinction game.
            Because this website is fully developed and maintained by fans in their
            free time, things are always changing and being updated. Check back
            often to see the new updates!
            <br />
            Happy taming!
          </div>
          <hr />
          <img src={Masquiti} className="img" alt="Masquiti"/>
        </div>
      </Container>
    </div>
  )
}