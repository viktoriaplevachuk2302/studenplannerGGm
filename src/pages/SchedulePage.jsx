import ScheduleTable from "../components/schedule/ScheduleTable";
import WeeklyTasks from "../components/tasks/WeeklyTasks";
import "./SchedulePage.css";

const SchedulePage = () => {
  return (
    <div className="schedule-container">
      <ScheduleTable />
      <WeeklyTasks />
    </div>
  );
};

export default SchedulePage;
