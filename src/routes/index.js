// All components mapping with path for internal routes

import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/DashboardPage"));
const Workspaces = lazy(() => import("../pages/WorkspacesPage"));
const Customization = lazy(() => import("../pages/CustomizationPage"));

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/workspaces", // the url
    component: Workspaces, // view rendered
  },
  {
    path: "/customization", // the url
    component: Customization, // view rendered
  },
];

export default routes;
