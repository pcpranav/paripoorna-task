import React, { useEffect, useContext } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import User from "./User";
import { GlobalContext } from "../context/GlobalState";
const ListDetails = () => {
  const { getDetails, userInfo } = useContext(GlobalContext);
  useEffect(() => {
    getDetails();
  });
  return (
    <div>
      <Container>
        {userInfo ? (
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>DOB</th>
                    <th>JOB Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo.map((user) => (
                    <User key={user._id} user={user} />
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : (
          "Loading"
        )}
      </Container>
    </div>
  );
};

export default ListDetails;
