import Company from "src/pages/Admin/Company";
import CompanyDetail from "../../pages/Admin/CompanyDetail";
import Dashboard from "../../pages/Admin/Dashboard";
import Demand from "../../pages/Admin/Demand";
import DemandDetail from "../../pages/Admin/DemandDetail";
import Major from "../../pages/Admin/Major";
import MajorDetail from "../../pages/Admin/MajorDetail";
import University from "../../pages/Admin/University";
import UniversityDetail from "../../pages/Admin/UniversityDetail";
import User from "../../pages/Admin/User";
import UserDetail from "../../pages/Admin/UserDetail";
import NotFound from "../../pages/NotFound";
import AdminRouterLayout from "../../Layouts/Admin/index";
import Setting from "src/pages/Admin/Setting";
import Statistic from "src/components/Statistic";

const adminRouter = [
  {
    role: "Role_Admin",
    path: "/admin",
    element: <AdminRouterLayout />,
    index: <Dashboard />,
    children: [
      {
        path: "",
        Component: Dashboard,
      },
      {
        path: "statistical",
        Component: Statistic,
      },
      {
        path: "user",
        Component: User,
      },
      {
        path: "university",
        Component: University,
      },
      {
        path: "university/:uniId",
        Component: UniversityDetail,
      },
      {
        path: "company",
        Component: Company,
      },
      {
        path: "setting",
        Component: Setting,
      },
      {
        path: "company/:comid",
        Component: CompanyDetail,
      },
      {
        path: "major",
        Component: Major,
      },
      {
        path: "major/:id",
        Component: MajorDetail,
      },
      {
        path: "user/:username",
        Component: UserDetail,
      },
      {
        path: "demand",
        Component: Demand,
      },
      {
        path: "demand/:demandId",
        Component: DemandDetail,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
];
export default adminRouter;
