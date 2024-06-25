import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';

interface Course {
    course_id: number;
    course_name: string;
    course_code: string;
}

interface Teacher {
    teacher_id: number;
    name: string;
}

const CourseDistribution: React.FC = () => {
    const [year, setYear] = useState(1);
    const [term, setTerm] = useState(1);
    const [courses, setCourses] = useState<Course[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedTeachers, setSelectedTeachers] = useState<(number | null)[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses', {
                    params: { year, term }
                });
                setCourses(response.data);
                setSelectedTeachers(new Array(response.data.length).fill(null));
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [year, term]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/teachers');
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    const handleTeacherChange = (index: number, teacher_id: number) => {
        setSelectedTeachers((prevSelectedTeachers) => {
            const newSelectedTeachers = [...prevSelectedTeachers];
            newSelectedTeachers[index] = teacher_id;
            return newSelectedTeachers;
        });
    };

    const handleSubmit = async () => {

        console.log(courses.map((course, index) => ({
            course_id: course.course_id,
            teacher_id: selectedTeachers[index] || null,
        })));

        // try {
        //     const updates = courses.map((course, index) => ({
        //         course_id: course.course_id,
        //         teacher_id: selectedTeachers[index] || null,
        //     }));

        //     await axios.post('http://localhost:5000/api/update-courses', { updates });
        //     alert('Courses updated successfully');
        // } catch (error) {
        //     console.error('Error updating courses:', error);
        //     alert('Failed to update courses');
        // }
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Course Distribution</h1>
                <div className="flex justify-center mb-4">
                    <label className="mr-2">Year:</label>
                    <select className="border p-1" value={year} onChange={(e) => setYear(Number(e.target.value))}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                    <label className="ml-4 mr-2">Term:</label>
                    <select className="border p-1" value={term} onChange={(e) => setTerm(Number(e.target.value))}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                    </select>
                </div>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 text-white bg-black">SL</th>
                            <th className="py-2 text-white bg-black">Course Name</th>
                            <th className="py-2 text-white bg-black">Course Code</th>
                            <th className="py-2 text-white bg-black">Select Teacher</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={course.course_id} className="text-center">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{course.course_name}</td>
                                <td className="border px-4 py-2">{course.course_code}</td>
                                <td className="border px-4 py-2">

                                    <select
                                        className="border p-1"
                                        value={selectedTeachers[index] || ''}
                                        onChange={(e) => handleTeacherChange(index, Number(e.target.value))}
                                    >
                                        <option value="" disabled>Select Teacher</option>
                                        {teachers.map((teacher) => (
                                            <option key={teacher.teacher_id} value={teacher.teacher_id}>
                                                {teacher.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default CourseDistribution;
