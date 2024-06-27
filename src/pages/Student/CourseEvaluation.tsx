
import DefaultLayout from '../../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseEvaluation = () => {
    const [year, setYear] = useState('');
    const [term, setTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const handleYearChange = (e) => setYear(e.target.value);
    const handleTermChange = (e) => setTerm(e.target.value);

    const fetchCourses = () => {
        axios.get(`http://localhost:5000/api/courses?year=${year}&term=${term}`)
            .then(response => setCourses(response.data))
            .catch(error => console.error('Error fetching courses:', error));
    };

    const handleRowClick = (courseId,teacherid) => {
        navigate(`/dashboard/course-evaluation/${courseId}`, { state: {teacherid } });
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-4 text-center">Course Evaluation</h1>
                <div className="flex justify-center mb-4">
                    <select value={year} onChange={handleYearChange} className="mr-2 p-2 border rounded">
                        <option value="">Select Year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        {/* Add more years as needed */}
                    </select>
                    <select value={term} onChange={handleTermChange} className="ml-2 p-2 border rounded">
                        <option value="">Select Term</option>
                        <option value="1">1</option>
                        <option value="2">2</option>

                        {/* Add more terms as needed */}
                    </select>
                </div>
                <button onClick={fetchCourses} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Show Courses
                </button>

                <table className="mt-4 w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">SL</th>
                            <th className="border px-4 py-2">Course Name</th>
                            <th className="border px-4 py-2">Course Code</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={course.id} className="hover:bg-gray-200 cursor-pointer" onClick={() => handleRowClick(course.course_id, course.teacher_id)}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{course.course_name}</td>
                                <td className="border px-4 py-2">{course.course_code}</td>
                                <td className="border px-4 py-2">
                                    {course.evaluated ? (
                                        <span className="text-green-500">✓</span>
                                    ) : (
                                        'Click to Evaluate'
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DefaultLayout>
    );
};

export default CourseEvaluation;