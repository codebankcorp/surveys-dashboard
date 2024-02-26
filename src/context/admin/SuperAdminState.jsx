import { useState } from 'react';
import React from 'react';
import AdminContext from './adminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import NotificationAlert from "react-notification-alert";

// const host = "https://gl2.ithawks.pk/api";
// const host = "https://portal2.ithawks.pk/api";

// const host = "https://gl2.theitking.pk/api";

const host = "http://localhost:5000";


const SuperAdminState = (props)=>{

    let navigate  = useHistory();

    const [loggedInUser, setLoggedInUser] = useState();
    const [users, setUsers] = useState([]);
   

    const Login = async (credentials) => {
        const response = await axios.post(`${host}/auth/login`, credentials);
        const json = response.data;
        if (json.success) {
            localStorage.setItem('token', json.token);
            if (json.userRole === "sup-admin") {
                navigate.push("/sup-admin/dashboard");
            } 
            else {
                showToastMessage('Not Allowed', 'danger')
            }
        } else {
            showToastMessage(json.error, "danger");
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

    // sidebar section
    const getUser = async ()=>{
        if(!localStorage.getItem('token')){
            navigate.push('/login');
            return;
        }

        const response = await fetch(`${host}/auth/getuser`, {
            method: 'POST',
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });

        const json = await response.json();
        if(json.user.role === "sup-admin" ){
            setLoggedInUser(json.user);
        }
        else{
            navigate('/auth/login');
        }
    }

    // Users Section
    const getUsers = async ()=>{
        // fetch all users here
        const response = await fetch(`${host}/sup-admin/users/getusers`, {
            method: 'POST',
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        if(json.success){
            setUsers(json.users);
        }
        else {
            showToastMessage(json.error,"error")
        }
    }

    const addUser = async(user)=>{
        const saveUser = await axios({
            method: "POST",
            url: `${host}/sup-admin/add-user`,
            data: user,
            headers: {
                "auth-token": localStorage.getItem('token'),
            }
        });
        const json = saveUser.data;
        if(json.success){
            showToastMessage("User added successfully!","success");
            getUsers();
            return true;
        }else{
            showToastMessage(json.error,"error")
            return false;
        }
    }

    const editUserC = async (editUser,id)=>{
        const updateUser = await axios({
            method: "PATCH",
            url: `${host}/sup-admin/users/updateuser/${id}`,
            data: editUser,
            headers: {
                "auth-token": localStorage.getItem('token'),
            }
        });
        const json = updateUser.data;
        if(json.success){
            showToastMessage("User updated Successfully!", "success");
            getUsers();
        }else{
            showToastMessage(json.error, "error");
        }
    }

    const deleteUser = async (id)=>{
        const response = await fetch(`${host}/sup-admin/users/deleteuser/${id}`, {
            method: 'DELETE',
            headers: {
              "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        if(json.success){
            getUsers();
            showToastMessage("User deleted successfully!","success");
        }
    }

    const blockUsers = async (id)=>{
        const response = await fetch(`${host}/sup-admin/users/block/${id}`, {
            method: 'POST',
            headers: {
              "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        if(json.success){
            getUsers();
            showToastMessage("User Blocked Successfully!","success");
        }
    }

    const unBlockUsers = async (id)=>{
        const response = await fetch(`${host}/sup-admin/users/unblock/${id}`, {
            method: 'POST',
            headers: {
              "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        if(json.success){
            getUsers();
            showToastMessage("User Unblocked Successfully!","success");
        }
    }

   




    // admin home page
    const [payments, setPayments] = useState([]);

    const setPaymentsData = (data)=>{
        setPayments(data);
    }

    const getAllPayments = async()=>{
        const getAllPayments = await axios({
            method: "GET",
            url: `${host}/payments/get-all-payments`,
            headers: {
                "auth-token" : localStorage.getItem('token')
            }
        });
        let data = getAllPayments.data;
        if(data.success){
            setPayments(data.payments);
        }
    }

    // emails tab
    const [paymentsApproval, setPaymentsApproval] = useState([]);

    const getApprovalPayments = async ()=>{
        const contactUseMail = await axios({
            method: 'get',
            url: `${host}/sup-admin/payments-approval`,
            headers: {
                "auth-token" : localStorage.getItem('token')
            }
        });
        
        const data = contactUseMail.data;
            
        if(data.success){
            setPaymentsApproval(data.payments);
        }
    }

    // add a task
    const addTask = async (data) => {
        const response = await axios({
            url:`${host}/sup-admin/add-task`,
            data:data,
            headers:{
                "auth-token":localStorage.getItem('token')
            },
            method:"POST"
        })

        const json = response.data;

        if(json.success) {
            showToastMessage(json.message,'success')
            return true;
        }
        else {
            showToastMessage(json.error,'danger')
        }

    }


    const [tasks,setTasks] = useState([])
    //get all tasks
    const getTasks = async() => {
        const res = await axios({
            url:`${host}/sup-admin/tasks`,
            method:"GET",
            headers:{
                "auth-token":localStorage.getItem('token')
            }
        })
        const json = res.data;
        if(json.success ) {
            setTasks(json.tasks)
        }
    }

    const [earningsToday,setEarningsToday ] = useState([])

    const getEarningsToday = async() => {
        const res = await axios({
            url:`${host}/sup-admin/earnings-today`,
            method:"GET",
            headers:{
                "auth-token":localStorage.getItem('token')
            }
        })
        const json = res.data;
        if(json.success ) {
            setEarningsToday(json.earnings)
        }
    }


    return <AdminContext.Provider value={{addUser, users, getUsers, editUserC, deleteUser, getUser, loggedInUser, getAllPayments, payments, 
              showToastMessage,
            paymentsApproval, getApprovalPayments,blockUsers,unBlockUsers,Login,addTask,
            getTasks,tasks,getEarningsToday,earningsToday
        }}>
        {props.children}
        <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef}/>
      </div>
    </AdminContext.Provider>
}

export default SuperAdminState;