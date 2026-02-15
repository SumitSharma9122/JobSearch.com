import React, { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import { Contact, Mail, Pen } from 'lucide-react'
import AppliedJobTable from '../../components/ui/AppliedJobTable'
import UpdateProfileDialog from '../../components/ui/UpdateProfileDialog'
import { useSelector } from 'react-redux'

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto my-5 px-4'>
                <div className="flex flex-col md:flex-row gap-5">
                    {/* Left Sidebar - Profile Snapshot */}
                    <div className="w-full md:w-1/3 space-y-5">
                        {/* Profile Card */}
                        <div className='bg-white rounded-2xl border border-gray-200 p-6 relative shadow-sm'>
                            <div className='absolute right-4 top-4'>
                                <button onClick={() => setOpen(true)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <Pen className='w-5 h-5 text-gray-500' />
                                </button>
                            </div>
                            <div className='flex flex-col items-center text-center'>
                                <div className='w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4'>
                                    <img
                                        src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                        alt="profile"
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <h1 className='font-bold text-xl mb-1'>{user?.fullname}</h1>
                                <p className='text-gray-500 text-sm mb-4'>{user?.profile?.bio || "Add a bio to highlight your skills"}</p>

                                {/* Profile Strength */}
                                <div className="w-full mt-2 mb-4">
                                    <div className="flex justify-between text-xs font-semibold mb-1">
                                        <span>Profile Strength</span>
                                        <span className="text-green-600">80%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                                    </div>
                                </div>

                                <button onClick={() => setOpen(true)} className='w-full border border-[#6A38C2] text-[#6A38C2] hover:bg-purple-50 py-2 rounded-full flex items-center justify-center gap-2 transition-colors'>
                                    <Pen size={16} /> Edit Profile
                                </button>
                            </div>

                            <div className='mt-6 space-y-3 pt-6 border-t border-gray-100'>
                                <div className='flex items-center gap-3 text-gray-600'>
                                    <Mail className="text-gray-400" size={18} />
                                    <span className="text-sm">{user?.email}</span>
                                </div>
                                <div className='flex items-center gap-3 text-gray-600'>
                                    <Contact className="text-gray-400" size={18} />
                                    <span className="text-sm">{user?.phoneNumber || "Add phone number"}</span>
                                </div>
                            </div>

                            <div className='mt-6 pt-6 border-t border-gray-100'>
                                <h2 className='font-semibold text-gray-800 mb-3'>Skills</h2>
                                <div className='flex flex-wrap gap-2'>
                                    {
                                        user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <span key={index} className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium'>{item}</span>) : <span className="text-sm text-gray-400">Add skills</span>
                                    }
                                </div>
                            </div>

                            <div className='mt-6 pt-6 border-t border-gray-100'>
                                <h2 className='font-semibold text-gray-800 mb-2'>Resume</h2>
                                {
                                    isResume ? <a target='_blank' href={user?.profile?.resume} className='text-blue-600 text-sm hover:underline block truncate'>{user?.profile?.resumeOriginalName}</a> : <span className="text-sm text-gray-400">Upload resume</span>
                                }
                            </div>
                        </div>
                    </div>

                    {/* Right Main Content */}
                    <div className="w-full md:w-2/3 space-y-5">
                        {/* Activity Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-sm text-gray-500 font-medium">Applied Jobs</h3>
                                <p className="text-2xl font-bold text-gray-800 mt-1">12</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-sm text-gray-500 font-medium">Profile Views</h3>
                                <p className="text-2xl font-bold text-gray-800 mt-1">48</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-sm text-gray-500 font-medium">Saved Jobs</h3>
                                <p className="text-2xl font-bold text-gray-800 mt-1">6</p>
                            </div>
                        </div>

                        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
                            <h1 className='font-bold text-lg mb-4 text-gray-800'>Application Status</h1>
                            <AppliedJobTable />
                        </div>
                    </div>
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

const isResume = true;

export default Profile
