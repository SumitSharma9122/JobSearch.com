import React from 'react'
import { Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();
    // const jobId = "123"; // dynamic later

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        const daysDifference = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
        return daysDifference;
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <button className='rounded-full bg-gray-100 p-2'><Bookmark size={20} /></button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <div className='w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center p-1'>
                    <img src={job?.company?.logo || "https://png.pngtree.com/png-vector/20220513/ourmid/pngtree-hand-drawn-doodle-start-up-logo-png-image_4590932.png"} alt="logo" className='w-full h-full object-contain' />
                </div>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <span className='px-2 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200'>{job?.position} Positions</span>
                <span className='px-2 py-1 rounded-full bg-red-50 text-red-700 font-bold text-xs border border-red-200'>{job?.jobType}</span>
                <span className='px-2 py-1 rounded-full bg-purple-50 text-purple-700 font-bold text-xs border border-purple-200'>{job?.salary}LPA</span>
            </div>
            <div className='flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar'>
                {/* Mock Skills - In real app, these would come from job.skills */}
                <span className='bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] whitespace-nowrap'>React</span>
                <span className='bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] whitespace-nowrap'>Node.js</span>
                <span className='bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] whitespace-nowrap'>MongoDB</span>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <button onClick={() => navigate(`/description/${job?._id}`)} className='bg-white text-[#7209b7] border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50'>Details</button>
                <button className='bg-[#6A38C2] text-white px-4 py-2 rounded-md hover:bg-[#5b30a6]'>Save For Later</button>
            </div>
        </div>
    )
}

export default Job
