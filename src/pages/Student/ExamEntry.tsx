import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import './examEntry.css'
import logo from '../../assets/nstu.png'
const ExamEntry = () => {
    return (
        <DefaultLayout>

            <>
                <div className="container mx-auto p-4">
                    <div className="form-header p-4 md:flex md:flex-col md:items-center md:justify-center">
                        <div className="flex justify-between items-center mb-4">
                            <img
                                src={logo}
                                alt="photo"
                                className="object-cover object-center w-20 h-20 md:w-22 md:h-32 mr-4"
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
                            <label htmlFor="name" className="mr-2">Name:</label>
                            <input type="text" name="name" className="input-field" placeholder="Name" />
                        </div>
                        <div className="md:flex md:items-center">
                            <label htmlFor="fname" className="mr-2">Father's Name:</label>
                            <input type="text" name='fname' className="input-field" placeholder="Father's Name" />
                        </div>

                        <div className="md:flex md:items-center">
                            <label htmlFor="mname" className="mr-2">Mother's Name:</label>
                            <input type="text" name='mname' className="input-field" placeholder="Mothers's Name" />
                        </div>
                        <input type="text" className="input-field" placeholder="Department" />
                        <div className="flex items-center">
                            <label>Roll NO.: </label>
                            <div className="border-bottom flex-grow ml-2">___________________________</div>
                        </div>
                        <input type="text" className="input-field" placeholder="Name of the Hall" />
                        <input type="text" className="input-field" placeholder="Date of commencement of Examination" />
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

                    <div className="signature-block mb-8">
                        <div>Chairman</div>
                        <div>Provost</div>
                    </div>

                    <div className="admit-card p-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="stamp-photo"></div>
                            <div className="text-center">
                                <h2>Noakhali Science and Technology University</h2>
                                <div className="text-lg">Admit Card</div>
                                <div>Year: ________ Session: ________ Term: ________ Final Examination-202_</div>
                            </div>
                            <div></div>
                        </div>
                        <div className="flex justify-between mb-4">
                            <input type="text" className="input-field" placeholder="Name" />
                            <input type="text" className="input-field" placeholder="Department" />
                        </div>
                        <div className="flex items-center">
                            <label>Roll NO.: </label>
                            <div className="border-bottom flex-grow ml-2">___________________________</div>
                        </div>
                        <input type="text" className="input-field" placeholder="Name of the Hall" />
                        <input type="text" className="input-field" placeholder="Date of commencement of Examination" />
                    </div>

                    <div className="mb-4">
                        <label className="signature-field inline-block w-1/2 text-center">Controller of Examinations</label>
                        <div className="inline-block w-1/2 text-center">
                            <span>Stamp Size Photograph:</span>
                            <div className="border-2 border-dashed h-20 w-16 inline-block ml-2"></div>
                        </div>
                    </div>

                </div>
            </>



        </DefaultLayout>
    );
};

export default ExamEntry;