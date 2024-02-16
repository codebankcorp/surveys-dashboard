import ButtonLoader from "components/Loading/BtnLoader";
import SuperAdminContext from "context/admin/adminContext";
import React, { useContext, useEffect, useState } from "react";
import NotificationAlert from "react-notification-alert";

// react-bootstrap components
import { Button, Card, Container, Col, Table, Modal } from "react-bootstrap";

import Spinner from "components/Loading/Spinner";

function PaymentApproval() {

    const context = useContext(SuperAdminContext)
    const { paymentsApproval, getApprovalPayments } = context;

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false)
    const closeModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        setLoading(true);
        if (paymentsApproval.length === 0) {
            getApprovalPayments();
        }
        setLoading(false);
        // eslint-disable-next-line
    }, [])


    const openModel = (user) => {
        setUser(user)
        setShowModal(true)
        console.log(user)
    }

    const [user, setUser] = useState({})


    return (
        <>

            <Container>


                <Modal
                    className="modal "
                    show={showModal}
                    onHide={() => setShowModal(false)}
                >
                    {/* <Modal.Header className="justify-content-center">
             User Details
          </Modal.Header> */}
                    <Modal.Body className="text-center">
                            <Card className="card-plain table-plain-bg">
                                <Card.Header>
                                    <Card.Title as="h4">User Details</Card.Title>
                                </Card.Header>
                                <Card.Body className="table-full-width table-responsive px-0">
                                    <Table className="table-hover">
                                        <thead>
                                            <tr>
                                                <th className="border-0">Name</th>
                                                <th className="border-0">Email</th>
                                                <th className="border-0">Signup Date</th>
                                                <th className="border-0">Total Earnings</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{user?.name}</td>
                                                <td>{user?.email}</td>
                                                <td>{user?.date?.split("T")[0]}</td>
                                                <td>{user?.totalEarnings}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
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
                            onClick={() => setShowModal(false)}

                        >
                            Close
                        </Button>
                    </div>
                </Modal>
                <Col>
                    <Card className="strpied-tabled-with-hover">
                        <Card.Header>
                            <Card.Title as="h4">
                                Payment Approval Section
                            </Card.Title>
                        </Card.Header>
                        {loading ? <div className="d-flex justify-content-center align-items-center">
                            <Spinner />
                        </div> : <Card.Body className="table-full-width table-responsive px-0">
                            <Table className="table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th className="border-0 ">Payment User</th>
                                        <th className="border-0">Payment Amount</th>
                                        <th className="border-0">Date</th>
                                        <th className="border-0">Payment Method</th>
                                        <th className="border-0">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentsApproval?.map((payment, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td className="text-primary" onClick={() => {
                                                        setShowModal(true)
                                                        setUser(payment.user)
                                                    }}
                                                    >{payment.user.name}</td>
                                                    <td>{payment.paymentAmount}</td>
                                                    <td>{payment.submittedOn.split("T")[0]}</td>
                                                    <td>{payment.paymentMethod.type} || {payment.paymentMethod.number}</td>
                                                    <td>
                                                        <Button variant="primary" size="sm" >
                                                            Accept
                                                        </Button>{" "}
                                                        {""}
                                                        <Button variant="danger" size="sm"

                                                        >
                                                            Reject
                                                        </Button>{" "}

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

export default PaymentApproval;
