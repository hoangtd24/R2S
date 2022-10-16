import {
  Grid
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Components from "./Components";

import ProfileForm from 'src/containers/Home/ProfileForm'
import ProfileContainer from "./ProfileContainer";
import "./styles.scss";
import "./reponsive.scss"


const Profile = () => {

  const { user } = useSelector((state) => state.profile);

  return (
    <div className='profile__wrapper'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={5.5} xl={4}>
          <Components profile={user} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6.5} xl={8}>
          <ProfileForm profile={user}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {user === "Role_HR" ? (
            <ProfileContainer profile={user?.company} />
          ) : user === "Role_Partner" ? (
            <ProfileContainer profile={user?.universityDTO} />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
