import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import CardClass from './CardClass';

const CoordinatorClasses = () => {
    const [classes, setClasses] = useState([]);
    const [teacherid, setTeacher] = useState([]);



    useEffect(() => {
        // Fetch user from localStorage
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log(parsedUser.user_id);

            // Fetch teacher data based on user ID
            axios.get(`http://localhost:5000/api/unique_teacher`, {
                params: {
                    userId: parsedUser.user_id
                }
            })
                .then(response => {
                    const teacherData = response.data;
                    const teacherId = teacherData.teacher_id;
                    setTeacher(teacherId)
                    console.log("teacher ID:", teacherId);

                    // Fetch courses data using teacher ID
                    return axios.get(`http://localhost:5000/api/unique_courses`, {
                        params: {
                            teacherId: teacherId
                        }
                    });
                })
                .then(response => {
                    const coursesData = response.data;
                    setClasses(coursesData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);

                });
        }
    }, []);

    return (
        <DefaultLayout>

            <div className=" bg-gray-100 flex items-center justify-center p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classes.map((classItem) => (
                        <CardClass
                            key={classItem.id}
                            courseCode={classItem.course_code}
                            course_level={classItem.course_level}
                            courseName={classItem.course_name}
                            courseid={classItem.course_id}
                            teacherid={teacherid}
                        />
                    ))}
                </div>
            </div>



        </DefaultLayout>
    );
};

export default CoordinatorClasses;
