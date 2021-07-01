import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
const Details = () => {
  const { addUser, flag, setFlag, singleUser, updateUser } =
    useContext(GlobalContext);
const[loading,setLoading]=useState(false)
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("chennai");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    function getData() {
      if (singleUser) {
        setName(singleUser.name || "");
        setMobile(singleUser.mobile || "");
        setJob(singleUser.job || "");
        setEmail(singleUser.email || "");
        setImage(singleUser.url || "");
        setDob(moment(singleUser.dob).format("yyyy-MM-DD") || "");
      }
    }
    getData();
  }, [singleUser,url]);

  const submitHandler = async () => {
    const user = { name, mobile, email, job, location, dob, url };
    addUser(user);
    setName("");
    setMobile("");
    setEmail("");
    setJob("");
    setDob("");
    setUrl("");
    setImage("");
  };
  const updateHandler = async () => {
    const user = { name, mobile, email, job, location, dob };
    updateUser(singleUser._id, user);
    setName("");
    setMobile("");
    setEmail("");
    setJob("");
    setDob("");
    setFlag(false);
  };
  const uploadHandler = async (e) => {
    setLoading(true)
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "mern-project");
    data.append("cloud_name", "djclc3a7t");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/djclc3a7t/image/upload",
        data
      );
      setUrl(res.data.url);
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };
  return (
    <div>
      <Container>
        <fieldset className="border p-2">
          <legend className="w-auto">Registration</legend>
          <Row>
            <Col>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Fullname
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Mobile
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={3}>
                  Job Type
                </Form.Label>
                <Col
                  sm={9}
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                >
                  <Form.Check
                    type="radio"
                    label="FT"
                    value="FT"
                    name="jobType"
                  />
                  <Form.Check
                    type="radio"
                    label="PT"
                    value="PT"
                    name="jobType"
                  />
                  <Form.Check
                    type="radio"
                    label="Consultant"
                    value="Consultant"
                    name="jobType"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Pref Location
                </Form.Label>
                <Col sm={9}>
                  <Form.Control as="select" custom>
                    <option value="chennai">Chennai</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Row>
                <Col sm={2}>Profile</Col>
                <Col sm={10}>
                  {loading&&<h3>Loading...</h3>}
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={url}
                      style={{ width: "8rem" }}
                    />
                    <Card.Body>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => uploadHandler(e)}
                      />
                    </Card.Body>
                  </Card>
                </Col>{" "}
              </Row>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  DOB
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </Col>
              </Form.Group>
              {flag ? (
                <div className="float-right">
                  <Button variant="secondary" onClick={() => updateHandler()}>
                    Update
                  </Button>
                </div>
              ) : (
                <div className="float-right">
                  <Button variant="secondary" onClick={() => submitHandler()}>
                    Submit
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </fieldset>
      </Container>
    </div>
  );
};

export default Details;
