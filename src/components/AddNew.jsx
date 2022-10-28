import "./addNew.css";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert, InputGroup } from "react-bootstrap";
import { UsersContext } from "../context/UsersContext";
import MyAlert from "./MyAlert";
const img = "https://bit.ly/3DsnXKu";

function AddNew({ data, index, finishEdit }) {
  if (data) {
    var fname = data.firstName;
    var lname = data.lastName;
    var mail = data.email;
    var add = data.address;
    var image = data.userImage;
    var age = data.userAge;
    var id = data.userId;
  }
  const { modifyTable } = useContext(UsersContext);
  const [firstName, setFirstName] = useState(fname || "");
  const [lastName, setLastName] = useState(lname || "");
  const [email, setEmail] = useState(mail || "");
  const [address, setAddress] = useState(add || "");
  const [userImage, setUserImage] = useState(image || img);
  const [userAge, setUserAge] = useState(age || "");
  const [userId, setUserId] = useState(id || "");
  const [imgUrl, setImgUrl] = useState("");
  const [alert, setAlert] = useState({ state: false, data: "" });

  const style = {
    backgroundImage: `url("${userImage}")`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  const inputFname = useRef();
  const inputLname = useRef();
  const inputEmail = useRef();
  const currentImage = useRef();
  const inputAddress = useRef();
  const inputAge = useRef();
  const inputID = useRef();

  const [firstNameValid, setFirstNameVaild] = useState(true);
  const [lastNameValid, setLastNameVaild] = useState(true);
  const [emailValid, setEmailVaild] = useState(true);
  const [addressValid, setAddressVaild] = useState(true);
  const [ageValid, setAgeVaild] = useState(true);
  const [idValid, setIdVaild] = useState(true);

  let editState = { value: false, index };

  const validateFirstName = (name) => {
    const regex = /^[A-Za-z]{3,}$/;
    if (regex.test(name)) {
      setFirstNameVaild(true);
    } else {
      setFirstNameVaild(false);
    }
  };

  const validateLastName = (name) => {
    const regex = /^[A-Za-z]{3,}$/;
    if (regex.test(name)) {
      setLastNameVaild(true);
    } else {
      setLastNameVaild(false);
    }
  };

  const validateEmail = (name) => {
    const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (regex.test(name)) {
      setEmailVaild(true);
    } else {
      setEmailVaild(false);
    }
  };

  const validateAddress = (name) => {
    const regex = /^[A-Za-z0-9/+-_ ]{5,}$/;
    if (regex.test(name)) {
      setAddressVaild(true);
    } else {
      setAddressVaild(false);
    }
  };

  const validateID = (name) => {
    const regex = /^[A-Za-z0-9]{3,}$/;
    if (regex.test(name)) {
      setIdVaild(true);
    } else {
      setIdVaild(false);
    }
  };

  const validateAge = (x) => {
    if (Number(x) > 0 && Number(x) < 100) {
      setAgeVaild(true);
    } else {
      setAgeVaild(false);
    }
  };

  const handleUserInput = (type) => {
    if (type === "fName") {
      validateFirstName(inputFname.current.value);
      setFirstName(inputFname.current.value);
    } else if (type === "lName") {
      validateLastName(inputLname.current.value);
      setLastName(inputLname.current.value);
    } else if (type === "email") {
      validateEmail(inputEmail.current.value);
      setEmail(inputEmail.current.value);
    } else if (type === "address") {
      validateAddress(inputAddress.current.value);
      setAddress(inputAddress.current.value);
    } else if (type === "age") {
      validateAge(inputAge.current.value);
      setUserAge(inputAge.current.value);
    } else if (type === "id") {
      validateID(inputID.current.value);
      setUserId(inputID.current.value);
    } else if (type === "imgUrl") {
      setImgUrl(currentImage.current.value);
    } else if (type === "newImg") {
      try {
        if (imgUrl.match(/\.(jpeg|jpg|png)$/) != null) {
          setUserImage(imgUrl);
        } else {
          setAlert({
            state: true,
            data: `the image url must end with one of these extensions jpeg, jpg, png`,
          });
        }
      } catch (error) {
        setAlert({ state: true, data: "invalid image url" });
      }
    }
  };
  const getUserData = (e) => {
    e.preventDefault();
    if (
      firstNameValid &&
      lastNameValid &&
      emailValid &&
      firstName &&
      lastName &&
      email &&
      address &&
      userAge
    ) {
      const userData = {
        firstName,
        lastName,
        email,
        address,
        userAge,
        userImage,
      };
      if (data) {
        editState.value = true;
        finishEdit(true);
      }
      modifyTable(userData, editState);
      setFirstName("");
      setLastName("");
      setEmail("");
      setAddress("");
      setUserAge("");
      setUserImage(img);
      setImgUrl("");
    } else {
      setAlert({
        state: true,
        data: "You must complete all data first then submit",
      });
    }
  };
  const handleCloseAlert = (x) => {
    if (x) {
      setAlert({ stat: false, data: "" });
    }
  };
  return (
    <div>
      {alert.state && (
        <MyAlert alertData={alert.data} closeAlert={handleCloseAlert}></MyAlert>
      )}
      <Form onSubmit={getUserData} className="pt-3">
        {/* Full name fields */}
        <div className="pt-4 d-flex gap-3">
          {/* // first name input field */}
          <Form.Group className=" w-50 mb-3" controlId="">
            {/* <Form.Label>First name</Form.Label> */}
            <Form.Control
              ref={inputFname}
              type="text"
              placeholder="First name ..."
              value={firstName}
              onChange={() => {
                handleUserInput("fName");
              }}
            />
            {firstNameValid || (
              <Alert variant="danger" className="py-2 my-1 fs-6 fw-lighter">
                Username only contains alphapets more than 3
              </Alert>
            )}
          </Form.Group>

          {/* // last name input field */}
          <Form.Group className="w-50 mb-3" controlId="">
            {/* <Form.Label>Last name</Form.Label> */}
            <Form.Control
              ref={inputLname}
              type="text"
              placeholder="Last name ..."
              value={lastName}
              onChange={() => {
                handleUserInput("lName");
              }}
            />
            {lastNameValid || (
              <Alert variant="danger" className="py-2 my-1 fs-6 fw-lighter">
                Username only contains alphapets more than 3
              </Alert>
            )}
          </Form.Group>
        </div>

        {/* ID and email fields */}
        <div className="fullName d-flex gap-3">
          {/* // ID input field */}
          <Form.Group className="mb-3 w-50" controlId="">
            {/* <Form.Label>ID</Form.Label> */}
            <Form.Control
              ref={inputID}
              type="text"
              placeholder="ID ..."
              value={userId}
              onChange={() => {
                handleUserInput("id");
              }}
            />
            {idValid || (
              <Alert variant="danger" className="py-2 my-1 fs-6 fw-lighter">
                ID must contain 3 charcter from any of alphapets or numbers only
              </Alert>
            )}
          </Form.Group>

          {/* // email input field */}
          <Form.Group className="mb-3 w-50" controlId="">
            {/* <Form.Label>Email</Form.Label> */}
            <Form.Control
              ref={inputEmail}
              type="text"
              placeholder="Email ..."
              value={email}
              onChange={() => {
                handleUserInput("email");
              }}
            />
            {emailValid || (
              <Alert variant="danger" className="py-2 my-1 fs-6 fw-lighter">
                email must be in the form ***@***.com
              </Alert>
            )}
          </Form.Group>
        </div>

        {/* Age and Address fields */}
        <div className="fullName d-flex gap-3">
          {/* // Age input field */}
          <Form.Group className="mb-3 w-25" controlId="">
            {/* <Form.Label>Age</Form.Label> */}
            <Form.Control
              ref={inputAge}
              type="number"
              min="1"
              max="100"
              value={userAge}
              placeholder="Age ..."
              onChange={() => {
                handleUserInput("age");
              }}
            />
            {ageValid || (
              <Alert variant="danger" className="py-2 my-1 fs-6 fw-lighter">
                age must be between 1 to 100
              </Alert>
            )}
          </Form.Group>

          {/* // address input field */}
          <Form.Group className="mb-3 w-75" controlId="">
            {/* <Form.Label>Address</Form.Label> */}
            <Form.Control
              ref={inputAddress}
              type="text"
              placeholder="Address ..."
              value={address}
              onChange={() => {
                handleUserInput("address");
              }}
            />
            {addressValid || (
              <Alert variant="danger" className="py-2 my-1 fs-6 fw-lighter">
                address must contain 5 charcter from any of alphapets or numbers
                or one of these (/+-_ )
              </Alert>
            )}
          </Form.Group>
        </div>

       {/* Gender and Martial state and department fields */}
       <div className="fullName d-flex gap-3">

       </div>

        {/* // Image input field */}
        <div className="imgField d-flex flex-column justify-content-between border">
          <div className="userImage border">
            <div className={`img`} style={style} />
          </div>
          <Form.Group className="my-3" controlId="">
            <InputGroup className="mb-3">
              <Button
                variant="outline-secondary"
                id="button-addon1"
                onClick={() => {
                  handleUserInput("newImg");
                }}
              >
                apply
              </Button>
              <Form.Control
                placeholder="enter new image url here"
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={imgUrl}
                ref={currentImage}
                onChange={() => {
                  handleUserInput("imgUrl");
                }}
              />
            </InputGroup>
          </Form.Group>
        </div>

        {/* // Submit button */}
        <Button variant="primary" type="submit" className="shadow">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddNew;
