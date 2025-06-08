import ScheduleTable from "../components/schedule/ScheduleTable";
import WeeklyTasks from "../components/tasks/WeeklyTasks";
import Header from "../components/layout/Header";

import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>ПЛАНУВАННЯ НАВЧАННЯ</h1>
      <div className="home-content">
        <ScheduleTable />
        <WeeklyTasks />
      </div>
    </div>
  );
};

export default HomePage;
