import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import AdminRouterLayout from './Layouts/Admin/index'
import RegisterLayout from './Layouts/Register/index'
import LoginLayout from './Layouts/Login/index'
import Dashboard from './pages/Admin/Dashboard'
import { adminRouter, mainRouter, registerRouter } from './config/routes'
import MainLayout from './Layouts/Main'
import Home from './pages/Main/Home/index'
import HR from './pages/Main/HR'

function App() {
  const renderAdminRouter = () => {
    return adminRouter.map(({ path, Component }, index) => {
      return <Route path={path} element={<Component />} key={index} />
    })
  }

  const renderRegisterRouter = () => {
    return registerRouter.map(({ path, Component }, index) => {
      return <Route path={path} element={<Component />} key={index} />
    })
  }

  const renderMainRouter = () => {
    return mainRouter.map(({ path, Component }, index) => {
      return <Route path={path} element={<Component />} key={index} />
    })
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminRouterLayout />}>
            <Route index element={<Dashboard />} />
            {renderAdminRouter()}
          </Route>
          <Route path="/register" element={<RegisterLayout />}>
            {renderRegisterRouter()}
          </Route>
          <Route path="/login" element={<LoginLayout />}></Route>
          <Route path="/hr" element={<HR />}></Route>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            {renderMainRouter()}
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
