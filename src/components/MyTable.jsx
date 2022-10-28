import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { Alert, Container } from "react-bootstrap";
import { useContext, useState } from "react";
import { UsersContext } from "../context/UsersContext";
import "./myTable.css";
import ViewUser from "./ViewUser";
import AddNew from "./AddNew";

function MyTable() {
  let { users, modifyTable, searchData } = useContext(UsersContext);
  const [viewUser, setViewUser] = useState({ state: false, item: 0 });
  const [editUser, setEditUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  const handleEditWindow = (x) => {
    setEditUser(false);
  };
  if (searchData.length >= 1) {
    users = searchData;
  }
  return (
    <div className="mx-5">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>UserEmail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="align-middle">{index + 1}</td>
                  <td className="align-middle">
                    <img className="tableImages" src={user.userImage} alt="" />
                  </td>
                  <td className="align-middle">{user.firstName}</td>
                  <td className="align-middle">{user.lastName}</td>
                  <td className="align-middle">{user.email}</td>
                  <td className="align-middle">
                    <ButtonToolbar aria-label="Toolbar with button groups">
                      <ButtonGroup className="m-auto " aria-label="First group">
                        <Button
                          variant="outline-primary px-3"
                          onClick={() => {
                            setEditUser({
                              state: true,
                              item: user,
                              index: index + 1,
                            });
                          }}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="outline-primary px-3"
                          onClick={() => {
                            setViewUser({ state: true, item: user });
                          }}
                        >
                          View
                        </Button>{" "}
                        <Button
                          variant="outline-primary px-3"
                          onClick={() => {
                            setDeleteUser({
                              state: true,
                              index: index + 1,
                            });
                          }}
                        >
                          Del
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      {viewUser.state && (
        <div className="overlay">
          <div className="opendWindow bg-white p-4 rounded">
            <div
              className="closeOverlay text-primary rounded border"
              onClick={() => {
                setViewUser(false);
              }}
            >
              close
            </div>
            <ViewUser data={viewUser.item}></ViewUser>
          </div>
        </div>
      )}

      {editUser.state && (
        <div className="overlay">
          <div className="opendWindow bg-white p-4 rounded">
            <div
              className="closeOverlay text-primary rounded border"
              onClick={() => {
                setEditUser(false);
              }}
            >
              close
            </div>
            <AddNew
              finishEdit={handleEditWindow}
              data={editUser.item}
              index={editUser.index}
            ></AddNew>
          </div>
        </div>
      )}

      {deleteUser && (
        <div className="overlay">
          <Alert
            variant="danger"
            onClose={() => setDeleteUser(false)}
            dismissible
            className="w-50 p-5"
          >
            <Alert.Heading>
              Are you shore you want to delete this item
            </Alert.Heading>
            <Button
              variant="secondary"
              className="mt-5 px-4"
              onClick={() => {
                modifyTable({}, false, {
                  value: deleteUser.state,
                  index: deleteUser.index,
                });
                setDeleteUser(false);
              }}
            >
              Yes
            </Button>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default MyTable;
