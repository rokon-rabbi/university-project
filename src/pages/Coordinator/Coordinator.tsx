import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import './coordinator.css'; // Ensure you have the necessary CSS for styling
import Swal from 'sweetalert2';

const Coordinator = () => {
    const [students, setStudents] = useState([]);
    const [checkedStatus, setCheckedStatus] = useState({});
    const [attendanceData, setAttendanceData] = useState({});
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            axios.get(`http://localhost:5000/api/getEntryStudents`, {
                params: {
                    userId: parsedUser.user_id
                }
            })
                .then(response => {
                    const studentData = response.data;
                    setStudents(studentData);
                    const initialStatus = studentData.reduce((acc, student) => {
                        acc[student.student_id] = false;
                        return acc;
                    }, {});
                    setCheckedStatus(initialStatus);

                    // Fetch attendance data for each student
                    const fetchAttendanceRequests = studentData.map(student => {
                        return axios.get(`http://localhost:5000/api/getExamEntryAttendence`, {
                            params: { student: student.student_id }
                        }).then(response => ({
                            student_id: student.student_id,
                            attendance: response.data
                        }));
                    });

                    // Handle all requests concurrently
                    Promise.all(fetchAttendanceRequests)
                        .then(responses => {
                            const attendanceData = responses.reduce((acc, response) => {
                                acc[response.student_id] = response.attendance;
                                return acc;
                            }, {});

                            setAttendanceData(attendanceData);
                        })
                        .catch(error => {
                            console.error('Error fetching attendance data:', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching student data:', error);
                });
        }
    }, []);

    const calculateAverageAttendancePercentage = (studentId) => {
        const studentAttendance = attendanceData[studentId];
        if (!studentAttendance || !studentAttendance.data) return 0;

        const totalCourses = studentAttendance.data.length;
        if (totalCourses === 0) return 0;

        const totalPercentage = studentAttendance.data.reduce((acc, course) => {
            const totalClasses = course.dates.length;
            const attendedClasses = course.dates.filter(dateRecord => dateRecord.status === 'present').length;
            const attendancePercentage = totalClasses ? ((attendedClasses / totalClasses) * 100) : 0;
            return acc + attendancePercentage;
        }, 0);

        const averagePercentage = totalPercentage / totalCourses;
        return averagePercentage.toFixed(2);
    };

    const handleCheckboxChange = (studentId) => {
        setCheckedStatus({
            ...checkedStatus,
            [studentId]: !checkedStatus[studentId]
        });
    };

    const handleSelectAllChange = () => {
        const newStatus = !selectAll;
        setSelectAll(newStatus);
        const updatedStatus = students.reduce((acc, student) => {
            acc[student.student_id] = newStatus;
            return acc;
        }, {});
        setCheckedStatus(updatedStatus);
    };

    const handleSubmit = () => {
        const updates = students.map(student => ({
            student_id: student.student_id,
            entryStatus: checkedStatus[student.student_id] ? 'yes' : 'no'
        }));

        axios.post(`http://localhost:5000/api/updateEntryStatus`, { updates })
            .then(response => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "The exam entry form is now available for students",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('Error updating entry status:', error);
            });
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Make exam entry form available for students.</h1>
                <div className="mb-2 left-0">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                            className="form-checkbox h-5 w-5 text-blue-600 rounded-md transition duration-150 ease-in-out shadow-sm border-gray-300 focus:ring focus:ring-offset-0 focus:ring-blue-500 focus:outline-none"
                        />
                        <span className="ml-2 ">Select All/None</span>
                    </label>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">SL</th>
                                <th className="px-4 py-2">Student Name</th>
                                <th className="px-4 py-2">Roll</th>
                                <th className="px-4 py-2">Attendance Percentage</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.student_id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{student.user_name}</td>
                                    <td className="border px-4 py-2">{student.roll}</td>
                                    <td className="border px-4 py-2">
                                        {calculateAverageAttendancePercentage(student.student_id)} %
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <input
                                            type="checkbox"
                                            className='form-checkbox h-5 w-5 text-blue-600 rounded-md transition duration-150 ease-in-out shadow-sm border-gray-300 focus:ring focus:ring-offset-0 focus:ring-blue-500 focus:outline-none'
                                            checked={checkedStatus[student.student_id]}
                                            onChange={() => handleCheckboxChange(student.student_id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center w-full mt-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>

            </div>
        </DefaultLayout>
    );
};

export default Coordinator;
