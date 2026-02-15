import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/authSlice';
import api from '../../services/api';
import { LogOut, User, User2, Building2, Briefcase, Bell, Search } from 'lucide-react';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [showNotif, setShowNotif] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await api.get("/user/logout");
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const searchHandler = (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            navigate(`/browse?q=${searchText}`);
        }
    }

    return (
        <div className='bg-white shadow-sm sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div className='flex items-center gap-8'>
                    <Link to={user ? "/dashboard" : "/"}>
                        <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                    </Link>
                    <ul className='hidden md:flex font-medium items-center gap-5 text-sm'>
                        {
                            user && (user.role === 'employer' || user.role === 'recruiter') ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-[#6A38C2] transition-colors">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-[#6A38C2] transition-colors">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    {user && <li><Link to="/dashboard" className="hover:text-[#6A38C2] transition-colors">My Home</Link></li>}
                                    <li><Link to="/jobs" className="hover:text-[#6A38C2] transition-colors">Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-[#6A38C2] transition-colors">Companies</Link></li>
                                </>
                            )
                        }
                    </ul>
                </div>

                <div className='flex items-center gap-4'>
                    {/* Search Bar */}
                    {user && (
                        <form onSubmit={searchHandler} className='hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2'>
                            <Search size={16} className='text-gray-400' />
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search jobs here"
                                className='bg-transparent outline-none text-sm w-40 placeholder-gray-400'
                            />
                        </form>
                    )}

                    {/* Notification Bell */}
                    {user && (
                        <div className='relative'>
                            <button onClick={() => setShowNotif(!showNotif)} className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'>
                                <Bell size={20} className='text-gray-600' />
                                <span className='absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center'>3</span>
                            </button>
                            {showNotif && (
                                <div className='absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50'>
                                    <div className='px-4 py-2 border-b border-gray-100'>
                                        <h3 className='font-semibold text-sm'>Notifications</h3>
                                    </div>
                                    <div className='max-h-60 overflow-y-auto'>
                                        <div className='px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50'>
                                            <p className='text-sm font-medium text-gray-800'>New job match found!</p>
                                            <p className='text-xs text-gray-500 mt-0.5'>A new Frontend Developer role matches your profile</p>
                                            <p className='text-xs text-blue-500 mt-1'>2 hours ago</p>
                                        </div>
                                        <div className='px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50'>
                                            <p className='text-sm font-medium text-gray-800'>Profile viewed by recruiter</p>
                                            <p className='text-xs text-gray-500 mt-0.5'>A recruiter from Accenture viewed your profile</p>
                                            <p className='text-xs text-blue-500 mt-1'>5 hours ago</p>
                                        </div>
                                        <div className='px-4 py-3 hover:bg-gray-50 cursor-pointer'>
                                            <p className='text-sm font-medium text-gray-800'>Application update</p>
                                            <p className='text-xs text-gray-500 mt-0.5'>Your application for Software Engineer was shortlisted</p>
                                            <p className='text-xs text-blue-500 mt-1'>1 day ago</p>
                                        </div>
                                    </div>
                                    <div className='px-4 py-2 border-t border-gray-100 text-center'>
                                        <span className='text-xs text-blue-600 cursor-pointer hover:underline'>View all notifications</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login"><button className='bg-transparent text-black border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm'>Login</button></Link>
                            <Link to="/signup"><button className='bg-[#6A38C2] text-white px-4 py-2 rounded-md hover:bg-[#5b30a6] transition-colors text-sm'>Register</button></Link>
                        </div>
                    ) : (
                        <div className='relative cursor-pointer' onClick={() => setOpen(!open)}>
                            <div className='flex items-center gap-2'>
                                <div className='w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-blue-500'>
                                    {user.profile?.profilePhoto ? <img src={user.profile.profilePhoto} alt="profile" className='w-full h-full object-cover' /> : <User2 size={18} />}
                                </div>
                            </div>
                            {
                                open && (
                                    <div className='absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50'>
                                        <div className='flex gap-3 items-center px-4 py-3'>
                                            <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300'>
                                                {user.profile?.profilePhoto ? <img src={user.profile.profilePhoto} alt="profile" className='w-full h-full object-cover' /> : <User2 size={18} />}
                                            </div>
                                            <div>
                                                <h4 className='font-semibold text-sm'>{user.fullname || user.name}</h4>
                                                <p className='text-xs text-gray-500 max-w-[140px] truncate'>{user.profile?.bio || "No bio"}</p>
                                            </div>
                                        </div>
                                        <div className='border-t border-gray-100 my-1'></div>

                                        {
                                            user.role === 'job_seeker' && (
                                                <Link to="/profile" className='flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm'>
                                                    <User size={15} />
                                                    <span>View Profile</span>
                                                </Link>
                                            )
                                        }
                                        {
                                            (user.role === 'employer' || user.role === 'recruiter') && (
                                                <>
                                                    <Link to="/admin/companies" className='flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm'>
                                                        <Building2 size={15} />
                                                        <span>Companies</span>
                                                    </Link>
                                                    <Link to="/admin/jobs" className='flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm'>
                                                        <Briefcase size={15} />
                                                        <span>Jobs</span>
                                                    </Link>
                                                </>
                                            )
                                        }

                                        <div className='border-t border-gray-100 my-1'></div>
                                        <div onClick={logoutHandler} className='flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer text-red-600 text-sm'>
                                            <LogOut size={15} />
                                            <span>Logout</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Navbar