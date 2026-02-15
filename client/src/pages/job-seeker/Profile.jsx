import React, { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import { Contact, Mail, Pen, MapPin, Briefcase, FileText, Award, Eye, Bookmark, Send } from 'lucide-react'
import AppliedJobTable from '../../components/ui/AppliedJobTable'
import UpdateProfileDialog from '../../components/ui/UpdateProfileDialog'
import { useSelector } from 'react-redux'

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    const hasResume = user?.profile?.resume && user?.profile?.resume.length > 0;

    // Calculate profile completion
    const calcCompletion = () => {
        let score = 20; // base for having an account
        if (user?.profile?.bio) score += 20;
        if (user?.profile?.skills?.length > 0) score += 20;
        if (hasResume) score += 20;
        if (user?.email) score += 10;
        if (user?.phoneNumber) score += 10;
        return score;
    };
    const completion = calcCompletion();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50/30">
            <Navbar />
            <div className='max-w-6xl mx-auto py-8 px-4'>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Sidebar */}
                    <div className="w-full md:w-[340px] space-y-5 animate-fade-in-up">
                        {/* Profile Card */}
                        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
                            {/* Cover gradient */}
                            <div className='h-24 bg-gradient-to-r from-brand-500 via-blue-500 to-brand-400 relative'>
                                <button onClick={() => setOpen(true)} className="absolute right-3 top-3 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors">
                                    <Pen className='w-4 h-4 text-white' />
                                </button>
                            </div>

                            <div className='px-6 pb-6'>
                                {/* Avatar */}
                                <div className='-mt-12 mb-4 flex justify-center'>
                                    <div className='w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg'>
                                        <img
                                            src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                            alt="profile"
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                </div>

                                <div className='text-center'>
                                    <h1 className='font-bold text-xl text-gray-800'>{user?.fullname || user?.name}</h1>
                                    <p className='text-gray-400 text-sm mt-1 px-4'>{user?.profile?.bio || "Add a bio to highlight yourself"}</p>
                                </div>

                                {/* Profile Strength */}
                                <div className="mt-5 bg-gray-50 rounded-xl p-4">
                                    <div className="flex justify-between text-xs font-semibold mb-2">
                                        <span className='text-gray-600'>Profile Strength</span>
                                        <span className={completion >= 80 ? "text-green-600" : completion >= 50 ? "text-amber-500" : "text-red-500"}>{completion}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div className={`h-2 rounded-full transition-all duration-1000 ease-out ${completion >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : completion >= 50 ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-red-400 to-red-500'}`} style={{ width: `${completion}%` }}></div>
                                    </div>
                                </div>

                                <button onClick={() => setOpen(true)} className='btn-primary w-full mt-4 bg-brand-500 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-brand-600'>
                                    <Pen size={16} /> Edit Profile
                                </button>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-fade-in-up stagger-2 opacity-0'>
                            <h2 className='font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider'>Contact</h2>
                            <div className='space-y-3'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center'><Mail size={16} className='text-blue-500' /></div>
                                    <span className="text-sm text-gray-600">{user?.email}</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <div className='w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center'><Contact size={16} className='text-green-500' /></div>
                                    <span className="text-sm text-gray-600">{user?.phoneNumber || "Add phone number"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-fade-in-up stagger-3 opacity-0'>
                            <h2 className='font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider'>Skills</h2>
                            <div className='flex flex-wrap gap-2'>
                                {user?.profile?.skills?.length > 0 ?
                                    user.profile.skills.map((item, index) => (
                                        <span key={index} className='tag-pill bg-brand-50 text-brand-600 border border-brand-100'>{item}</span>
                                    )) :
                                    <p className="text-sm text-gray-400">Add your skills to stand out</p>
                                }
                            </div>
                        </div>

                        {/* Resume */}
                        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-fade-in-up stagger-4 opacity-0'>
                            <h2 className='font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider'>Resume</h2>
                            {hasResume ? (
                                <a target='_blank' href={user.profile.resume} className='flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group'>
                                    <div className='w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center'>
                                        <FileText size={18} className='text-white' />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-sm font-medium text-blue-700 truncate'>{user.profile.resumeOriginalName || "Resume"}</p>
                                        <p className='text-xs text-blue-400'>Click to preview</p>
                                    </div>
                                </a>
                            ) : (
                                <div className='p-3 bg-gray-50 rounded-xl text-center'>
                                    <p className="text-sm text-gray-400">Upload your resume to apply faster</p>
                                    <button onClick={() => setOpen(true)} className='text-sm text-brand-500 font-medium mt-1 hover:underline'>Upload now</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Main Content */}
                    <div className="flex-1 space-y-5 animate-fade-in-up stagger-2 opacity-0">
                        {/* Activity Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { icon: <Send size={20} />, num: "12", label: "Applied Jobs", color: "text-blue-500 bg-blue-50", grad: "from-blue-500 to-cyan-400" },
                                { icon: <Eye size={20} />, num: "48", label: "Profile Views", color: "text-purple-500 bg-purple-50", grad: "from-purple-500 to-violet-400" },
                                { icon: <Bookmark size={20} />, num: "6", label: "Saved Jobs", color: "text-amber-500 bg-amber-50", grad: "from-amber-500 to-orange-400" },
                            ].map((stat, i) => (
                                <div key={i} className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover-lift relative overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${stat.grad} opacity-5 rounded-bl-full`}></div>
                                    <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        {stat.icon}
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800">{stat.num}</p>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Applied Jobs Table */}
                        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                            <div className='p-6 border-b border-gray-100'>
                                <h2 className='font-bold text-lg text-gray-800 flex items-center gap-2'>
                                    <Briefcase size={20} className='text-brand-500' />
                                    Application Status
                                </h2>
                                <p className='text-sm text-gray-400 mt-1'>Track your recent job applications</p>
                            </div>
                            <div className='p-4'>
                                <AppliedJobTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
