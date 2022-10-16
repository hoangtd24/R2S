import React from "react";
// import PropTypes from "prop-types";
import DetailCard from "src/components/DetailCard";
import CardVisit from "src/components/CardVisit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid } from "@mui/material";
import "./styles.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowButton from "src/components/ArrowButton";
import { getDemandById } from "src/store/slices/main/home/demand/demandSlice";

const DetailPostPartner = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { keyword } = useParams()

  const { demandDetail, idJobActive } = useSelector((state) => state.demand);

  useEffect(() => {
    const dataSearch = {
      name: "",
      province: "",
      no: 0,
      limit: 10,
    };
    dispatch(getDemandById(keyword));
  }, [dispatch, keyword]);
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div>
      <Grid
        className="wrapper"
        container
        spacing={4}
        sx={{
          padding: 0,
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        <Grid item md={8} sm={12} xs={12}>
          <div className="">
            <DetailCard
              logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
              jobDetailById={demandDetail}
              demandPartner={true}
            />
            <div className=" hide-on-table">
              <div className="" onClick={handleBackClick}>
                <ArrowButton direction="left" text="Trở lại" />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <CardVisit
            logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
            jobDetailById={demandDetail}
          />
        </Grid>
        <div className="config__arow-back hide-on-desktop ">
          <Link to="/" className="config__arow-back">
            <ArrowBackIcon></ArrowBackIcon>
            Trở lại
          </Link>
        </div>
      </Grid>
    </div>
  );
};

DetailPostPartner.propTypes = {};

export default DetailPostPartner;
