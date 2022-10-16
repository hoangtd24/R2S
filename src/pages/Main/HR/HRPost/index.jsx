import { TabTitle } from 'src/utils/GeneralFunctions';
import PostJobForm from '../../../../containers/Home/PostJobForm';

const HRPost = () => {
  
  TabTitle('Đăng tuyển | IT Internship JOBS')
  return <PostJobForm formStatus = "post" />
}

export default HRPost
