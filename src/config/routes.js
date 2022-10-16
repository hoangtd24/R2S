import Dashboard from "../pages/Admin/Dashboard";
import User from "../pages/Admin/User";
import University from "../pages/Admin/University";
import Demand from "../pages/Admin/Demand";
import NotFound from "../pages/NotFound";
import CompanyDetail from "../pages/Admin/CompanyDetail";
import UserDetail from "../pages/Admin/UserDetail";
import UniversityDetail from "../pages/Admin/UniversityDetail";
import Home from "../pages/Main/Home";
import DemandDetail from "../pages/Admin/DemandDetail";
import Major from "../pages/Admin/Major";
import MajorDetail from "../pages/Admin/MajorDetail";
import DetailHome from "../pages/Main/DetailHome";
import HR from "../pages/Main/HR";
import HRPost from "../pages/Main/HR/HRPost";
import HRPostList from "../pages/Main/HR/HRPostList";
import CandidateInfo from "src/pages/Register/CandidateInfo";
import HRInfo from "src/pages/Register/RegisterStep3/HRInfo";
import PartnerInfo from "src/pages/Register/RegisterStep3/PartnerInfo";
import CandidateViewList from "src/pages/Main/Candidate/ViewList";
import CandidateSaveProfile from "src/pages/Main/Candidate/SaveProfile";
import CandidateInformationCompany from "src/pages/Main/Candidate/InformationCompany";
import CandidateHome from "src/pages/Main/Candidate/Home";
import PartnerHome from "src/pages/Main/Partner/Home";
import Profile from "src/components/Profile";
import PartnerPost from "src/pages/Main/Partner/Post";
import PartnerPostList from "src/pages/Main/Partner/PartnerPostList";
import CandidateList from "src/pages/Main/HR/CandidateList";
import DetailPostPartner from "src/pages/Main/Partner/DetailPostPartner";
import CandidateManagement from "src/pages/Main/HR/CandidateManagement/CandidateManagement";
import Company from "src/pages/Admin/Company";
import Password from "src/containers/Home/ChangePasswordForm";
import LoginAdmin from "src/pages/LoginAdmin";
import Setting from "src/pages/Admin/Setting";
import Statistic from "src/components/Statistic";

// admin router
export const adminRouter = [
  {
    path: "",
    Component: Dashboard,
  },
  {
    path: "admin/statistical",
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
    path: "/admin/university/:uniId",
    Component: UniversityDetail,
  },
  {
    path: "/admin/company",
    Component: Company,
  },
  {
    path: "/admin/setting",
    Component: Setting,
  },
  {
    path: "/admin/company/:comid",
    Component: CompanyDetail,
  },
  {
    path: "major",
    Component: Major,
  },
  {
    path: "/admin/major/:id",
    Component: MajorDetail,
  },
  {
    path: "/admin/user/:username",
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
  
];

// main router
export const mainRouter = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/detail_job/:keyword",
    Component: DetailHome,
  },
  {
    path: "/information_company/:keyword",
    Component: CandidateInformationCompany,
  },
];

// hr router
export const hrRouter = [
  {
    path: "",
    Component: HR,
  },
  {
    path: "/hr/profile",
    Component: Profile,
  },
  {
    path: "/hr/post",
    Component: HRPost,
  },
  {
    path: "/hr/list",
    Component: HRPostList,
  },
  {
    path: "/hr/candidate/list",
    Component: CandidateList,
  },
  {
    path: "/hr/setting",
    Component: Password,
  },
  {
    path: "/hr/candidatemanagement",
    Component: CandidateManagement,
  },
];

// candidate router
export const candidateRouter = [
  {
    path: "/candidate",
    Component: CandidateHome,
  },
  {
    path: "/candidate/view-list-care",
    Component: CandidateViewList,
  },
  {
    path: "/candidate/save-profile",
    Component: CandidateSaveProfile,
  },
  {
    path: "/information_company/:keyword",
    Component: CandidateInformationCompany,
  },
  {
    path: "/candidate/profile",
    Component: Profile,
  },
  {
    path: "/candidate/setting",
    Component: Password,
  },
  {
    path: "/candidate/view-list-apply",
    Component: CandidateViewList,
  },
  {
    path: "/detail_job/:keyword",
    Component: DetailHome,
  },
];

//partner router
export const partnerRouter = [
  {
    path: "",
    Component: PartnerHome,
  },
  {
    path: "/partner",
    Component: PartnerHome,
  },
  {
    path: "/partner/post",
    Component: PartnerPost,
  },
  {
    path: "/partner/post-list",
    Component: PartnerPostList,
  },
  {
    path: "/partner/profile",
    Component: Profile,
  },
  {
    path: "/partner/setting",
    Component: Password,
  },
  {
    path: "/partner/search/:keyword",
    Component: PartnerHome,
  },
  {
    path: "/partner/detail_demand/:keyword",
    Component: DetailPostPartner,
  },
];

// register router
export const registerRouter = [
  {
    path: "candidate",
    Component: CandidateInfo,
  },
  {
    path: "hr",
    Component: HRInfo,
  },
  {
    path: "partner",
    Component: PartnerInfo,
  },
];
