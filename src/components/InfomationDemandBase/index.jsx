import { Grid, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import CardHome from '../CardHome';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import './styles.scss'
import BaseInformationUniversity from '../BaseInformationUniversity';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));
const InfomationDemandBase = ({ arrDemand }) => {

    return (
            // <BaseInformationUniversity arrDemand={arrDemand}  /> 
        <div className='InfomationDemandBase'>
            <Item
                sx={{
                    marginTop: 3,
                    marginBottom: 3,
                }}
                elevation={0}
            >
                <div className="job-applying-container _scroll">
                    <h5
                        className="intro__company-title intro__company-title-appling"
                        style={{
                            marginLeft: `${12}`,
                        }}
                    >
                        Việc làm đang tuyển
                    </h5>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            width: "auto",
                        }}
                    >
                        {arrDemand?.contents?.length > 0 &&
                            arrDemand?.contents?.map((job, index) => (
                                <Grid
                                    item
                                    lg="12"
                                    md="12"
                                    sm="12"
                                    key={job.id}
                                    sx={{
                                        paddingLeft: `${12} !important`,
                                        paddingRight: `${12} !important`,
                                        width: "200px",
                                    }}
                                >
                                    <Link
                                        to={`/partner/detail_demand/${job.id}`}
                                        className="link__job-detail"
                                    >
                                        <CardHome
                                            id={job.id}
                                            index={index}
                                            title={job.name}
                                            fontSize={10}
                                            nameCompany={job.universityDTO?.name}
                                            idCompany={job.universityDTO?.id}
                                            job={job}
                                            // key={job.id}
                                            idJob={job.id}
                                            tagName={[
                                                job?.jobposition?.name ||
                                                job?.position.name ||
                                                "Không có",
                                                job?.jobType?.name || "Không có",
                                            ]}
                                            location="Hồ Chí Minh"
                                            amount={job.amount || "Không có"}
                                            demandPartner={true}
                                            time={[
                                                moment(job.timeStartStr || job.createDate).format(
                                                    "DD/MM/YYYY"
                                                ),
                                                moment(job.timeEndStr || job.end).format("DD/MM/YYYY"),
                                            ]}
                                            pdLeft="30px"
                                            pdRight="30px"
                                            active={0}
                                        />
                                    </Link>
                                </Grid>
                            ))}
                    </Grid>
                </div>
            </Item>
            <Typography
                variant="h6"
                component="div"
                sx={{
                    fontSize: 17,
                    fontWeight: "400",
                    transform: "translate(5px,5px)",
                }}
            ></Typography>

        </div>
    )
}
export default InfomationDemandBase;