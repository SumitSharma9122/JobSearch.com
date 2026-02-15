import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar'
import useGetSingleJob from '../../hooks/useGetSingleJob';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { MapPin, Briefcase, IndianRupee, Clock, Users, GraduationCap, CheckCircle, Loader2 } from 'lucide-react';

const JobDetails = () => {
    const params = useParams();
    const jobId = params.id;
    const { singleJob } = useSelector(store => store.job);
    const { user: authUser } = useSelector(store => store.auth);

    useGetSingleJob(jobId);

    const [isApplied, setIsApplied] = useState(false);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        if (singleJob?.applications?.some(application => application.applicant === authUser?._id)) {
            setIsApplied(true);
        } else {
            setIsApplied(false);
        }
    }, [singleJob, authUser]);

    const applyJobHandler = async () => {
        try {
            setApplying(true);
            const res = await api.get(`/application/apply/${jobId}`);
            if (res.data.success) {
                setIsApplied(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setApplying(false);
        }
    }

    // Format salary
    const formatSalary = (sal) => {
        if (!sal) return '0';
        const num = Number(sal);
        if (num >= 100000) return (num / 100000).toFixed(1).replace(/\.0$/, '');
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num;
    }

    if (!singleJob) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50/20'>
                <Navbar />
                <div className='flex items-center justify-center py-32'>
                    <Loader2 className='animate-spin text-brand-500' size={32} />
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50/20'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-8'>
                {/* Header Card */}
                <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in-up'>
                    <div className='h-2 bg-gradient-to-r from-brand-500 via-blue-500 to-brand-400'></div>
                    <div className='p-6 md:p-8'>
                        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                            <div className='flex items-center gap-4'>
                                <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-50 to-blue-50 border border-gray-100 flex items-center justify-center p-3'>
                                    {singleJob?.company?.logo ? (
                                        <img src={singleJob.company.logo} alt="logo" className='w-full h-full object-contain' />
                                    ) : (
                                        <span className='text-2xl font-bold text-brand-500'>{singleJob?.company?.name?.charAt(0) || 'C'}</span>
                                    )}
                                </div>
                                <div>
                                    <h1 className='text-2xl font-bold text-gray-800'>{singleJob?.title}</h1>
                                    <p className='text-gray-500 mt-0.5'>{singleJob?.company?.name}</p>
                                </div>
                            </div>
                            <button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied || applying}
                                className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${isApplied
                                    ? 'bg-green-50 text-green-600 border-2 border-green-200 cursor-not-allowed'
                                    : 'btn-primary bg-brand-500 text-white hover:bg-brand-600'
                                    }`}
                            >
                                {applying ? (
                                    <><Loader2 size={16} className='animate-spin' /> Applying...</>
                                ) : isApplied ? (
                                    <><CheckCircle size={16} /> Already Applied</>
                                ) : (
                                    'Apply Now'
                                )}
                            </button>
                        </div>

                        {/* Quick Info Tags */}
                        <div className='flex items-center gap-3 mt-6 flex-wrap'>
                            <span className='tag-pill bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1'>
                                <Users size={12} /> {singleJob?.position || 1} Positions
                            </span>
                            <span className='tag-pill bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1'>
                                <Briefcase size={12} /> {singleJob?.jobType}
                            </span>
                            <span className='tag-pill bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1'>
                                <IndianRupee size={12} /> {formatSalary(singleJob?.salary)} LPA
                            </span>
                            <span className='tag-pill bg-purple-50 text-purple-600 border border-purple-100 flex items-center gap-1'>
                                <GraduationCap size={12} /> {singleJob?.experienceLevel || 'Not specified'}
                            </span>
                            <span className='tag-pill bg-gray-50 text-gray-600 border border-gray-200 flex items-center gap-1'>
                                <MapPin size={12} /> {singleJob?.location}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-5'>
                    {/* Main Content */}
                    <div className='md:col-span-2 space-y-5'>
                        {/* Description */}
                        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fade-in-up stagger-2 opacity-0'>
                            <h2 className='font-bold text-lg text-gray-800 mb-3'>Job Description</h2>
                            <p className='text-gray-600 text-sm leading-relaxed whitespace-pre-line'>{singleJob?.description}</p>
                        </div>

                        {/* Requirements */}
                        {singleJob?.requirements && singleJob.requirements.length > 0 && singleJob.requirements[0] !== '' && (
                            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fade-in-up stagger-3 opacity-0'>
                                <h2 className='font-bold text-lg text-gray-800 mb-3'>Requirements</h2>
                                <div className='flex flex-wrap gap-2'>
                                    {singleJob.requirements.map((req, i) => (
                                        <span key={i} className='tag-pill bg-brand-50 text-brand-600 border border-brand-100'>{req}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className='space-y-5'>
                        {/* Job Summary */}
                        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fade-in-up stagger-3 opacity-0'>
                            <h2 className='font-bold text-sm text-gray-800 mb-4 uppercase tracking-wider'>Job Summary</h2>
                            <div className='space-y-4'>
                                {[
                                    { label: 'Role', value: singleJob?.title },
                                    { label: 'Location', value: singleJob?.location },
                                    { label: 'Job Type', value: singleJob?.jobType },
                                    { label: 'Experience', value: singleJob?.experienceLevel || 'Not specified' },
                                    { label: 'Salary', value: `₹${formatSalary(singleJob?.salary)} LPA` },
                                    { label: 'Applicants', value: singleJob?.applications?.length || 0 },
                                    { label: 'Posted', value: singleJob?.createdAt?.split("T")[0] },
                                ].map((item, i) => (
                                    <div key={i} className='flex justify-between items-center'>
                                        <span className='text-xs text-gray-400'>{item.label}</span>
                                        <span className='text-sm font-medium text-gray-700'>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails
