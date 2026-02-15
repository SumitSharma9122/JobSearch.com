import React, { useEffect } from 'react'
import Navbar from '../../components/layout/Navbar'
import ApplicantsTable from '../../components/ui/ApplicantsTable'
import useGetAllApplicants from '../../hooks/useGetAllApplicants'
import { useSelector } from 'react-redux'
import { Users, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Applicants = () => {
    useGetAllApplicants();
    const { applicants } = useSelector(store => store.application);
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up'>
                    <div className='flex items-center gap-4'>
                        <button onClick={() => navigate("/admin/jobs")} className='p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500'>
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className='font-bold text-2xl text-gray-800 flex items-center gap-2'>
                                Applicants <span className='bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-sm font-medium border border-brand-100'>{applicants?.applications?.length || 0}</span>
                            </h1>
                            <p className='text-gray-500 text-sm mt-1'>Manage candidates for this position</p>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up stagger-1'>
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants
