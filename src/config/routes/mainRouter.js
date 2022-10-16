import MainLayout from "src/Layouts/Main";
import ForgotPassword from "src/pages/ForgotPassword";
import CandidateInformationCompany from "src/pages/Main/Candidate/InformationCompany";
import Main from "src/pages/Main";
import NotFound from "src/pages/NotFound";
import DetailHome from "../../pages/Main/DetailHome";
import CommingSoon from "src/pages/Main/Home/CommingSoon";
import AboutUS from "src/components/Footer/FooterChildren/AboutUs";
import Contact from "src/components/Footer/FooterChildren/Contact";
import Help from "src/components/Footer/FooterChildren/Help";
import PrivacyPolicy from "src/components/Footer/FooterChildren/PrivacyPolicy";
import TermsOfServices from "src/components/Footer/FooterChildren/TermsOfServices";
import Regulation from "src/components/Footer/FooterChildren/Regulation";
const mainRouter = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        Component: Main,
      },
      {
        path: "/detail_job/:keyword",
        Component: DetailHome,
      },
      {
        path: "/information_company/:keyword",
        Component: CandidateInformationCompany,
      },
      {
        path: "/about-us",
        Component: AboutUS,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/help",
        Component: Help,
      },
      {
        path: "privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "terms-of-services",
        Component: TermsOfServices,
      },
      {
        path : "regulation",
        Component : Regulation,
      }
    ],
  },
  {
    path: "/not-found",
    element: <NotFound />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/comming-soon",
    element: <CommingSoon />,
  },
  {
    //Doesn't match route?, It's here. If you want to change just delete children and change element
    path: "*",
    element: <MainLayout />,
    children: [
      {
        path: "*",
        Component: Main,
      },
    ],
  },
];
export default mainRouter;
