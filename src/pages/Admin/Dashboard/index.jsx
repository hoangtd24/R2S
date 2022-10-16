import React from "react";
import NumberOfCurrentUsers from "./NumberOfCurrentUsers"
import NumberOfNewUsers from "./NumberOfNewUsers"
import TableChangingUser from "./TableChangingUser"
import "./styles.scss";
export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <NumberOfCurrentUsers/>
      <NumberOfNewUsers/>
      <TableChangingUser/>
    </div>
  );
}
