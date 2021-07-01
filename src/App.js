import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GlobalProvider } from "./context/GlobalState";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Details from "./components/Details";
import ListDetails from "./components/ListDetails";

function App() {
  return (
    <GlobalProvider>
      <div>
        <Container>
          <Row>
            <Col className="p-1">
              <Details />
            </Col>
          </Row>
          <Row>
            <Col className="p-1">
              <ListDetails />
            </Col>
          </Row>
        </Container>
      </div>
    </GlobalProvider>
  );
}

export default App;
