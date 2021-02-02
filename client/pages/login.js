import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Jumbotron,
  Label,
  Row
} from "reactstrap";
const login = () => {
  return (
    <Container>
      <Row>
        <Col xs={{ size: "6", offset: "3" }}>
          <Jumbotron className="mt-5">
            <h3 className="text-center">Login Page</h3>
          </Jumbotron>
          <Card className="mt-5">
            <CardBody>
              <Form>
                <FormGroup>
                  <Label>Email</Label>
                  <Input placeholder="Place your Email" />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input placeholder="Place your Password" />
                </FormGroup>
                <Button color="primary" className="px-4">
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default login;
