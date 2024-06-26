import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import 'tailwindcss/tailwind.css';

const ViewAttendancePage = () => {
  const { course_level } = useParams();
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({ dates: [], data: [] });
  const location = useLocation();
  const { courseid } = location.state || {};

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const studentResponse = await axios.get('http://localhost:5000/api/getStudents', {
          params: { course_level },
        });
        setStudents(studentResponse.data);

        const attendanceResponse = await axios.get('http://localhost:5000/api/getAttendance', {
          params: { courseid },
        });
        setAttendanceData(attendanceResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAttendanceData();
  }, [course_level, courseid]);

  const calculateAttendanceStats = (studentId) => {
    const studentAttendance = attendanceData.data.find((record) => record.student_id === studentId);

    const totalClasses = new Set(attendanceData.dates).size;
    const attendedClasses = studentAttendance
      ? studentAttendance.dates.filter((dateRecord) => dateRecord.status === 'present').length
      : 0;
    const attendancePercentage = totalClasses ? ((attendedClasses / totalClasses) * 100).toFixed(2) : 0;

    return { totalClasses, attendedClasses, attendancePercentage };
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h3 className="text-2xl font-bold mb-4 text-center">Attendance Records for Course Level {course_level}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">SL</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Roll</th>
                <th className="border px-4 py-2">Total Classes Held</th>
                <th className="border px-4 py-2">Attended Classes</th>
                <th className="border px-4 py-2">Attendance Percentage</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                const { totalClasses, attendedClasses, attendancePercentage } = calculateAttendanceStats(student.student_id);
                return (
                  <tr key={student.student_id} className="text-center">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{student.user_name}</td>
                    <td className="border px-4 py-2">{student.roll}</td>
                    <td className="border px-4 py-2">{totalClasses}</td>
                    <td className="border px-4 py-2">{attendedClasses}</td>
                    <td className="border px-4 py-2">{attendancePercentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewAttendancePage;
