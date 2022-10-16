import RegisterLayout from "src/Layouts/Register";
import CandidateInfo from "src/pages/Register/CandidateInfo";
import HRInfo from "src/pages/Register/HRInfo";
import PartnerInfo from "src/pages/Register/PartnerInfo";

const registerRouter = [
    {
        path: "/register",
        element: <RegisterLayout />,
        children: [
            {
                path: "candidate",
                Component: CandidateInfo,
            },
            {
                path: "hr",
                Component: HRInfo,
            },
            {
                path: "partner",
                Component: PartnerInfo,
            },
        ]
    }
]
export default registerRouter