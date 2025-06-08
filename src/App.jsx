import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import TasksPage from "./pages/TasksPage";
import SchedulePage from "./pages/SchedulePage";
import UserProfile from "./components/user/UserProfile";
import PrivateRoute from "./components/layout/PrivateRoute";
import CourseDetails from "./pages/CourseDetails";
import NotesPage from "./pages/NotesPage";


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <CoursesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <PrivateRoute>
              <SchedulePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/notes" element={<NotesPage />} />

      </Routes>
    </>
  );
};

export default App;
