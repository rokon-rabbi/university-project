// src/pages/AttendancePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import 'tailwindcss/tailwind.css';

const AttendancePage = () => {
  const { course_level } = useParams();
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectAll, setSelectAll] = useState(false);
  const location = useLocation();
  const { courseid, teacherid } = location.state || {};
  // console.log(courseid, teacherid);
  useEffect(() => {
    // Fetch students for the given course level
    axios.get(`http://localhost:5000/api/getStudents`, {
      params: {
        course_level: course_level
      }
    })
      .then(response => {
        // console.log(response.data)
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [course_level]);


  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setStudents(students.map(student => ({ ...student, attendance: !selectAll })));
  };

  const handleAttendanceChange = (roll) => {
    setStudents(students.map(student =>
      student.roll === roll ? { ...student, attendance: !student.attendance } : student
    ));
  };

  const handleSubmit = async () => {
    const attendanceData = students.map(student => ({
      student_id: student.student_id,
      teacher_id: teacherid,
      course_id: courseid,
      date: date,
      attendance_status: student.attendance ? 'present' : 'absent'
    }));

    try {
      await axios.post('http://localhost:5000/api/attendances', attendanceData);
      alert('Attendance data submitted successfully');
    } catch (error) {
      console.error('Error submitting attendance data', error);
    }
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h3 className="text-2xl font-bold mb-4 text-center">Student List of {course_level}</h3>
        <div className="flex  md:flex-row justify-between mb-4">
         
          <div className="mt-2 md:mt-0">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex items-center mr-6">
            <input
              type="checkbox"
              id="selectAll"
              checked={selectAll}
              onChange={handleSelectAll}
              className="mr-2 form-checkbox h-5 w-5 text-blue-600 rounded-md transition duration-150 ease-in-out shadow-sm border-gray-300 focus:ring focus:ring-offset-0 focus:ring-blue-500 focus:outline-none"
            />
            <label htmlFor="selectAll">Select All / None</label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className=' bg-black text-white'>
                <th className="border px-4 py-2">SL</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Roll</th>
                <th className="border px-4 py-2">Present/Absent</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.roll} className="text-center">
                  <td className="border px-4 py-2 md:text-md text-xs">{index + 1}</td>
                  <td className="border px-4 py-2 md:text-md text-xs">{student.user_name}</td>
                  <td className="border px-4 py-2 md:text-md text-xs">{student.roll}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      checked={student.attendance}
                      onChange={() => handleAttendanceChange(student.roll)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded-md transition duration-150 ease-in-out shadow-sm border-gray-300 focus:ring focus:ring-offset-0 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Submit Attendance
        </button>
      </div>
    </DefaultLayout>
  );
};

export default AttendancePage;
