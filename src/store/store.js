import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./slices/main/register/registerSlice";
import notificationSlice from "./slices/notifications/notificationSlice";
import userSlice from "./slices/Admin/user/userSlice";
import companySlice from "./slices/Admin/company/companySlice";
import loginSlice from "./slices/main/login/loginSlice";
import universitySlice from "./slices/Admin/university/unversitySlice";
import locationSlice from "./slices/location/locationSlice";
import majorSlice from "./slices/Admin/major/majorSlice";
import jobSlice from "./slices/main/home/job/jobSlice";
import ratingSlice from "./slices/main/home/rating/rating";
import markJobSlice from "./slices/main/mark/markSlice";
import applySlice from "./slices/main/candidate/apply/applySlice";
import infoCandidateSlice from "./slices/main/candidate/info/infoCandidateSlice";
import appSlice from "src/app.slice";
import demandSlice from "./slices/main/home/demand/demandSlice";
import adminDemandSlice from "./slices/Admin/demand/adminDemandSlice"
import appreciateSlice from "./slices/main/candidate/appreciate/appreciateSlice";
import globalSlices from "./slices/main/home/global/globalSlices"
import filterSlices from "./slices/main/home/filter/filterSlices";
import userCandidateSlice from "./slices/main/candidate/user/userCandidateSlice";
import jobCandidateSlice from "./slices/main/home/job/jobCandidateSlice";
import profileSlice from "./slices/main/user/userSlice";

const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    notification: notificationSlice.reducer,
    user: userSlice.reducer,
    company: companySlice.reducer,
    authentication: loginSlice.reducer,
    university: universitySlice.reducer,
    location: locationSlice.reducer,
    major: majorSlice.reducer,
    job: jobSlice.reducer,
    rating: ratingSlice.reducer,
    mark: markJobSlice.reducer,
    apply: applySlice.reducer,
    infoCandidate: infoCandidateSlice.reducer,
    app: appSlice.reducer,
    demand: demandSlice.reducer,
    adminDemand: adminDemandSlice.reducer,
    appreciate: appreciateSlice.reducer,
    globalSlices: globalSlices.reducer,
    filter : filterSlices.reducer,
    userFilter : userCandidateSlice.reducer,
    jobCandidateSlice : jobCandidateSlice.reducer,
    profile : profileSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
