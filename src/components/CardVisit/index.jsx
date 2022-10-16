import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./styles.scss";
import Button from "../Button";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import { Link } from "react-router-dom";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import LanguageIcon from "@mui/icons-material/Language";
// import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PropTypes from "prop-types";

const CardVisit = ({ jobDetailById, logo, candidate }) => {
  return (
    <div className="scroll scroll__onTablet-hide ">
      <Card className="visit__card visit__card__onTablet">
        <CardContent>
          <img className="visit__card-logo" alt="visit__card-logo" src={logo} />
          <h2 className="visit__card-nameComapy">
            {jobDetailById?.hr?.company?.name ||
              jobDetailById?.universityDTO?.name}
          </h2>

          <div className="config__info">
            <a
              href={`mailto:${jobDetailById?.hr?.company?.email}`}
              className="config__info"
            >
              <LocalPostOfficeIcon className="config__info-icon"></LocalPostOfficeIcon>
              {jobDetailById?.hr?.company?.email ||
                jobDetailById?.universityDTO?.email}
            </a>
          </div>
          <div className="config__info">
            <Link
              to={`/detail_job/${jobDetailById.id}`}
              className="config__info"
            >
              <PhoneInTalkIcon className="config__info-icon"></PhoneInTalkIcon>
              {jobDetailById?.hr?.company?.phone || jobDetailById?.hr?.company?.tax ||
                jobDetailById?.universityDTO?.phone}
            </Link>
          </div>
          <div className="config__info">
            <a
              href={jobDetailById?.hr?.company?.website}
              className="config__info"
            >
              <LanguageIcon className="config__info-icon"></LanguageIcon>
              {jobDetailById?.hr?.company?.website ||
                jobDetailById?.universityDTO?.website}
            </a>
          </div>
        </CardContent>
        <CardActions className="config-button">
          <Link to={`/information_company/${jobDetailById.id}`}>
            <Button name="Về Chúng Tôi"></Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

CardVisit.propTypes = {
  logo: PropTypes.string.isRequired,
};
export default CardVisit;
