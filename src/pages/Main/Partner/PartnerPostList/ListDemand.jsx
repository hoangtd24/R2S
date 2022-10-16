import CardPost from "src/components/CardPost";
import Null from "src/components/Null";
import "./styles.scss";

export const ListDemand = ({ demandList, message }) => {
  return (
    <div className="hrpost__list">
      {demandList && demandList.length > 0 ? (demandList.map((demand) => (
        <CardPost
          key={demand.id}
          idDemand={demand.id}
          status={demand.status}
          jobName={demand.name}
          amount={demand.amount}
          timeStart={demand?.updateDate || demand?.createDate}
          timeEnd={demand?.end}
          timeCreated={demand.createDate}
          timeUpdated = {demand.updateDate}
          companyName={demand?.universityDTO?.name}
          companyLocation={demand?.universityDTO?.address}
          isDemandPost={true}
        />
      ))) : <Null text={message} />}
    </div>
  );
};
