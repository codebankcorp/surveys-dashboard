
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import PaymentApproval from "views/PaymentApproval";

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
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/sup-admin"
  },
 
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/sup-admin"
  },



];

export default dashboardRoutes;
