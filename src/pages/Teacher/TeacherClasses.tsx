import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CardClass from './CardClass';

const TeacherClasses = () => {
    return (
        <DefaultLayout>
            <div className=" bg-gray-100 flex items-center justify-center p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CardClass title="IIT 2nd Batch" subtitle="Rahat Uddin Azad" teacherName="Rahat Uddin Azad" />
                    <CardClass title="Database" subtitle="2nd batch" teacherName="Tasniya Ahmed" />
                    <CardClass title="Information Security" subtitle="BSSE02" teacherName="Falguni Roy" />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default TeacherClasses;