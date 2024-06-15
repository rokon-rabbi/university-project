import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/Register';
import PrivateRoute from './Routes/PrivateRoute';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile';
import Calendar from "./pages/Calendar";
import { Provider } from "react-redux";
import Sample from "./sample";
import store from "./redux/store/store";
import AttendenceReport from "./pages/Student/AttendenceReport";
import StudentRoute from "./Routes/StudentRoute";
import CourseEvaluation from "./pages/Student/CourseEvaluation";
import ExamEntry from "./pages/Student/ExamEntry";
import ExamEntries from "./pages/Register/ExamEntries";
import RegisterRoute from "./Routes/RegisterRoute";
import Reset from "./pages/Reset";
import NewPassword from "./pages/NewPassword";
import TeacherClasses from "./pages/Teacher/TeacherClasses";
import TeacherRoute from "./Routes/TeacherRoute";
import Coordinator from "./pages/Coordinator/Coordinator";
import CoordinatorRoute from "./Routes/CoordinatorRoute";
import CoordinatorClasses from "./pages/Coordinator/CoordinatorClasses";
import CoordinatorEvaluation from "./pages/Coordinator/CoordinatorEvaluation";
import ChairmanRoute from "./Routes/ChairmanRoute";
import ChairmanEvaluation from "./pages/Chairman/ChairmanEvaluation";
import CoordinatorDistribution from "./pages/Chairman/CoordinatorDistribution";
import CourseDistribution from "./pages/Chairman/CourseDistribution";
import ProvostRoute from "./Routes/ProvostRoute";
import ExamEntriesProvost from "./pages/Provost/ExamEntriesProvost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register", // Relative path to the parent route "/dashboard/*"
    element:<RegisterPage></RegisterPage>
  },
  {
    path: "/reset", // Relative path to the parent route "/dashboard/*"
    element:<Reset/>
  },
  {
    path: "/reset-password", // Relative path to the parent route "/dashboard/*"
    element:<NewPassword/>
  },

  {
    path: "/dashboard",
    element:
      <PrivateRoute><Sample /></PrivateRoute>,
    // <RegisterPage/>,
    children: [
     
      {
        path: "/dashboard/attendence", // Relative path to the parent route "/dashboard/*"
        element:<StudentRoute> <AttendenceReport/></StudentRoute>
      },
      {
        path: "/dashboard/evaluation", // Relative path to the parent route "/dashboard/*"
        element:<StudentRoute> <CourseEvaluation/></StudentRoute>
      },
      {
        path: "/dashboard/exam", // Relative path to the parent route "/dashboard/*"
        element: <StudentRoute><ExamEntry/></StudentRoute>
      },
      {
        path: "/dashboard/examEntries", // Relative path to the parent route "/dashboard/*"
        element: <RegisterRoute><ExamEntries/></RegisterRoute>
      },
      {
        path: "/dashboard/profile", // Relative path to the parent route "/dashboard/*"
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path: "/dashboard/classes", // Relative path to the parent route "/dashboard/*"
        element: <TeacherRoute><TeacherClasses/></TeacherRoute>
      },
      {
        path: "/dashboard/evaluationReport", // Relative path to the parent route "/dashboard/*"
        element: <TeacherRoute><CourseEvaluation/></TeacherRoute>
      },
      // Coordinator
      {
        path: "/dashboard/CoordinatorClasses", // Relative path to the parent route "/dashboard/*"
        element:  <CoordinatorRoute>  <CoordinatorClasses/></CoordinatorRoute>
      },
      {
        path: "/dashboard/Coordinator", // Relative path to the parent route "/dashboard/*"
        element: <CoordinatorRoute>  <Coordinator/></CoordinatorRoute>
      },
      {
        path: "/dashboard/CoordinatorEvaluation", // Relative path to the parent route "/dashboard/*"
        element: <CoordinatorRoute>  <CoordinatorEvaluation/></CoordinatorRoute>
      },
      // Chairman
      {
        path: "/dashboard/ChairmanEvaluation", // Relative path to the parent route "/dashboard/*"
        element:<ChairmanRoute>  <ChairmanEvaluation/></ChairmanRoute>
      },

      {
        path: "/dashboard/CoordinatorDistribution", // Relative path to the parent route "/dashboard/*"
        element:<ChairmanRoute>  <CoordinatorDistribution/></ChairmanRoute>
      },
      {
        path: "/dashboard/ExamEntriesProvost", // Relative path to the parent route "/dashboard/*"
        element:  <ProvostRoute>  <ExamEntriesProvost/></ProvostRoute>
      },

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>
);
