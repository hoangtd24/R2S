// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import "./App.css";
// import AdminRouterLayout from "./Layouts/Admin/index";
// import RegisterLayout from "./Layouts/Register/index";
// import LoginLayout from "./Layouts/Login/index";
// import Dashboard from "./pages/Admin/Dashboard";
// import {
//   adminRouter,
//   hrRouter,
//   mainRouter,
//   registerRouter,
// } from "./config/routes";
// import MainLayout from "./Layouts/Main";
// <<<<<<< HEAD
// import Home from "./pages/Main/Home/index";
// import HR from "./pages/Main/HR";
// import HRPost from "./pages/Main/HRPost";
// import HRPostList from "./pages/Main/HR/HRPostList";
// import CompanyForm from "./containers/Admin/CompanyForm";
// =======
// import HRLayOut from "./Layouts/HR";
// >>>>>>> c8d4a6dc7f4c0299e3d216ee876cb91303fc8717

// function App() {
//   const renderAdminRouter = () => {
//     return adminRouter.map(({ path, Component }, index) => {
//       return <Route path={path} element={<Component />} key={index} />;
//     });
//   };

//   const renderRegisterRouter = () => {
//     return registerRouter.map(({ path, Component }, index) => {
//       return <Route path={path} element={<Component />} key={index} />;
//     });
//   };

//   const renderMainRouter = () => {
//     return mainRouter.map(({ path, Component }, index) => {
//       return <Route path={path} element={<Component />} key={index} />;
//     });
//   };

//   const renderHrRouter = () => {
//     return hrRouter.map(({ path, Component }, index) => {
//       return <Route path={path} element={<Component />} key={index} />;
//     });
//   };
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/admin" element={<AdminRouterLayout />}>
//             <Route index element={<Dashboard />} />
//             {renderAdminRouter()}
//           </Route>
//           <Route path="/register" element={<RegisterLayout />}>
//             {renderRegisterRouter()}
//           </Route>
//           <Route path="/login" element={<LoginLayout />}></Route>
// <<<<<<< HEAD
//           <Route path="/hr" element={<HR />}></Route>
//           <Route path="/hr-post" element={<HRPost />}></Route>
//           <Route path="/hr-post-list" element={<HRPostList />}></Route>
// =======
//           <Route path="/hr" element={<HRLayOut />}>
//             {/* <Route index element={<HR />} /> */}
//             {renderHrRouter()}
//           </Route>
// >>>>>>> c8d4a6dc7f4c0299e3d216ee876cb91303fc8717
//           <Route path="/" element={<MainLayout />}>
//             {/* <Route index element={<Home />} /> */}
//             {renderMainRouter()}
//           </Route>
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;
