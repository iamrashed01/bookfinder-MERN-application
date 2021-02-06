import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
const Register = () => {
  const [dob, setDob] = useState(new Date());
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    mobile: "",
  });
  const changeHandler = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(state);
    console.log(dob);
  };
  return (
    <div className="authWrapper">
      <Container>
        <Row>
          <Col xs={{ size: "6", offset: "3" }}>
            <div className="mb-4 text-center">
              <h3 className="text-center">Login Page</h3>
            </div>
            <Card>
              <CardBody>
                <Form onSubmit={submitHandler} className="px-4">
                  <FormGroup>
                    <Label>Name</Label>
                    <Input
                      name="name"
                      value={state.name}
                      onChange={changeHandler}
                      placeholder="Place your Name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={state.email}
                      onChange={changeHandler}
                      placeholder="Place your Email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      name="password"
                      type="password"
                      value={state.password}
                      onChange={changeHandler}
                      placeholder="Place your Password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>gender</Label>
                    <Input
                      type="select"
                      name="gender"
                      value={state.gender}
                      onChange={changeHandler}
                      placeholder="Place your gender"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>mobile</Label>
                    <Input
                      name="mobile"
                      value={state.mobile}
                      onChange={changeHandler}
                      placeholder="Place your mobile"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>dob</Label>
                    <DatePicker
                      className="form-control"
                      selected={dob}
                      onChange={(date) => setDob(date)}
                    />
                  </FormGroup>
                  <div className="d-flex mt-3">
                    <Button color="primary" type="submit" className="px-4 mr-3">
                      Signup
                    </Button>
                    <Link href="/login">
                      <a className="mt-1">already have an account</a>
                    </Link>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
