
import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import './examEntry.css'
import DownloadPdfButton from '../../common/DownloadPdfButton';
import logo from '../../assets/nstu.png'
const ExamEntry = () => {
    const [user, setUser] = useState<any>(null); // Initialize user state
    const printRef = useRef();
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Set user state from localStorage
        }
    }, []);

    return (
        <DefaultLayout>

            <>
            <DownloadPdfButton targetRef={printRef} />
            <div ref={printRef} className="">
                <div className="container mx-auto md:p-4">
                    <div className="form-header p-4 md:flex md:flex-col md:items-center md:justify-center">
                        <div className="flex justify-between items-center mb-4">
                            <img
                                src={user && user.user_image}
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
                            <input type="text" name="name" className="input-field" placeholder="Name" />
                        </div>
                        <div className="md:flex md:items-center">
                            <label htmlFor="fname" className="md:mr-2">Father's Name:</label>
                            <input type="text" name='fname' className="input-field" placeholder="Father's Name" />
                        </div>

                        <div className="md:flex md:items-center">
                            <label htmlFor="mname" className="md:mr-2">Mother's Name:</label>
                            <input type="text" name='mname' className="input-field" placeholder="Mothers's Name" />
                        </div>
                        <div className="md:flex md:items-center">
                            <label htmlFor="department" className="md:mr-6">Department :</label>
                            <input type="text" name='department' className="input-field" placeholder="Department" />
                        </div>


                        <div className="flex items-center">
                            <label>Roll NO.: </label>
                            <div className="border-bottom flex-grow ml-2">___________________________</div>
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
                            <tr>
                                <td className="border px-4 py-2">01</td>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2"></td>
                            </tr>
                        </tbody>
                    </table>


                    <div className="mb-4">
                        <label>Percentage of attendance: ______________</label>
                    </div>

                    <div className="signature-block p-6 md:mt-6 ">
                        <div>Chairman</div>
                        <div>Provost</div>
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
                                    src={user && user.user_image}
                                    alt="photo"
                                    className="object-cover object-center w-20 h-20 md:w-22 md:h-28 mr-4"
                                />
                            </div>
                        </div>
                        <div className=" mb-4">
                            <div className="md:flex md:items-center">
                                <label htmlFor="name" className="md:mr-14">Name:</label>
                                <input type="text" name="name" className="input-field" placeholder="Name" />
                            </div>
                            <div className="md:flex md:items-center">
                                <label htmlFor="department" className="md:mr-6">Department:</label>
                                <input type="text" name='department' className="input-field" placeholder="Department" />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <label>Roll NO.: </label>
                            <div className="border-bottom flex-grow ml-2">___________________________</div>
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



        </DefaultLayout>
    );
};

export default ExamEntry;