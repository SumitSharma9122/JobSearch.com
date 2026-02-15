import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MapPin, IndianRupee, Clock, ArrowRight } from 'lucide-react'
import useGetAllJobs from '../../hooks/useGetAllJobs'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const daysAgo = Math.floor((Date.now() - new Date(job?.createdAt)) / (1000 * 60 * 60 * 24));

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='group bg-white p-6 rounded-2xl border border-gray-100 cursor-pointer hover-lift relative overflow-hidden'
        >
            {/* Gradient accent bar */}
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left'></div>

            <div className='flex items-start justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-brand-50 to-purple-50 border border-brand-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform'>
                        <img
                            src={job?.company?.logo || "https://png.pngtree.com/png-vector/20220513/ourmid/pngtree-hand-drawn-doodle-start-up-logo-png-image_4590932.png"}
                            alt="logo"
                            className='w-full h-full object-contain'
                        />
                    </div>
                    <div>
                        <h3 className='font-semibold text-gray-800 group-hover:text-brand-500 transition-colors'>{job?.company?.name || "Company"}</h3>
                        <p className='text-xs text-gray-400 flex items-center gap-1'><MapPin size={12} /> {job?.location || "India"}</p>
                    </div>
                </div>
                <span className='text-[11px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full'>{daysAgo === 0 ? "Today" : `${daysAgo}d ago`}</span>
            </div>

            <div className='mt-4'>
                <h2 className='font-bold text-lg text-gray-800'>{job?.title}</h2>
                <p className='text-sm text-gray-500 mt-1 line-clamp-2'>{job?.description || "An exciting opportunity to work with cutting-edge technology."}</p>
            </div>

            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <span className='tag-pill bg-blue-50 text-blue-600 border border-blue-100'>{job?.position || 1} Positions</span>
                <span className='tag-pill bg-emerald-50 text-emerald-600 border border-emerald-100'>{job?.jobType || "Full-time"}</span>
                <span className='tag-pill bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1'>
                    <IndianRupee size={11} /> {job?.salary || 0} LPA
                </span>
            </div>

            <div className='flex items-center justify-between mt-5 pt-4 border-t border-gray-50'>
                <div className='flex items-center gap-1.5 overflow-x-auto no-scrollbar'>
                    {(job?.requirements || ["React", "Node.js", "MongoDB"]).slice(0, 3).map((skill, i) => (
                        <span key={i} className='bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px] whitespace-nowrap'>{skill}</span>
                    ))}
                </div>
                <div className='text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-sm font-medium'>
                    Apply <ArrowRight size={14} />
                </div>
            </div>
        </div>
    )
}

const LatestJobs = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-6xl mx-auto px-4 py-16'>
            <div className='flex items-center justify-between mb-10'>
                <div className='animate-fade-in'>
                    <h2 className='text-3xl font-bold text-gray-800'>
                        <span className='gradient-text'>Latest & Top</span> Job Openings
                    </h2>
                    <p className='text-gray-500 mt-2'>Hand-picked opportunities updated daily</p>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {allJobs && allJobs.length > 0 ? (
                    allJobs.slice(0, 6).map((job, index) => (
                        <div key={job._id} className={`animate-fade-in-up opacity-0 stagger-${Math.min(index + 1, 6)}`}>
                            <LatestJobCards job={job} />
                        </div>
                    ))
                ) : (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className='bg-white p-6 rounded-2xl border border-gray-100 animate-pulse'>
                            <div className='flex items-center gap-3'>
                                <div className='w-12 h-12 rounded-xl bg-gray-200'></div>
                                <div>
                                    <div className='h-4 w-24 bg-gray-200 rounded'></div>
                                    <div className='h-3 w-16 bg-gray-100 rounded mt-2'></div>
                                </div>
                            </div>
                            <div className='h-5 w-40 bg-gray-200 rounded mt-4'></div>
                            <div className='h-4 w-full bg-gray-100 rounded mt-2'></div>
                            <div className='flex gap-2 mt-4'>
                                <div className='h-6 w-20 bg-gray-100 rounded-full'></div>
                                <div className='h-6 w-20 bg-gray-100 rounded-full'></div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default LatestJobs
