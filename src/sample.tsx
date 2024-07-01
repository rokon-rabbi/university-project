import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';
import axios from 'axios';
import AttendenceReport from './pages/Student/AttendenceReport';
import CourseEvaluation from './pages/Student/CourseEvaluation';
import ExamEntry from './pages/Student/ExamEntry';
import ExamEntries from './pages/Register/ExamEntries';
import StudentRoute from './Routes/StudentRoute';
import RegisterRoute from './Routes/RegisterRoute';
import TeacherClasses from './pages/Teacher/TeacherClasses';
import TeacherRoute from './Routes/TeacherRoute';
import ExamEntriesProvost from './pages/Provost/ExamEntriesProvost';
import ProvostRoute from './Routes/ProvostRoute';
import CoordinatorClasses from './pages/Coordinator/CoordinatorClasses';
import CoordinatorRoute from './Routes/CoordinatorRoute';
import Coordinator from './pages/Coordinator/Coordinator';
import CoordinatorEvaluation from './pages/Coordinator/CoordinatorEvaluation';
import ChairmanEvaluation from './pages/Chairman/ChairmanEvaluation';
import ChairmanRoute from './Routes/ChairmanRoute';
import CoordinatorDistribution from './pages/Chairman/CoordinatorDistribution';
import CourseDistribution from './pages/Chairman/CourseDistribution';
import AttendancePage from './pages/Teacher/AttendancePage';
import ViewAttendancePage from './pages/Teacher/ViewAttendancePage';
import CourseEvaluationForm from './pages/Student/CourseEvaluationForm';
import CourseEvaluationReport from './pages/Teacher/CourseEvaluationReport';
import SignToExamEntry from './pages/Chairman/SignToExamEntry';

function Sample() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    axios.get('http://localhost:5000/dashboard')
      .then(res => {
        console.log(res.data.status);
        if (res.data.status === "Success") {
          console.log(res.data);
        } else {
          console.log("failed");
        }
      }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (

    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="Dashboard" />
            <ECommerce />

          </>
        }
      />
      {/* student routes  start */}
      <Route
        path="/attendence"
        element={
          <>
            <PageTitle title="attendence" />
            <StudentRoute> <AttendenceReport /></StudentRoute>
          </>
        }
      />
      <Route
        path="/evaluation"
        element={
          <>
            <PageTitle title=" course evaluation" />
            <StudentRoute>  <CourseEvaluation /></StudentRoute>
          </>
        }
      />
      <Route
        path="course-evaluation/:courseId"
        element={
          <>
            <PageTitle title="course-evaluation" />
            <StudentRoute> <CourseEvaluationForm /> </StudentRoute>
          </>
        }
      />
      <Route
        path="/exam"
        element={
          <>
            <PageTitle title="exam entry" />
            <StudentRoute>  <ExamEntry /></StudentRoute>
          </>
        }
      />
      {/* student route end  */}
      {/* Register start  */}
      <Route
        path="/examEntries"
        element={
          <>
            <PageTitle title="exam entries" />
            <RegisterRoute> <ExamEntries /></RegisterRoute>
          </>
        }
      />
      {/* Register end  */}

      {/* Teacher route start here */}
      <Route
        path="/classes"
        element={
          <>
            <PageTitle title="classes" />
            <TeacherRoute>  <TeacherClasses /></TeacherRoute>
          </>
        }
      />
      <Route
        path="takeAttendence/:course_level"
        element={
          <>
            <PageTitle title="attendance" />
            <TeacherRoute>  <AttendancePage /></TeacherRoute>
          </>
        }
      />
      <Route
        path="viewAttendence/:course_level"
        element={
          <>
            <PageTitle title="view-attendance" />
            <TeacherRoute>  <ViewAttendancePage /></TeacherRoute>
          </>
        }
      />
      <Route
        path="/evaluationReport"
        element={
          <>
            <PageTitle title="Course Evaluation" />
            <TeacherRoute>  <CourseEvaluationReport /></TeacherRoute>
          </>
        }
      />
      {/* Teacher route end here  */}
      {/* Provost route start here  */}
      <Route
        path="/ExamEntriesProvost"
        element={
          <>
            <PageTitle title="Exam Entries" />
            <ProvostRoute>  <ExamEntriesProvost /></ProvostRoute>
          </>
        }
      />
      {/* provost route end  */}
      {/* coordinator route start  */}
      <Route
        path="/CoordinatorClasses"
        element={
          <>
            <PageTitle title="Classes" />
            <CoordinatorRoute>  <CoordinatorClasses /></CoordinatorRoute>
          </>
        }
      />
      <Route
        path="/Coordinator"
        element={
          <>
            <PageTitle title="Coordinator" />
            <CoordinatorRoute>  <Coordinator /></CoordinatorRoute>
          </>
        }
      />
      
      <Route
        path="/CoordinatorEvaluation"
        element={
          <>
            <PageTitle title="Evaluation" />
            <CoordinatorRoute>  <CoordinatorEvaluation /></CoordinatorRoute>
          </>
        }
      />
      {/* coordinator route end  */}
      {/* chairman route start */}
      <Route
        path="/ChairmanEvaluation"
        element={
          <>
            <PageTitle title="Evaluation" />
            <ChairmanRoute>  <ChairmanEvaluation /></ChairmanRoute>
          </>
        }
      />
       <Route
        path="/SignToExamEntry"
        element={
          <>
            <PageTitle title="Exam Entries" />
            <ChairmanRoute>  <SignToExamEntry/></ChairmanRoute>
          </>
        }
      />
      <Route
        path="/CoordinatorDistribution"
        element={
          <>
            <PageTitle title="Coordinator Distribution" />
            <ChairmanRoute>  <CoordinatorDistribution /></ChairmanRoute>
          </>
        }
      />
      <Route
        path="/CourseDistribution"
        element={
          <>
            <PageTitle title="Course Distribution" />
            <ChairmanRoute>  <CourseDistribution /></ChairmanRoute>
          </>
        }
      />
      {/* chairman route end  */}

      <Route
        path="/profile"
        element={
          <>
            <PageTitle title="Profile" />
            <Profile />
          </>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>

  );
}

export default Sample;
