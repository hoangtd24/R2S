import StatisticPieChart from "./StatisticPieChart";
import "./styles.scss";
import TableStatisticDetail from "./TableStatisticDetail";
import TotalStatistic from "./TotalStatistic";

const Statistic = () => {
  return (
    <div className="statistic-container">
      <TotalStatistic/>
      <div className="statistic-detail">
        <TableStatisticDetail/>
        <StatisticPieChart/>
      </div>
    </div>
  );
};

export default Statistic;
