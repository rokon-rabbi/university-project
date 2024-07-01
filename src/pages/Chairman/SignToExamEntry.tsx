import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import Swal from 'sweetalert2';

const SignToExamEntry = () => {
    const [courseLevel, setCourseLevel] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState({});
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        if (courseLevel) {
            axios.get(`http://localhost:5000/api/getStudents`, {
                params: { course_level: courseLevel }
            })
                .then(response => {
                    setStudents(response.data);
                    setSelectedStudents(response.data.reduce((acc, student) => {
                        acc[student.student_id] = false;
                        return acc;
                    }, {}));
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [courseLevel]);

    const handleSelectAll = () => {
        const newSelectedStudents = {};
        students.forEach(student => {
            newSelectedStudents[student.student_id] = !selectAll;
        });
        setSelectedStudents(newSelectedStudents);
        setSelectAll(!selectAll);
    };

    const handleStudentSelect = (studentId) => {
        setSelectedStudents(prevSelectedStudents => ({
            ...prevSelectedStudents,
            [studentId]: !prevSelectedStudents[studentId]
        }));
    };

    const handleSubmit = () => {
        const entries = students.map(student => ({

            student_id: student.student_id,

            term: courseLevel,
            chairman_status: selectedStudents[student.student_id] ? 'yes' : 'no',

        }));

        axios.post(`http://localhost:5000/api/submitEntries`, { entries })
            .then(response => {
                Swal.fire({
                    position: "top-right",
                    icon: "success",
                    title: "you have successfully signed exam entry form",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('Error submitting data:', error);
            });
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Sign To Exam Entry Form</h1>
                <div className="mb-4">
                    <label htmlFor="courseLevel" className="block text-sm font-medium text-gray-700">
                        Select Course Level
                    </label>
                    <select
                        id="courseLevel"
                        value={courseLevel}
                        onChange={(e) => setCourseLevel(e.target.value)}
                        className="mt-1 block w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="">Select...</option>
                        <option value="1-1">1-1</option>
                        <option value="1-2">1-2</option>
                        <option value="2-1">2-1</option>
                        <option value="2-2">2-2</option>
                        <option value="3-1">3-1</option>
                        <option value="3-2">3-2</option>
                        <option value="4-1">4-1</option>
                        <option value="4-2">4-2</option>
                    </select>
                </div>

                {students.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-4 flex py-2">
                                        <span>Select all</span>
                                        <input
                                            type="checkbox"
                                            className='ml-2 form-checkbox h-5 w-5 text-blue-600 rounded-md transition duration-150 ease-in-out shadow-sm border-gray-300 focus:ring focus:ring-offset-0 focus:ring-blue-500 focus:outline-none'
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th className="px-4 py-2">SL</th>
                                    <th className="px-4 py-2">Student Name</th>
                                    <th className="px-4 py-2">Roll</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={student.student_id}>
                                        <td className="border px-4 py-2">
                                            <input
                                                type="checkbox"
                                                className=' mr-2 form-checkbox h-5 w-5 text-blue-600 rounded-md transition duration-150 ease-in-out shadow-sm border-gray-300 focus:ring focus:ring-offset-0 focus:ring-blue-500 focus:outline-none'
                                                checked={selectedStudents[student.student_id] || false}
                                                onChange={() => handleStudentSelect(student.student_id)}
                                            />
                                        </td>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{student.user_name}</td>
                                        <td className="border px-4 py-2">{student.roll}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                                onClick={() => handleStudentSelect(student.student_id)}
                                            >
                                                {selectedStudents[student.student_id] ? 'Deselect' : 'Select'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {students.length > 0 && (
                    <div className="flex justify-center w-full mt-4">
                        <button
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default SignToExamEntry;
