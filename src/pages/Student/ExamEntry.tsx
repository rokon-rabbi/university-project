import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import './examEntry.css';
import DownloadPdfButton from '../../common/DownloadPdfButton';
import logo from '../../assets/nstu.png';
import axios from 'axios';

const ExamEntry = () => {
  const [user, setUser] = useState(null);
  const printRef = useRef();
  const [student, setStudentData] = useState(null);
  const [attendanceData, setAttendanceData] = useState({ dates: [], data: [] });
  const [chairmanSignature, setChairmanSignature] = useState(null);
  const [provostSignature, setProvostSignature] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch student data based on user ID
      axios.get(`http://localhost:5000/api/unique_student`, {
        params: { userId: parsedUser.user_id }
      })
        .then(response => {
          const studentData = response.data;
          setStudentData(studentData);

          // Fetch attendance data based on student ID
          return axios.get(`http://localhost:5000/api/getExamEntryAttendence`, {
            params: { student: studentData.student_id }
          }).then(attendanceResponse => {
            setAttendanceData(attendanceResponse.data);

            // Fetch chairman and provost status based on student ID
            return axios.get(`http://localhost:5000/api/getChairmanProvostStatus`, {
              params: { studentId: studentData.student_id }
            });
          });
        })
        .then(response => {
          const { chairman_status, provost_status } = response.data;

          if (chairman_status === 'yes') {
            // Fetch chairman's signature
            axios.get(`http://localhost:5000/api/unique_teacher`, {
              params: { userId: 28 }
            }).then(chairmanResponse => {
              setChairmanSignature(chairmanResponse.data.signature);
            });
          }

          if (provost_status === 'yes') {
            // Fetch provost's signature
            axios.get(`http://localhost:5000/api/unique_teacher`, {
              params: { userId: 37 }
            }).then(provostResponse => {
              setProvostSignature(provostResponse.data.signature);
            });
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);

  const calculateAttendanceStats = (record) => {
    const uniqueDates = [...new Set(record.dates.map(dateRecord => dateRecord.date))];
    const totalClasses = uniqueDates.length;
    const attendedClasses = record.dates.filter(dateRecord => dateRecord.status === 'present').length;
    const attendancePercentage = totalClasses ? ((attendedClasses / totalClasses) * 100).toFixed(2) : 0;

    return {
      course_code: record.course_code,
      totalClasses,
      attendedClasses,
      attendancePercentage
    };
  };

  const calculateAverageAttendancePercentage = () => {
    if (attendanceData.data.length === 0) return 0;
    const totalPercentage = attendanceData.data.reduce((acc, record) => {
      const stats = calculateAttendanceStats(record);
      return acc + parseFloat(stats.attendancePercentage);
    }, 0);
    return (totalPercentage / attendanceData.data.length).toFixed(2);
  };

  return (
    <DefaultLayout>
      {student && student.entryStatus === "yes" ? (
        <>
          <DownloadPdfButton targetRef={printRef} />
          <div ref={printRef} className="">
            <div className="container mx-auto md:p-4">
              <div className="form-header p-4 md:flex md:flex-col md:items-center md:justify-center">
                <div className="flex justify-between items-center mb-4">
                  <img
                    src={user?.user_image || ''}
                    alt="photo"
                    className="object-cover object-center w-20 h-20 md:w-22 md:h-28 mr-4"
                  />
                  <img
                    src={logo}
                    alt="nstu logo"
                    className="object-cover object-center w-12 h-12 md:w-14 md:h-20"
                  />
                  <h1 className="text-center text-xl md:text-2xl font-bold md:p-5">
                    Noakhali Science and Technology University<br />Examination Entry Form
                  </h1>
                  <div className="hidden md:flex md:flex-col md:items-end md:space-y-2">
                    <div>Form Serial No._________</div>
                    <div>Receipt No._________</div>
                    <div>Date: __/__/____</div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between mb-4">
                  <div className="mb-2 md:mb-0">Year: ________</div>
                  <div className="mb-2 md:mb-0">Session: ________</div>
                  <div>Term: ________ Final Examination-202_</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="md:flex md:items-center">
                  <label htmlFor="name" className="md:mr-14">Name:</label>
                  <input type="text" name="name" value={user?.user_name || ''} className="input-field" placeholder="Name" readOnly />
                </div>
                <div className="md:flex md:items-center">
                  <label htmlFor="fname" className="md:mr-2">Father's Name:</label>
                  <input type="text" name='fname' className="input-field" placeholder="Father's Name" />
                </div>

                <div className="md:flex md:items-center">
                  <label htmlFor="mname" className="md:mr-2">Mother's Name:</label>
                  <input type="text" name='mname' className="input-field" placeholder="Mother's Name" />
                </div>
                <div className="md:flex md:items-center">
                  <label htmlFor="department" className="md:mr-6">Department:</label>
                  <input type="text" name='department' className="input-field" placeholder="Department" />
                </div>

                <div className="flex items-center">
                  <label>Roll NO.: </label>
                  <div className="border-bottom flex-grow ml-2">____{student?.roll || ''}</div>
                </div>
                <div className="md:flex md:items-center">
                  <label htmlFor="hall:" className="md:mr-6">Name of the Hall:</label>
                  <input type="text" name='hall' className="input-field" placeholder="Name of the Hall" />
                </div>
                <div className="md:flex md:items-center">
                  <label htmlFor="date" className="md:mr-6">Date of commencement of Examination:</label>
                  <input type="text" name='date' className="input-field" placeholder="Date of commencement of Examination" />
                </div>
              </div>

              <table className="table-auto w-full mb-4">
                <thead>
                  <tr className="table-header-row">
                    <th className="px-4 py-2">SI</th>
                    <th className="px-4 py-2">Course code</th>
                    <th className="px-4 py-2">Stipulated No. of classes</th>
                    <th className="px-4 py-2">No. of classes held</th>
                    <th className="px-4 py-2">No. of classes attended</th>
                    <th className="px-4 py-2">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.data.map((record, index) => {
                    const stats = calculateAttendanceStats(record);
                    return (
                      <tr key={index}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border text-center px-4 py-2">{stats.course_code}</td>
                        <td className="border text-center px-4 py-2">{record.course_credit * 13}</td>
                        <td className="border text-center px-4 py-2">{stats.totalClasses}</td>
                        <td className="border text-center px-4 py-2">{stats.attendedClasses}</td>
                        <td className="border text-center px-4 py-2">{Math.trunc(stats.attendancePercentage)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="mb-4">
                <label>Percentage of attendance: {calculateAverageAttendancePercentage()} %</label>
              </div>
              <div className="signature-block flex p-6 md:mt-6 ">
                {chairmanSignature && (
                  <div>
                  
                    <img src={chairmanSignature} alt="Chairman Signature" className=" w-54 h-auto object-contain" />
                    <div>Chairman</div>
                  </div>
                )}
                {provostSignature && (
                  <div>

<img src={chairmanSignature} alt="Chairman Signature" className=" w-54 h-auto object-contain" />
                    <div>Provost</div>
                  </div>
                )}
              </div>

              <div className="admit-card p-4">
                <div className="flex justify-between items-center mb-4">
                  <img
                    src={logo}
                    alt="nstu logo"
                    className="object-cover object-center w-12 h-12 md:w-14 md:h-20"
                  />
                  <div className="text-center">
                    <h6 className='text-2xl'>Noakhali Science and Technology University</h6>
                    <div className="text-lg">Admit Card</div>
                    <div className="flex md:text-left flex-col md:flex-row">
                      <span className="mr-4 mb-2 md:mb-0">Year: ________</span>
                      <span className=" mb-2 md:mb-0">Session: ________</span>
                      <span className="mb-2 md:mb-0">Term: ________</span>
                      <span className="md:ml-auto">Final Examination-202_</span>
                    </div>

                  </div>
                  <div>
                    <img
                      src={user?.user_image || ''}
                      alt="photo"
                      className="object-cover object-center w-20 h-20 md:w-22 md:h-28 mr-4"
                    />
                  </div>
                </div>
                <div className=" mb-4">
                  <div className="md:flex md:items-center">
                    <label htmlFor="name" className="md:mr-14">Name:</label>
                    <input type="text" name="name" value={user?.user_name || ''} className="input-field" placeholder="Name" readOnly />
                  </div>
                  <div className="md:flex md:items-center">
                    <label htmlFor="department" className="md:mr-6">Department:</label>
                    <input type="text" name='department' className="input-field" placeholder="Department" />
                  </div>
                </div>
                <div className="flex items-center">
                  <label>Roll NO.: </label>
                  <div className="border-bottom flex-grow ml-2">____{student?.roll || ''}</div>
                </div>
                <div className="md:flex md:items-center">
                  <label htmlFor="hall:" className="md:mr-6">Name of the Hall:</label>
                  <input type="text" name='hall' className="input-field" placeholder="Name of the Hall" />
                </div>
                <div className="md:flex md:items-center">
                  <label htmlFor="date" className="md:mr-6">Date of commencement of Examination:</label>
                  <input type="text" name='date' className="input-field" placeholder="Date of commencement of Examination" />
                </div>
              </div>

              <div className="mt-14 flex justify-end">
                <label className="signature-field w-1/2 text-center float-right">Controller of Examinations</label>
              </div>

            </div>
          </div>
        </>
      ) : (
        <p className="not-allowed-message">Exam Entry Form Not Published Yet!!</p>
      )}
    </DefaultLayout>
  );
};

export default ExamEntry;
