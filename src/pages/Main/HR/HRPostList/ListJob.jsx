import CardPost from "src/components/CardPost";
import Null from "src/components/Null";
import "./styles.scss";

const formatLocation = (location) => {
  return `${location?.address}, ${location?.district?.name},
      ${location?.district?.province?.name}`;
};

export const ListJob = ({ listJob, message, isDisabled }) => {
  return (
    <div className="hrpost__list">
      {listJob?.length > 0 ? (
        isDisabled ? (
          listJob?.map((job) => (
            <CardPost
              idJob={job?.id}
              key={job?.id}
              status={job?.status}
              jobName={job?.name}
              amount={job?.amount}
              amountApplications={job?.numOfApply}
              timeStart={job?.timeStartStr}
              timeEnd={job?.timeEndStr}
              timeCreated={job?.createDate}
              companyName={job?.hr?.company?.name}
              companyLocation={formatLocation(job?.locationjob)}
              isDisabled={isDisabled}
              jobDetail={job}
            />
          ))
        ) : (
          listJob
            ?.sort((a, b) => b.id - a.id)
            ?.map((job) => (
              <CardPost
                idJob={job?.id}
                key={job?.id}
                status={job?.status}
                jobName={job?.name}
                amount={job?.amount}
                amountApplications={job?.numOfApply}
                timeStart={job?.timeStartStr}
                timeEnd={job?.timeEndStr}
                timeCreated={job?.createDate}
                companyName={job?.hr?.company?.name}
                companyLocation={formatLocation(job?.locationjob)}
                isDisabled={isDisabled}
                jobDetail={job}
              />
            ))
        )
      ) : (
        <Null text={message} />
      )}
    </div>
  );
};
