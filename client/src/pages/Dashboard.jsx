import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Job from '../components/ui/Job'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { Home, Briefcase, Building2, BookOpen, TrendingUp, Eye, UserCheck, ChevronRight } from 'lucide-react'

const Dashboard = () => {
    const { user } = useSelector(store => store.auth);
    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('recommended');

    useGetAllJobs();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    if (!user) return null;

    // For employer/recruiter, redirect to admin
    if (user.role === 'employer' || user.role === 'recruiter') {
        return (
            <>
                <Navbar />
                <div className='bg-gray-50 min-h-screen'>
                    <div className='max-w-7xl mx-auto py-6 px-4'>
                        <div className='bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center'>
                            <h1 className='text-2xl font-bold mb-2'>Welcome back, {user.fullname}!</h1>
                            <p className='text-gray-500 mb-6'>Manage your job postings and applicants</p>
                            <div className='flex gap-4 justify-center'>
                                <Link to="/admin/companies" className='bg-[#6A38C2] text-white px-6 py-3 rounded-lg hover:bg-[#5b30a6] transition-colors font-medium'>Manage Companies</Link>
                                <Link to="/admin/jobs" className='border border-[#6A38C2] text-[#6A38C2] px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium'>Manage Jobs</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const tabs = [
        { key: 'recommended', label: `Recommended` },
        { key: 'applied', label: `Applied` },
        { key: 'saved', label: `Saved` },
    ];

    return (
        <div className='bg-[#f5f5f5] min-h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto py-6 px-4'>
                <div className='flex flex-col lg:flex-row gap-5'>

                    {/* ===== LEFT SIDEBAR ===== */}
                    <div className='w-full lg:w-[260px] shrink-0 space-y-4'>
                        {/* Profile Card */}
                        <div className='bg-white rounded-xl p-5 shadow-sm border border-gray-100'>
                            <div className='flex flex-col items-center text-center'>
                                <div className='relative mb-3'>
                                    <div className='w-20 h-20 rounded-full overflow-hidden border-[3px] border-blue-500 shadow-md'>
                                        <img
                                            src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                            alt="profile"
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                    {/* Profile completion circle */}
                                    <div className='absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-white'>
                                        80%
                                    </div>
                                </div>
                                <h2 className='font-bold text-base'>{user?.fullname}</h2>
                                <p className='text-xs text-gray-500 mt-0.5'>{user?.profile?.bio || "Add headline"}</p>
                                <p className='text-[11px] text-gray-400 mt-1'>Last updated 2d ago</p>
                                <Link to="/profile" className='mt-3 text-blue-600 text-sm font-semibold hover:underline'>View profile</Link>
                            </div>
                        </div>

                        {/* Profile Performance */}
                        <div className='bg-white rounded-xl p-5 shadow-sm border border-gray-100'>
                            <h3 className='font-semibold text-sm mb-3'>Profile performance</h3>
                            <div className='flex justify-between'>
                                <div className='text-center'>
                                    <div className='flex items-center gap-1 justify-center'>
                                        <Eye size={14} className='text-blue-500' />
                                        <span className='text-lg font-bold text-gray-800'>61</span>
                                        <TrendingUp size={12} className='text-green-500' />
                                    </div>
                                    <p className='text-[11px] text-gray-500 mt-0.5'>Search appearances</p>
                                </div>
                                <div className='w-px bg-gray-200'></div>
                                <div className='text-center'>
                                    <div className='flex items-center gap-1 justify-center'>
                                        <UserCheck size={14} className='text-orange-500' />
                                        <span className='text-lg font-bold text-gray-800'>14</span>
                                        <TrendingUp size={12} className='text-green-500' />
                                    </div>
                                    <p className='text-[11px] text-gray-500 mt-0.5'>Recruiter actions</p>
                                </div>
                            </div>
                            <div className='mt-4 bg-blue-50 rounded-lg p-3 flex items-center gap-2 cursor-pointer hover:bg-blue-100 transition-colors'>
                                <span className='text-xl'>⚡</span>
                                <div>
                                    <p className='text-xs font-semibold text-gray-800'>Get 3X boost to your profile performance</p>
                                </div>
                                <ChevronRight size={14} className='text-gray-400 ml-auto' />
                            </div>
                        </div>

                        {/* Quick Navigation */}
                        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
                            <Link to="/dashboard" className='flex items-center gap-3 px-5 py-3 hover:bg-gray-50 border-l-4 border-blue-600 bg-blue-50 text-blue-700 font-medium text-sm'>
                                <Home size={18} /> My home
                            </Link>
                            <Link to="/jobs" className='flex items-center gap-3 px-5 py-3 hover:bg-gray-50 border-l-4 border-transparent text-gray-700 text-sm'>
                                <Briefcase size={18} /> Jobs
                            </Link>
                            <Link to="/browse" className='flex items-center gap-3 px-5 py-3 hover:bg-gray-50 border-l-4 border-transparent text-gray-700 text-sm'>
                                <Building2 size={18} /> Companies
                            </Link>
                            <Link to="/profile" className='flex items-center gap-3 px-5 py-3 hover:bg-gray-50 border-l-4 border-transparent text-gray-700 text-sm'>
                                <BookOpen size={18} /> My Profile
                            </Link>
                        </div>
                    </div>

                    {/* ===== CENTER CONTENT ===== */}
                    <div className='flex-1 space-y-5'>
                        {/* Recommended Jobs Section */}
                        <div className='bg-white rounded-xl shadow-sm border border-gray-100'>
                            <div className='flex items-center justify-between px-5 pt-5 pb-0'>
                                <h2 className='font-bold text-lg'>Recommended jobs for you</h2>
                                <Link to="/browse" className='text-blue-600 text-sm font-medium hover:underline'>View all</Link>
                            </div>
                            {/* Tabs */}
                            <div className='flex gap-0 px-5 mt-3 border-b border-gray-200'>
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${activeTab === tab.key
                                                ? 'text-blue-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {tab.label}
                                        {activeTab === tab.key && (
                                            <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t'></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            {/* Job Cards Grid */}
                            <div className='p-5'>
                                {allJobs.length > 0 ? (
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        {allJobs.slice(0, 6).map((job) => (
                                            <div key={job._id} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer' onClick={() => navigate(`/description/${job._id}`)}>
                                                <div className='flex justify-between items-start mb-2'>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center p-1 bg-white'>
                                                            <img src={job?.company?.logo || "https://png.pngtree.com/png-vector/20220513/ourmid/pngtree-hand-drawn-doodle-start-up-logo-png-image_4590932.png"} alt="logo" className='w-full h-full object-contain' />
                                                        </div>
                                                        <div>
                                                            <h3 className='font-semibold text-sm'>{job?.title}</h3>
                                                            <p className='text-xs text-gray-500'>{job?.company?.name}</p>
                                                        </div>
                                                    </div>
                                                    <span className='text-[11px] text-gray-400'>{Math.floor((Date.now() - new Date(job?.createdAt)) / (1000 * 60 * 60 * 24))}d ago</span>
                                                </div>
                                                <div className='flex items-center gap-3 text-xs text-gray-500 mt-2'>
                                                    <span>📍 {job?.location}</span>
                                                    <span>💰 ₹{job?.salary} LPA</span>
                                                </div>
                                                <div className='flex items-center gap-1.5 mt-3 flex-wrap'>
                                                    <span className='bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-medium'>{job?.jobType}</span>
                                                    <span className='bg-green-50 text-green-600 px-2 py-0.5 rounded text-[10px] font-medium'>{job?.experienceLevel}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='text-center py-10'>
                                        <p className='text-gray-400 text-sm'>No recommended jobs yet. Update your profile to get matches!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Early Access Section */}
                        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-5'>
                            <div className='flex items-center justify-between mb-4'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-xl'>🏆</span>
                                    <div>
                                        <h2 className='font-bold text-base'>Early access roles from top companies</h2>
                                        <p className='text-xs text-gray-500'>See what recruiters are searching for</p>
                                    </div>
                                </div>
                                <Link to="/browse" className='text-blue-600 text-sm font-medium hover:underline'>View all</Link>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {allJobs.slice(0, 2).map((job) => (
                                    <div key={job._id} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer' onClick={() => navigate(`/description/${job._id}`)}>
                                        <h3 className='font-semibold text-sm'>{job?.title}</h3>
                                        <p className='text-xs text-gray-500 mt-0.5'>{job?.company?.name}</p>
                                        <div className='flex items-center gap-3 mt-2 text-xs text-gray-500'>
                                            <span>⭐ 3.5+</span>
                                            <span>📍 {job?.location}</span>
                                        </div>
                                        <div className='flex items-center gap-3 mt-1.5 text-xs text-gray-500'>
                                            <span>💼 {job?.experienceLevel} Yrs</span>
                                            <span>💰 ₹{job?.salary} LPA</span>
                                        </div>
                                        <button className='mt-3 text-blue-600 text-xs font-semibold border border-blue-200 px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors'>
                                            Share interest
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ===== RIGHT SIDEBAR ===== */}
                    <div className='w-full lg:w-[260px] shrink-0 space-y-4'>
                        {/* Job Search Journey */}
                        <div className='bg-white rounded-xl p-5 shadow-sm border border-gray-100'>
                            <p className='text-red-500 text-xs font-semibold mb-1'>Needs attention</p>
                            <h3 className='font-bold text-sm mb-3'>Where are you in your job search journey?</h3>
                            <div className='flex flex-wrap gap-2'>
                                {[
                                    "Actively searching jobs",
                                    "Preparing for interviews",
                                    "Appearing for interviews",
                                    "Received a job offer",
                                    "Casually exploring jobs",
                                    "Not looking for jobs"
                                ].map((tag, i) => (
                                    <button
                                        key={i}
                                        className='text-xs border border-gray-300 rounded-full px-3 py-1.5 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-600'
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Safety Tips */}
                        <div className='bg-white rounded-xl p-5 shadow-sm border border-gray-100'>
                            <div className='flex items-start gap-3'>
                                <span className='text-3xl'>🛡️</span>
                                <div>
                                    <h3 className='font-bold text-sm'>Never pay anyone to get a job</h3>
                                    <p className='text-xs text-gray-500 mt-1'>Fraudsters may ask you to invest money either to earn more OR to get you a job. Never make such payments.</p>
                                    <a href="#" className='text-blue-600 text-xs font-semibold mt-2 inline-block hover:underline'>Learn more</a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className='bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl p-5 shadow-sm text-white'>
                            <h3 className='font-bold text-sm mb-3'>Your week at a glance</h3>
                            <div className='space-y-3'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-xs opacity-90'>Applications sent</span>
                                    <span className='font-bold'>5</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-xs opacity-90'>Profile views</span>
                                    <span className='font-bold'>23</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-xs opacity-90'>Search appearances</span>
                                    <span className='font-bold'>61</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
