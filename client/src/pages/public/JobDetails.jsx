import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar'
import useGetSingleJob from '../../hooks/useGetSingleJob';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';
import { setSingleJob } from '../../redux/jobSlice';
// import { toast } from 'sonner';

const JobDetails = () => {
    const params = useParams();
    const jobId = params.id;
    const { singleJob, user } = useSelector(store => store.job); // user is in auth but let's take singleJob
    const { user: authUser } = useSelector(store => store.auth);

    // dispatch single job fetch
    useGetSingleJob(jobId);

    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        if (singleJob?.applications?.some(application => application.applicant === authUser?._id)) {
            setIsApplied(true);
        } else {
            setIsApplied(false);
        }
    }, [singleJob, authUser]);

    const applyJobHandler = async () => {
        try {
            const res = await api.get(`/application/apply/${jobId}`);
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: authUser?._id }] };
                // dispatch(setSingleJob(updatedSingleJob)); // Optional: update local state
                // toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-4'>
                            <span className='px-2 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200'>{singleJob?.position} Positions</span>
                            <span className='px-2 py-1 rounded-full bg-red-50 text-red-700 font-bold text-xs border border-red-200'>{singleJob?.jobType}</span>
                            <span className='px-2 py-1 rounded-full bg-purple-50 text-purple-700 font-bold text-xs border border-purple-200'>{singleJob?.salary}LPA</span>
                        </div>
                    </div>
                    <button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg px-4 py-2 text-white font-medium ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#6A38C2] hover:bg-[#5b30a6]'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </button>
                </div>
                <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
                </div>
            </div>
        </div>
    )
}

export default JobDetails
