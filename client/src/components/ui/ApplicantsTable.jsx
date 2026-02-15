import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux';
import api from '../../services/api';
// import { toast } from 'sonner';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await api.post(`/application/status/${id}/update`, { status });
            if (res.data.success) {
                // toast.success(res.data.message);
                // potentially refetch data or update state locally
                // For now, let's just log
                console.log("Status updated");
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <table className='w-full text-left'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='p-4 font-medium'>FullName</th>
                        <th className='p-4 font-medium'>Email</th>
                        <th className='p-4 font-medium'>Contact</th>
                        <th className='p-4 font-medium'>Resume</th>
                        <th className='p-4 font-medium'>Date</th>
                        <th className='p-4 font-medium text-right'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id} className='border-b border-gray-200'>
                                <td className='p-4'>{item?.applicant?.name}</td>
                                <td className='p-4'>{item?.applicant?.email}</td>
                                <td className='p-4'>{item?.applicant?.phoneNumber || "NA"}</td>
                                <td className='p-4'>
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </td>
                                <td className='p-4'>{item?.applicant?.createdAt.split("T")[0]}</td>
                                <td className='p-4 text-right'>
                                    <div className='relative group inline-block'>
                                        <MoreHorizontal className='cursor-pointer' />
                                        <div className='absolute right-0 w-32 bg-white border border-gray-200 shadow-md rounded hidden group-hover:block z-10'>
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer p-2 hover:bg-gray-100 w-full'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ApplicantsTable
