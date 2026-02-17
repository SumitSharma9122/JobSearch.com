import React, { useState } from 'react'
import { MoreHorizontal, FileText, Calendar, Mail, Phone, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux';
import { updateApplicationStatus } from '../../redux/applicationSlice';
import api from '../../services/api';
// import { toast } from 'sonner';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const dispatch = useDispatch();
    const [updatingId, setUpdatingId] = useState(null);

    const statusHandler = async (status, id) => {
        try {
            setUpdatingId(id);
            const res = await api.post(`/application/status/${id}/update`, { status });
            if (res.data.success) {
                // toast.success(res.data.message);
                console.log("Status updated");
                dispatch(updateApplicationStatus({ id, status }));
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
        } finally {
            setUpdatingId(null);
        }
    }

    if (!applicants?.applications || applicants.applications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <Users size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No applicants yet</h3>
                <p className="text-gray-500 mt-1 max-w-sm">When candidates apply for this position, they will appear here.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className='w-full text-left border-collapse'>
                <thead className='bg-gray-50/50 border-b border-gray-100'>
                    <tr>
                        <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Candidate</th>
                        <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Contact</th>
                        <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Resume</th>
                        <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Applied Date</th>
                        <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Status</th>
                        <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right'>Action</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                    {applicants.applications.map((item) => {
                        const statusColor = item.status === 'accepted' ? 'bg-green-50 text-green-700 border-green-100'
                            : item.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-100'
                                : 'bg-blue-50 text-blue-700 border-blue-100';

                        return (
                            <tr key={item._id} className='group hover:bg-gray-50/50 transition-colors'>
                                <td className='px-6 py-4'>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm border border-brand-100">
                                            {item?.applicant?.profile?.profilePhoto ? (
                                                <img src={item.applicant.profile.profilePhoto} alt="" className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                item?.applicant?.name?.charAt(0).toUpperCase() || 'U'
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm">{item?.applicant?.name}</p>
                                            <p className="text-xs text-gray-500">Applicant ID: {item?.applicant?._id?.slice(-4)}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4'>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail size={14} className="text-gray-400" />
                                            {item?.applicant?.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone size={14} className="text-gray-400" />
                                            {item?.applicant?.phoneNumber || "NA"}
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4'>
                                    {item.applicant?.profile?.resume ? (
                                        <a
                                            href={item.applicant.profile.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors border border-gray-200"
                                        >
                                            <FileText size={14} /> Resume
                                        </a>
                                    ) : (
                                        <span className="text-xs text-gray-400 italic">No resume</span>
                                    )}
                                </td>
                                <td className='px-6 py-4'>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar size={14} className="text-gray-400" />
                                        {item?.appliedAt ? item.appliedAt.split("T")[0] : item?.createdAt ? item.createdAt.split("T")[0] : "NA"}
                                    </div>
                                </td>
                                <td className='px-6 py-4'>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColor} capitalize`}>
                                        {item.status || "Pending"}
                                    </span>
                                </td>
                                <td className='px-6 py-4 text-right'>
                                    <div className='flex items-center justify-end gap-2'>
                                        {item.status === 'pending' || !item.status ? (
                                            <>
                                                <button
                                                    onClick={() => statusHandler("accepted", item._id)}
                                                    disabled={updatingId === item._id}
                                                    className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors border border-green-200 disabled:opacity-50'
                                                >
                                                    {updatingId === item._id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                                                    <span>Accept</span>
                                                </button>
                                                <button
                                                    onClick={() => statusHandler("rejected", item._id)}
                                                    disabled={updatingId === item._id}
                                                    className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors border border-red-200 disabled:opacity-50'
                                                >
                                                    {updatingId === item._id ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                                                    <span>Reject</span>
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic font-normal">Status set</span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

// Helper component for empty state icon
const Users = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

export default ApplicantsTable
