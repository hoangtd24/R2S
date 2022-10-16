import "./styles.scss";

const StatisticUser = ({ title, firstObject, secondObject }) => {
  return (
    <>
      <div className="statistic__wrapper">
        <h2 className="statistic__title">{title}</h2>
        <div className="statistic__content">
          <div className="statistic__content-item">
            <h2>{firstObject.score || 0}</h2>
            <p>{firstObject.description}</p>
          </div>
          <div className="statistic__content-item">
            <h2>{secondObject.score || 0}</h2>
            <p>{secondObject.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticUser;