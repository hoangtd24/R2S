import mainRouter from "./mainRouter";
import adminRouter from "./adminRouter";
import registerRouter from "./registerRouter";
import loginRouter from "./loginRouter";
import candidateRouter from "./candidateRouter";
import hrRouter from "./hrRouter";
import partnerRouter from "./partnerRouter";
import loginAdminRouter from "./loginAdminRouter";

const publicRouter = [
  mainRouter,
  registerRouter,
  loginRouter,
  loginAdminRouter,
];
const privateRouter = [adminRouter, candidateRouter, hrRouter, partnerRouter];
export { publicRouter, privateRouter };
