import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';

const CourseEvaluation = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const [student, setStudent] = useState();
  const [batc, setbatc] = useState();
  const { teacherid, course_code, course_name,course_level } = location.state || {};
  console.log(course_level)
  const [evaluation, setEvaluation] = useState({
    question1a: '',
    question1b: '',
    question1c: '',
    question2a: '',
    question2b: '',
    question2c: '',
    question2d: '',
    question2e: '',
    question3a: '',
    question3b: '',
    question3c: '',
    question3d: '',
    question4a: '',
    question4b: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const storedUser = localStorage.getItem('user');
  useEffect(() => {
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser.user_id);

      // Fetch student data based on user ID
      axios.get(`http://localhost:5000/api/unique_student`, {
        params: {
          userId: parsedUser.user_id
        }
      })
        .then(response => {
          // Handle successful response
          const studentData = response.data;

          setStudent(studentData.student_id)
          setbatc(studentData.level)
          console.log(batc)
         

          // Process student data as needed
        })
        .catch(error => {
          // Handle error
          console.error('Error fetching student data:', error);
        });
    }
    // Fetch data from the backend to check if the student has already submitted the form
    
    axios.get(`http://localhost:5000/api/check-evaluation?courseId=${courseId}&studentId=${student}`)
      .then(response => {
        console.log(response.data.submitted)
        if (response.data.submitted) {
          setIsSubmitted(true);
        }
      })
      .catch(error => console.error('Error checking evaluation status:', error));
  }, [courseId, student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculateScore = () => {
    const scoreMap = {
      'Strongly Disagree': 1,
      'Disagree': 2,
      'Neutral': 3,
      'Agree': 4,
      'Strongly Agree': 5
    };
    const totalQuestions = Object.keys(evaluation).length;
    const totalScore = Object.values(evaluation).reduce((sum, value) => sum + scoreMap[value], 0);
    return (totalScore / (totalQuestions * 5)) * 100;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const evaluationScore = calculateScore();
   
    if(batc == course_level){
      axios.post('http://localhost:5000/api/evaluate-course', {
        courseId,
        teacherid,
        evaluationScore,
        evaluationDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        student,
        ...evaluation,
      })
        .then((response) => {
          alert('Evaluation submitted successfully');
          setIsSubmitted(true);
        })
        .catch((error) => console.error('Error submitting evaluation:', error));
    }
    else{
      alert("You are not student of this batch.")
    }
 
  };

  const renderQuestion = (question, name) => (
    <div className="mb-4">
      <p>{question}</p>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
          <label className="flex items-center p-4 bg-purple-100 rounded-lg" key={index}>
            <input type="radio" name={name} value={option} onChange={handleChange} className="mr-2" required disabled={isSubmitted} /> {option}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <DefaultLayout>
      <div className="container max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-4">Course Evaluation Form</h1>
        <p className="text-center text-xl mb-8">{course_code}     :
          {course_name}</p>
        {/* <p className="text-center text-lg mb-6">Course Teacher: Md. Iftekharul Alam Efat</p> */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold mb-2">1. Course Content & Organization</h2>
          {renderQuestion('a. The Course Objective and Outline was clear', 'question1a')}
          {renderQuestion('b. The Course Workload was manageable', 'question1b')}
          {renderQuestion('c. The Course Materials were easily accessible and relevant to Learning Outcome', 'question1c')}

          <h2 className="text-xl font-semibold mb-2">2. Learning Environment & Teaching Method</h2>
          {renderQuestion('a. Sufficient number of Classes has been taken', 'question2a')}
          {renderQuestion('b. Course was well structured to achieve learning outcomes (there was a good balance of lectures, tutorials, practical etc.)', 'question2b')}
          {renderQuestion('c. The learning and teaching methods encouraged student participation', 'question2c')}
          {renderQuestion('d. The overall environment in the class was conducive for learning', 'question2d')}
          {renderQuestion('e. The teacher was friendly, responsible, helpful and was available off-class', 'question2e')}

          <h2 className="text-xl font-semibold mb-2">3. Quality of Lecture Delivery</h2>
          {renderQuestion('a. Class Began and Ends on time', 'question3a')}
          {renderQuestion('b. The teacher\'s lecture was Clear and Specific', 'question3b')}
          {renderQuestion('c. The teacher encouraged the students to ask Question and Responds to the questions', 'question3c')}
          {renderQuestion('d. The teacher covered the Course Materials as per Course Outline', 'question3d')}

          <h2 className="text-xl font-semibold mb-2">4. Assessment Evaluation</h2>
          {renderQuestion('a. The teachers took all required Quizzes, Assignments and Evaluated those timely and properly', 'question4a')}
          {renderQuestion('b. Feedback on assessment was on time as well as helpful', 'question4b')}

          <button type="submit" className="block mx-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors" disabled={isSubmitted}>
            {isSubmitted ? 'Evaluation Submitted' : 'Submit Evaluation'}
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default CourseEvaluation;
