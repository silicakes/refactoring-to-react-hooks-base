import React from "react";
import DashboardShell from "./features/Dashboard/DashboardShell";
import { createServer } from "miragejs";
import { sales, subscriptions } from "./mocks";
import CommonDropdown from "./CommonDropdown";
if (process.env.NODE_ENV === "development") {
  createServer({
    routes() {
      this.get("/api/sales", () => sales);
      this.get("/api/subscriptions", () => subscriptions);
    },
  });
}
const App = () => {
  return (
    <>
      <CommonDropdown />
      <DashboardShell />
    </>
  );
};

export default App;
