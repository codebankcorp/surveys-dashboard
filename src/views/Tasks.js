import React, { useEffect } from "react"
import NotificationAlert from "react-notification-alert";
import SuperAdminContext from "context/admin/adminContext"
import { useContext, useState } from "react"
import { Card, Table, Modal, Button } from "react-bootstrap"
import ButtonLoader from "components/Loading/BtnLoader";
import Spinner from "components/Loading/Spinner";
export default function Tasks() {
    const context = useContext(SuperAdminContext)
    const { addTask, getTasks, tasks } = context;

    const [showModal, setShowModal] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [loading,setLoading ] = useState(true)

    const [editMode, setEditMode] = useState(false)

    const [task, setTask] = useState({
        name: '',
        reward: 0,
        details: '',
        time: ''
    })

    const [editTask, setEditTask] = useState({
        name: '',
        reward: 0,
        details: '',
        time: ''
    })

    const onChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
        setEditTask({ ...task, [e.target.name]: e.target.value })
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleClick = async () => {
        setIsLoading(true)
        if (editMode) {

        }
        else {
            if (task.name.trim() === '' || task.details.trim() === '' || task.reward.trim() === '' || task.time.trim() === '') {
                showToastMessage("Fields cannot be empty", "danger")
                setIsLoading(false)
                return;
            }
            const task = await addTask(task)
            if (task) {
                setShowModal(false)
            }
        }

    }

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
        setLoading(true)
        getTasks()
        setLoading(false)
    }, [])
    return (
        <>

            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Modal
                className=" modal-primary "
                show={showModal}
                onHide={() => closeModal()}
            >
                <Modal.Header className="justify-content-center">
                    Add Task
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
                            value={editTask.name || ""}
                            required
                            placeholder="Enter Name"
                        />
                    </div>

                    <div class="form-group">
                        <h6 className="text-start" style={{ textAlign: "start" }}>
                            Reward
                        </h6>
                        <input
                            type="number"
                            class="form-control"
                            name="reward"
                            onChange={onChange}
                            value={editTask.reward || ""}
                            placeholder="Enter Reward"
                        />
                    </div>

                    <div class="form-group">
                        <h6 className="text-start" style={{ textAlign: "start" }}>
                            Details
                        </h6>
                        <input
                            type="text"
                            class="form-control"
                            name="details"
                            onChange={onChange}
                            value={editTask.details || ""}
                            placeholder="Enter Details"
                        />
                    </div>

                    <div class="form-group">
                        <h6 className="text-start" style={{ textAlign: "start" }}>
                            Time
                        </h6>
                        <input
                            type="text"
                            class="form-control"
                            name="time"
                            onChange={onChange}
                            value={editTask.time || ""}
                            placeholder="Time in Seconds"
                        />
                    </div>


                    <div className="d-flex">
                        <button
                            className="form-control btn btn-primary"
                            onClick={handleClick}
                        // disabled={isB}
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
            <Card className="strpied-tabled-with-hover">
                <Card.Header>
                    <Card.Title as="h4">  <div class="d-flex">
                        <div class="p-2">Tasks</div>
                        <div class="ml-auto p-2">
                            <button
                                onClick={() => setShowModal(true)}
                                className="btn btn-primary btn-sm"
                            >
                                + Add Task
                            </button>
                        </div>
                    </div></Card.Title>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                    {loading ? <div className="d-flex justify-content-center align-items-center">
                        <Spinner />
                    </div>: <Table className="table-hover table-striped">
                        <thead>
                            <tr>
                                <th className="border-0">Name</th>
                                <th className="border-0">Details</th>
                                <th className="border-0">Reward</th>
                                <th className="border-0">Time (Seconds)</th>
                                <th className="border-0">Date Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks?.map((tasks, i) => {
                                return (
                                    <>
                                        <tr key={i}>
                                            <td>{tasks.name}</td>
                                            <td>{tasks.details}</td>
                                            <td>{tasks.reward}</td>
                                            <td>{tasks.time}</td>
                                            <td>{tasks.date.split('T')[0]}</td>
                                        </tr>
                                    </>
                                )
                            })}

                        </tbody>
                    </Table>}
                   
                </Card.Body>
            </Card>
        </>
    )
}