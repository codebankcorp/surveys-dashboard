
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import PaymentApproval from "views/PaymentApproval";
import Tasks from "views/Tasks";

const dashboardRoutes = [
  
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/sup-admin"
  },
  {
    path: "/user",
    name: "Users",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/sup-admin"
  },
  
  {
    path: "/withdraws",
    name: "Payment Approval",
    icon: "nc-icon nc-money-coins",
    component: PaymentApproval,
    layout: "/sup-admin"
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: "nc-icon nc-credit-card",
    component: PaymentApproval,
    layout: "/sup-admin"
  },
  {
    path: "/tasks",
    name: "Tasks",
    icon: "nc-icon nc-paper-2",
    component: Tasks,
    layout: "/sup-admin"
  },




];

export default dashboardRoutes;
