import React, { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '../../redux/jobSlice'
import { Eye, Briefcase, Users, Search, Plus } from 'lucide-react'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);

    const totalJobs = allAdminJobs?.length || 0;
    const totalApplicants = allAdminJobs?.reduce((acc, job) => acc + (job.applications?.length || 0), 0) || 0;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='font-bold text-2xl text-gray-800'>Employer Dashboard</h1>
                    <button onClick={() => navigate("/admin/jobs/create")} className='bg-[#6A38C2] text-white px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#5b30a6] transition-colors shadow-sm'>
                        <Plus size={18} /> Post New Job
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Active Jobs</p>
                            <h2 className="text-3xl font-bold text-gray-800 mt-1">{totalJobs}</h2>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                            <Briefcase size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Applicants</p>
                            <h2 className="text-3xl font-bold text-gray-800 mt-1">{totalApplicants}</h2>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-full text-purple-600">
                            <Users size={24} />
                        </div>
                    </div>
                </div>

                {/* Jobs Table Section */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
                    <div className='p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4'>
                        <h2 className='font-bold text-lg text-gray-800'>Your Posted Jobs</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A38C2] w-full md:w-64"
                                placeholder="Filter jobs..."
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='w-full text-sm text-left text-gray-500'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                                <tr>
                                    <th scope="col" className="px-6 py-4">Company Name</th>
                                    <th scope="col" className="px-6 py-4">Role</th>
                                    <th scope="col" className="px-6 py-4">Posted Date</th>
                                    <th scope="col" className="px-6 py-4">Applicants</th>
                                    <th scope="col" className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allAdminJobs?.filter((job) => {
                                        if (!searchJobByText) {
                                            return job;
                                        }
                                        return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
                                    }).map((job) => (
                                        <tr key={job._id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{job?.company?.name}</td>
                                            <td className="px-6 py-4">{job?.title}</td>
                                            <td className="px-6 py-4">{job?.createdAt.split("T")[0]}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-purple-100 text-purple-700 py-1 px-3 rounded-full text-xs font-semibold">
                                                    {job.applications?.length || 0} Applicants
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 ml-auto bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg transition-colors'>
                                                    <Eye size={16} />
                                                    <span>View</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {allAdminJobs && allAdminJobs.length === 0 && (
                            <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
                                <p>No jobs found.</p>
                                <button onClick={() => navigate("/admin/jobs/create")} className='text-[#6A38C2] hover:underline mt-2'>Post your first job</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminJobs
