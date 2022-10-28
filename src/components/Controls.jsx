import "./controls.css";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import AddNew from "./AddNew";
import { useContext, useState } from "react";
import { UsersContext } from "../context/UsersContext";

function Controls() {
  let { users, search } = useContext(UsersContext)
  const [addUser, setAddUser] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState('')

  const handleSearchInput = (e) => {
    const searchTerm = e.target.value
    const searchResult = users.filter((item, index) => {
      return(
        `${item.firstName.toLowerCase()} ${item.lastName.toLowerCase()}`.includes(searchTerm.toLowerCase())
      )
    })
    search(searchResult)
  }

  return (
    <div className="controls my-4">
        <Row className="mx-1">
          <Col>
            <h4 className="text-primary">USERS</h4>
          </Col>
          <Col>
            <div className="search">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="search by name"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={handleSearchInput}
                />
                <Button variant="outline-secondary" id="button-addon2" disabled>
                  Search
                </Button>
              </InputGroup>
            </div>
          </Col>
          <Col>
            <Button
              variant="outline-primary"
              onClick={() => {
                setAddUser(true);
              }}
            >
              Create
            </Button>
          </Col>
        </Row>
        {addUser && (
          <div className="overlay">
            <div className="opendWindow bg-white p-4 rounded">
              <div
                className="closeOverlay text-primary rounded border"
                onClick={() => {
                  setAddUser(false);
                }}
              >
                close
              </div>
              <AddNew></AddNew>
            </div>
          </div>
        )}
      {/* </Container> */}
    </div>
  );
}

export default Controls;
