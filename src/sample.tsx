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
             <StudentRoute> <AttendenceReport/></StudentRoute>
            </>
          }
        />
        <Route
          path="/evaluation"
          element={
            <>
              <PageTitle title=" course evaluation" />
              <StudentRoute>  <CourseEvaluation/></StudentRoute>
            </>
          }
        />
        <Route
          path="/exam"
          element={
            <>
              <PageTitle title="exam entry" />
              <StudentRoute>  <ExamEntry/></StudentRoute>
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
             <RegisterRoute> <ExamEntries/></RegisterRoute>
            </>
          }
        />
        {/* Register end  */}
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="logout" />
              <Calendar />
            </>
          }
        />
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
