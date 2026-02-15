import React from 'react'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../../hooks/useGetAppliedJobs'

const AppliedJobTable = () => {
    useGetAppliedJobs();
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div>
            <table className='w-full text-left'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='p-4 font-medium'>Date</th>
                        <th className='p-4 font-medium'>Job Role</th>
                        <th className='p-4 font-medium'>Company</th>
                        <th className='p-4 font-medium text-right'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allAppliedJobs.length <= 0 ? <tr><td colSpan="4" className="p-4 text-center text-gray-400">You haven't applied to any job yet.</td></tr> : allAppliedJobs.map((appliedJob) => (
                            <tr key={appliedJob._id} className='border-b border-gray-200'>
                                <td className='p-4'>{appliedJob?.createdAt?.split("T")[0] || "N/A"}</td>
                                <td className='p-4'>{appliedJob?.job?.title || "N/A"}</td>
                                <td className='p-4'>{appliedJob?.job?.company?.name || "N/A"}</td>
                                <td className='p-4 text-right'><span className={`font-bold ${appliedJob?.status === "rejected" ? 'text-red-600' : appliedJob?.status === 'pending' ? 'text-gray-400' : 'text-green-600'}`}>{appliedJob?.status?.toUpperCase() || "PENDING"}</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AppliedJobTable
