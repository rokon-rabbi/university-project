import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DefaultLayout from '../../layout/DefaultLayout';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Evaluation {
  evaluation_score: number;
  evaluation_date: string;
}

interface Course {
  course_id: string;
  course_name: string;
}

const CoordinatorEvaluationReport: React.FC = () => {
  const [teacher, setTeacher] = useState<string | null>(null);
  const [classes, setClasses] = useState<Course[]>([]);
  const [evaluationData, setEvaluationData] = useState<Record<string, Evaluation[]>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      axios.get(`http://localhost:5000/api/unique_teacher`, {
        params: { userId: parsedUser.user_id }
      })
        .then(response => {
          const teacherData = response.data;
          const teacherId = teacherData.teacher_id;
          setTeacher(teacherId);

          return axios.get(`http://localhost:5000/api/unique_courses`, {
            params: { teacherId: teacherId }
          });
        })
        .then(response => {
          const coursesData: Course[] = response.data;
          setClasses(coursesData);

          if (coursesData.length === 0) {
            setLoading(false);
            return;
          }

          const fetchEvaluations = coursesData.map(course =>
            axios.get(`http://localhost:5000/api/evaluation_score`, {
              params: { courseId: course.course_id }
            }).then(evaluationResponse => ({
              courseId: course.course_id,
              evaluations: evaluationResponse.data
            }))
          );

          return Promise.all(fetchEvaluations);
        })
        .then(courseEvaluations => {
          const evalData = courseEvaluations.reduce((acc, item) => {
            acc[item.courseId] = item.evaluations;
            return acc;
          }, {} as Record<string, Evaluation[]>);

          setEvaluationData(evalData);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, []);

  const calculateAverageScore = (evaluations: Evaluation[]): string => {
    const totalScore = evaluations.reduce((sum, evaluation) => sum + evaluation.evaluation_score, 0);
    return (totalScore / evaluations.length).toFixed(2);
  };

  const renderEvaluationChart = (evaluations: Evaluation[]) => {
    const labels = evaluations.map(e => new Date(e.evaluation_date).toLocaleDateString());
    const data = evaluations.map(e => e.evaluation_score);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Evaluation Score',
          data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };

    const averageScore = calculateAverageScore(evaluations);

    return (
      <>
        <Pie data={chartData} />
        <p className="text-center mt-4 font-semibold">Average Score: {averageScore}%</p>
      </>
    );
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-4">Course Evaluation Report</h1>
        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map(course => (
              <div key={course.course_id} className="p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-2">{course.course_name}</h2>
                {evaluationData[course.course_id]?.length > 0 ? (
                  <>
                    <p className="mb-4">Total Evaluations: {evaluationData[course.course_id].length} / 31</p>
                    {renderEvaluationChart(evaluationData[course.course_id])}
                  </>
                ) : (
                  <p className="text-red-500">Not Evaluated Yet</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default CoordinatorEvaluationReport;
