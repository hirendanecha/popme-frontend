// All components mapping with path for internal routes

import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/DashboardPage"));
const Workspaces = lazy(() => import("../pages/WorkspacesPage"));
const Customization = lazy(() => import("../pages/CustomizationPage"));
const Setting = lazy(() => import("../pages/SettingPage"));

const routes = [
  // {
  //   path: "/dashboard",
  //   component: Dashboard,
  // },
  {
    path: "/workspaces", // the url
    component: Workspaces, // view rendered
  },
  {
    path: "/customization", // the url
    component: Customization, // view rendered
  },
  {
    path: "/setting", // the url
    component: Setting, // view rendered
  },
];

export default routes;
