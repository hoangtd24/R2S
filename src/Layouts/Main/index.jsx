import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUserById } from "src/store/slices/main/user/userSlice";
import { TabTitle } from "src/utils/GeneralFunctions";
import Footer from "../../components/Footer";
import HeaderContainer from "../../components/HeaderContainer";
import "./styles.scss";
import Container from "./Container";
const MainLayout = () => {
  TabTitle("Trang chủ | IT Internship Jobs");
  // Sau khi Login . Với role Candidate, Hr, Partner. Comnponent này sẽ đuợc chạ
  // đem thông tin trong localStorage hoặc sesionStorage dispatch lấy thông tin đầy đủ. Các component khác chỉ dùng. không dispatch
  const dispatch = useDispatch();
  const user =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
   JSON.parse(localStorage.getItem("userPresent"));
  const renderUser = useCallback(
    () => user && dispatch(getUserById(user)),
    [dispatch, user]
  );
  useEffect(() => {
    renderUser();
  }, [renderUser]);
  return (
    <Container>
      <div className="main__layout">
        <HeaderContainer />
        <div className="main__layout-body-outlet">
          <Outlet />
        </div>
        <Footer />
      </div>
    </Container>
  );
};

export default MainLayout;
