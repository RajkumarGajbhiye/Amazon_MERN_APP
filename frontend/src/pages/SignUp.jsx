import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux";
import { userSignUp } from "../redux/thunk/userThunk";

const SignUp = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
 const {user,success,error,isLoading} = useSelector((state)=>state.signUp)

  let [signup, setSignup] = useState({
    username: "",
    mobile: "",
    email: "",
    password: "",
    image: null,
  });

  //validation function:
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "! Enter your name";
    }
    if (!values.mobile) {
      errors.mobile = "! Enter your mobile number";
    }
    if (!values.email) {
      errors.email = "! Enter your mail";
    } else if (!regex.test(values.email)) {
      errors.email = "! This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "! Enter your password";
    } 
    else if (values.password.length < 6) {
     return errors.password = "! Password should at least 6 characters";
    }
   
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signup)
    try {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        
      }
      setErrorMessage(validate(signup));
      if (
        signup.username &&
        signup.mobile &&
        signup.email &&
        signup.password && 
        signup.image 
      ) {
        dispatch(userSignUp(signup));
        
        setSignup({
          username: "",
          mobile: "",
          email: "",
          password: "",
          image: "",
        });
        navigate("/signin");
      }
      setValidated(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignup({
        ...signup,
        image: JSON.stringify(file),
      });

      //The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
      const reader = new FileReader();
      //The loadend event is fired when a file read has completed, successfully or not.
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      /*
The readAsDataURL method of the FileReader interface is used to read the contents of the specified Blob or File.
When the read operation is finished,
the readyState becomes DONE, and
the loadend is triggered.
At that time, the result attribute contains the data as a data: URL representing the file's data as a base64 encoded string.
    */
      reader.readAsDataURL(file);
    }
  };

 
    // useEffect(()=>{
    //   if(!error){
    //     navigate("/signin") 
    //   }
    // },[error])


  return (
    <Container className="py-4 " fluid>
      <Row className="justify-content-md-center mb-4">
        <Col md="auto">
          <Link to="/">
          <Image
            width="100"
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          />
          </Link>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title>
                <div>
                <h2>Create Account</h2>
                </div>
              </Card.Title>

              <>
              
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3 w-70">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First and Last Name"
                      size="sm"
                      name="username"
                      value={signup.username}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessage.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 w-70">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Mobile Number"
                      size="sm "
                      name="mobile"
                      value={signup.mobile}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessage.mobile}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 w-70">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter Email"
                      size="sm"
                      name="email"
                      value={signup.email}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessage.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 w-70">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="At least 6 character"
                      size="sm"
                      name="password"
                      value={signup.password}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessage.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 mt-5 d-flex flex-direction-row">
                    {imagePreview ? (
                      <Image
                        width="100px"
                        src={imagePreview}
                        alt="selected"
                        style={{ position: "relative", bottom: "12px" }}
                        roundedCircle
                      />
                    ) : (
                      <Image
                        width="60px"
                        src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"
                        alt="selected"
                        roundedCircle
                      />
                    )}
                    <Form.Control
                      required
                      type="file"
                      className="h-25"
                      onChange={handleImageChange}
                    />
                  </Form.Group>

                  <Container className="d-grid gap-2">
                    <Button type="submit" variant="warning" size="lg" style={{fontSize:"14px"}}>
                      Sign up
                    </Button>
                  </Container>
                </Form>
               
              </>
            </Card.Body>
            <Card.Footer>
              <Container>
                Already have an account? <Link to="/signin">Sign in</Link>
              </Container>
              <br />
              <br />
              <span>
                By creating an account or logging in, you agree to Amazon's
                Conditions of Use and Privacy Policy.
              </span>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <hr />

      <Row className="justify-content-center" style={{ fontSize: "11px" }}>
        <Col md="auto">
          <Link
            to="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_cou?ie=UTF8&nodeId=200545940"
            target="_blank"
          >
            Conditions of use
          </Link>
        </Col>
        <Col md="auto">
          <Link
            to="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_privacy_notice?ie=UTF8&nodeId=200534380"
            target="_blank"
          >
            Privacy Notice
          </Link>
        </Col>
        <Col md="auto">
          <Link
            to="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=508510"
            target="_blank"
          >
            Help
          </Link>
        </Col>
        <span className="text-center">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </span>
      </Row>
    </Container>
  );
};

export default SignUp;

