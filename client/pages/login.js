import Link from "next/link";
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
const login = () => {
  return (
    <div className="authWrapper">
      <Container>
        <Row>
          <Col xs={{ size: "6", offset: "3" }}>
            <Card>
              <CardBody>
                <div className="mb-4 text-center">
                  <h3 className="text-center">Login Page</h3>
                </div>
                <Form>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input placeholder="Place your Email" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input placeholder="Place your Password" />
                  </FormGroup>
                  <div className="d-flex">
                    <Button color="primary" className="px-4 mr-3">
                      Login
                    </Button>
                    <Link href="/register">
                      <a className="mt-1">create an account</a>
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

export default login;
