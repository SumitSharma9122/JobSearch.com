import React, { useState } from 'react'
import { Bookmark, BookmarkCheck, MapPin, IndianRupee, ArrowRight, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);

    const daysAgo = (mongodbTime) => {
        const diff = Math.floor((Date.now() - new Date(mongodbTime)) / (1000 * 60 * 60 * 24));
        return diff;
    }

    return (
        <div className='group bg-white p-6 rounded-2xl border border-gray-100 hover-lift relative overflow-hidden'>
            {/* Top gradient accent */}
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left'></div>

            {/* Header */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 text-gray-400'>
                    <Clock size={14} />
                    <p className='text-xs'>{daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}</p>
                </div>
                <button onClick={() => setSaved(!saved)} className={`p-2 rounded-full transition-all duration-200 ${saved ? 'bg-brand-50 text-brand-500' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                    {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                </button>
            </div>

            {/* Company */}
            <div className='flex items-center gap-3 mt-3'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform'>
                    <img src={job?.company?.logo || "https://png.pngtree.com/png-vector/20220513/ourmid/pngtree-hand-drawn-doodle-start-up-logo-png-image_4590932.png"} alt="logo" className='w-full h-full object-contain' />
                </div>
                <div>
                    <h3 className='font-semibold text-gray-800 group-hover:text-brand-500 transition-colors'>{job?.company?.name}</h3>
                    <p className='text-xs text-gray-400 flex items-center gap-1'><MapPin size={12} /> {job?.location || "India"}</p>
                </div>
            </div>

            {/* Title & Description */}
            <div className='mt-4'>
                <h2 className='font-bold text-lg text-gray-800'>{job?.title}</h2>
                <p className='text-sm text-gray-500 mt-1 line-clamp-2'>{job?.description}</p>
            </div>

            {/* Tags */}
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <span className='tag-pill bg-blue-50 text-blue-600 border border-blue-100'>{job?.position || 1} Positions</span>
                <span className='tag-pill bg-emerald-50 text-emerald-600 border border-emerald-100'>{job?.jobType || "Full-time"}</span>
                <span className='tag-pill bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1'>
                    <IndianRupee size={11} /> {job?.salary || 0} LPA
                </span>
            </div>

            {/* Skills */}
            <div className='flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar'>
                {(job?.requirements || ["React", "Node.js", "MongoDB"]).slice(0, 4).map((skill, i) => (
                    <span key={i} className='bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded text-[10px] whitespace-nowrap'>{skill}</span>
                ))}
            </div>

            {/* Actions */}
            <div className='flex items-center gap-3 mt-5 pt-4 border-t border-gray-50'>
                <button onClick={() => navigate(`/description/${job?._id}`)} className='flex-1 py-2.5 rounded-xl text-sm font-medium border-2 border-brand-500 text-brand-500 hover:bg-brand-50 transition-all duration-200 flex items-center justify-center gap-1'>
                    View Details <ArrowRight size={14} />
                </button>
                <button onClick={() => setSaved(!saved)} className='flex-1 btn-primary py-2.5 rounded-xl text-sm font-medium bg-brand-500 text-white hover:bg-brand-600 transition-all'>
                    {saved ? "Saved ✓" : "Save Job"}
                </button>
            </div>
        </div>
    )
}

export default Job
