import ButtonLoader from "components/Loading/BtnLoader";
import SuperAdminContext from "context/admin/adminContext";
import React, { useContext, useEffect, useState } from "react";
import NotificationAlert from "react-notification-alert";

// react-bootstrap components
import { Button, Card, Container, Col, Table, Modal } from "react-bootstrap";

import Spinner from "components/Loading/Spinner";

function User() {
  const context = useContext(SuperAdminContext);

  const { getUsers, users, addUser, editUserC, deleteUser, blockUsers } = context;

  const [showModal, setShowModal] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [loading, setLoading] = useState(true);


  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    verified: true,
    username: "",
  });

  const [editUser, setEditUser] = useState({
    _id: "",
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    verified: true,
    username: "",
  });

  const [delUser, setDelUser] = useState("");


  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const editUserModal = (id) => {
    const selectedUser = users.filter((user) => user._id === id);
    setEditUser({
      _id: selectedUser[0]._id,
      name: selectedUser[0].name,
      email: selectedUser[0].email,
      role: selectedUser[0].role,
      username: selectedUser[0].username,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setEditUser({
      name: "",
      email: "",
      role: "",
      username: "",
      password: "",
      confirmPassword: "",
    }); getUsers
    setShowModal(false);
  };

  const setRole = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const addOrUpdateUser = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setIsButtonDisabled(true);

    if (editUser._id) {
      if (
        editUser.name.length === 0 ||
        editUser.email.length === 0 ||
        editUser.role.length === 0
      ) {
        showToastMessage("Please fill out all fields!", "warning");
        return;
      }

      if (editUser.password !== editUser.confirmPassword) {
        showToastMessage("Passwords do not match!", "warning");
        return;
      }

      await editUserC(editUser, editUser._id);
      closeModal();
    } else {
      if (user.name.length === 0 || user.email.length === 0) {
        showToastMessage("Please fill out all fields!", "warning");
        setIsLoading(false);
        setIsButtonDisabled(false)

        return;
      }

      if (user.role.length === 0) {
        showToastMessage("Please select user role!", "warning");
        setIsLoading(false);
        setIsButtonDisabled(false)
        return;
      }

      if (user.password !== user.confirmPassword) {
        showToastMessage("Passwords do not match!", "warning");
        setIsLoading(false);
        setIsButtonDisabled(false)
        return;
      }

      const addResult = await addUser(user);
      if (addResult) {
        closeModal();
      }
    }

    setIsLoading(false);
    setIsButtonDisabled(false);
  };

  //   const showToastMessage = (message,type) => {
  //     toast(message, {getUsers
  //         type: type
  //     });
  // };

  const notificationAlertRef = React.useRef(null);
  const showToastMessage = (message, type) => {
    var options = {};
    options = {
      place: 'tr',
      message: message,
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsers();
      setFilteredUsers(users);
      setLoading(false);
    };

    fetchUsers();
  }, []);


  const [showDelModal, setShowDelModal] = useState(false)

  const deleteSelectedUser = async () => {
    if (delUser.length > 0) {
      setIsLoading(true);
      setIsButtonDisabled(true);
      await deleteUser(delUser);
      setShowDelModal(false);
      setDelUser("");
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
  }

  const [showBlockModal, setShowBlockModal] = useState(false)


  const blockUser = async () => {
    if (delUser.length > 0) {
      setIsLoading(true);
      setIsButtonDisabled(true);
      await blockUsers(delUser);
      setShowBlockModal(false);
      setDelUser("");
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
  }

  const [filteredUsers, setFilteredUsers] = useState([])

  const [filter, setFilter] = useState("")

  const handleFilter = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0];

    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    const startOfWeekDateString = startOfWeek.toISOString().split('T')[0];
    const endOfWeekDateString = endOfWeek.toISOString().split('T')[0];

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const startOfMonthDateString = startOfMonth.toISOString().split('T')[0];
    const endOfMonthDateString = endOfMonth.toISOString().split('T')[0];

    switch (selectedFilter) {
      case 'today':
        setFilteredUsers(users.filter(user => user.date.split('T')[0] === todayDateString));
        break;
      case 'this_week':
        setFilteredUsers(users.filter(user => {
          const userDate = new Date(user.date.split('T')[0]);
          return userDate >= startOfWeek && userDate <= endOfWeek;
        }));
        break;
      case 'this_month':
        setFilteredUsers(users.filter(user => {
          const userDate = new Date(user.date.split('T')[0]);
          return userDate >= startOfMonth && userDate <= endOfMonth;
        }));
        break;
      case 'blocked':
        setFilteredUsers(users.filter(user => {
         return user.blocked ===true ;
        }));
        break;
      case 'users':
        setFilteredUsers(users.filter(user => {
         return user.role === 'user'
        }));
        break;
        case 'managers':
        setFilteredUsers(users.filter(user => {
        return  user.role === 'manager'
        }));
        break;
        case 'admins':
        setFilteredUsers(users.filter(user => {
        return  user.role === 'admin'
        }));
        break;
        case 'superadmins':
        setFilteredUsers(users.filter(user => {
         return user.role === 'sup-admin'
        }));
        break;
      default:
        setFilteredUsers(users);
        break;
    }
  };


  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Modal 
          className=" modal-primary "
          show={showModal}
          onHide={() => closeModal()}
        >
          <Modal.Header className="justify-content-center">
            Add a User
          </Modal.Header>
          <Modal.Body>
            <div class="form-group">
              <h6 className="text-start" style={{ textAlign: "start" }}>
                Name
              </h6>
              <input
                type="text"
                class="form-control"
                name="name"
                onChange={onChange}
                value={editUser.name || ""}
                required
                placeholder="Enter Name"
              />
            </div>
            <div class="form-group">
              <h6 className="text-start" style={{ textAlign: "start" }}>
                Email
              </h6>
              <input
                type="email"
                name="email"
                class="form-control"
                onChange={onChange}
                value={editUser.email || ""}
                placeholder="Enter Email"
              />
            </div>
            <div class="form-group">
              <h6 className="text-start" style={{ textAlign: "start" }}>
                Username
              </h6>
              <input
                type="text"
                class="form-control"
                name="username"
                onChange={onChange}
                value={editUser.username || ""}
                placeholder="Enter Username"
              />
            </div>
            <div class="form-group">
              <h6 className="text-start" style={{ textAlign: "start" }}>
                Password
              </h6>
              <input
                type="password"
                name="password"
                class="form-control"
                onChange={onChange}
                value={editUser.password || ""}
                placeholder="Enter Password"
              />
            </div>
            <div class="form-group">
              <h6 className="text-start" style={{ textAlign: "start" }}>
                Confirm Password
              </h6>
              <input
                type="password"
                class="form-control"
                name="confirmPassword"
                onChange={onChange}
                value={editUser.confirmPassword || ""}
                placeholder="Confirm Password "
              />
            </div>
            <div className="form-group">
              <h6 className="text-start" style={{ textAlign: "start" }}>
                Select Role
              </h6>
              <select
                className="form-control"
                defaultValue={editUser.role}
                onChange={setRole}
                name="role"
              >
                <option value="sup-admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="d-flex">
              <button
                className="form-control btn btn-primary"
                disabled={isButtonDisabled}
                onClick={(e) => addOrUpdateUser(e)}
              >
                {isLoading ? <ButtonLoader /> : 'Save'}
              </button>
            </div>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowModal(false)}
            >
              Back
            </Button>
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
        <Modal
          className="modal modal-primary"
          show={showDelModal}
          onHide={() => setShowDelModal(false)}
        >
          <Modal.Header className="justify-content-center">
            <div className="modal-profile">
              <i className="nc-icon nc-simple-remove"></i>
            </div>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>Are you sure to delete this user ?</p>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              className="btn"
              type="button"
              variant="primary"
              onClick={() => setShowModal(false)}
            >
              Back
            </Button>
            <Button
              className="btn"
              type="button"
              variant="warning"
              disabled={isButtonDisabled}
              onClick={() => {
                deleteSelectedUser();
              }}
            >
              {
                isLoading ? <ButtonLoader /> : "Confirm"
              }
            </Button>
          </div>
        </Modal>
        <Modal
          className="modal modal-primary"
          show={showBlockModal}
          onHide={() => setShowBlockModal(false)}
        >
          <Modal.Header className="justify-content-center">
            <div className="modal-profile">
              <i className="nc-icon nc-fav-remove"></i>
            </div>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>Are you sure to block this user ?</p>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              className="btn"
              type="button"
              variant="primary"
              onClick={() => setShowBlockModal(false)}
            >
              Back
            </Button>
            <Button
              className="btn"
              type="button"
              variant="warning"
              disabled={isButtonDisabled}
              onClick={() => {
                blockUser();
              }}
            >
              {
                isLoading ? <ButtonLoader /> : "Confirm"
              }
            </Button>
          </div>
        </Modal>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">
                <div class="d-flex">
                  <div class="p-2">Users Section</div>
                  <div class="ml-auto p-2">
                    <button
                      onClick={() => setShowModal(true)}
                      className="btn btn-primary btn-sm"
                    >
                      + Add User
                    </button>
                  </div>
                </div>
                <div className="my-2">
                  <select className="form-control form-control-sm" style={{
                    width: '25%'
                  }} onChange={handleFilter}>
                    <option value='default'>All</option>
                    <option value='today'>Today</option>
                    <option value='this_week'>This Week</option>
                    <option value='this_month'>This Month</option>
                    <option value='blocked'>Blocked</option>
                    <option value="users">Users</option>
                    <option value="managers">Managers</option>
                    <option value="admins">Admins</option>
                    <option value="superadmins">Super Admins</option>

                  </select>
                </div>
              </Card.Title>
            </Card.Header>
            {loading ? <div className="d-flex justify-content-center align-items-center">
              <Spinner />
            </div> : <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">Name</th>
                    <th className="border-0">Email</th>
                    <th className="border-0">Role</th>
                    <th className="border-0">Signup Date</th>
                    <th className="border-0">Stats</th>
                    <th className="border-0">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers?.map((user, index) => {
                    return (
                      <>
                        <tr>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>{user.date.split("T")[0]}</td>
                          <td>
                            <Button variant="info" size="sm">Check</Button>
                          </td>
                          <td>
                            <Button variant="primary" size="sm" onClick={() => editUserModal(user._id)}>
                              Edit
                            </Button>{" "}
                            {""}
                            <Button variant="danger" size="sm"
                              onClick={() => {
                                setShowDelModal(true);
                                setDelUser(user._id);
                              }}
                            >
                              Delete
                            </Button>{" "}
                            {""}
                            {user.blocked ? (
                              <Button variant="warning" size="sm">
                                Unblock
                              </Button>
                            ) : (
                              <Button variant="warning" size="sm" onClick={() => {
                                setShowBlockModal(true);
                                setDelUser(user._id);
                              }}>
                                Block
                              </Button>
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>}

          </Card>
        </Col>
      </Container>
    </>
  );
}

export default User;
