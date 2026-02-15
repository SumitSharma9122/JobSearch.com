import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../services/api'
import { setUser } from '../../redux/authSlice'
import { setSearchedQuery } from '../../redux/jobSlice'
import { LogOut, User, Settings, Bell, Search, ChevronDown, X, Menu, Briefcase, Home, Building2, BookOpen } from 'lucide-react'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const dropdownRef = useRef(null);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
            dispatch(setSearchedQuery(searchText));
            navigate("/browse");
        }
    }


    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-white/95 backdrop-blur-sm'}`}>
            <div className='max-w-7xl mx-auto px-4 flex items-center justify-between h-16'>
                {/* Logo */}
                <Link to="/" className='flex items-center gap-1 group'>
                    <span className='text-2xl font-extrabold tracking-tight'>
                        <span className='text-gray-800 group-hover:text-brand-600 transition-colors'>Job</span>
                        <span className='gradient-text'>Portal</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className='hidden md:flex items-center gap-6'>
                    {/* Nav Links */}
                    <ul className='flex items-center gap-1'>
                        {user && (user.role === 'employer' || user.role === 'recruiter') ? (
                            <>
                                <li><Link to="/admin/companies" className='px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-500 rounded-lg hover:bg-brand-50 transition-all duration-200'>Companies</Link></li>
                                <li><Link to="/admin/jobs" className='px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-500 rounded-lg hover:bg-brand-50 transition-all duration-200'>Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/" className='px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-500 rounded-lg hover:bg-brand-50 transition-all duration-200'>Home</Link></li>
                                <li><Link to="/jobs" className='px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-500 rounded-lg hover:bg-brand-50 transition-all duration-200'>Jobs</Link></li>
                                <li><Link to="/browse" className='px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-500 rounded-lg hover:bg-brand-50 transition-all duration-200'>Browse</Link></li>
                            </>
                        )}
                    </ul>

                    {/* Search Bar */}
                    {user && (
                        <form onSubmit={searchHandler} className='flex items-center bg-gray-100/80 rounded-full px-4 py-2 gap-2 hover:bg-gray-100 transition-colors focus-within:ring-2 focus-within:ring-brand-200 focus-within:bg-white'>
                            <Search size={16} className='text-gray-400' />
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search jobs..."
                                className='bg-transparent outline-none text-sm w-36 placeholder-gray-400 border-none focus:ring-0 focus:shadow-none'
                                style={{ boxShadow: 'none' }}
                            />
                        </form>
                    )}

                    {user && (
                        <button onClick={() => navigate('/notifications')} className='relative p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105'>
                            <Bell size={20} className='text-gray-600' />
                            <span className='absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce-subtle'>3</span>
                        </button>
                    )}

                    {/* User Section */}
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login" className='px-5 py-2 text-sm font-medium text-gray-700 hover:text-brand-500 rounded-full border border-gray-200 hover:border-brand-200 transition-all duration-200'>
                                Login
                            </Link>
                            <Link to="/signup" className='btn-primary px-5 py-2 text-sm font-medium text-white bg-brand-500 rounded-full hover:bg-brand-600'>
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className='relative' ref={dropdownRef}>
                            <button onClick={() => setShowDropdown(!showDropdown)} className='flex items-center gap-2 hover:bg-gray-100 rounded-full pl-1 pr-3 py-1 transition-all duration-200'>
                                <div className='w-8 h-8 rounded-full overflow-hidden ring-2 ring-brand-100 ring-offset-1'>
                                    <img src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="avatar" className='w-full h-full object-cover' />
                                </div>
                                <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {showDropdown && (
                                <div className='absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in-down'>
                                    <div className='px-4 py-3 border-b border-gray-100'>
                                        <p className='font-semibold text-sm text-gray-800'>{user?.fullname || user?.name}</p>
                                        <p className='text-xs text-gray-400'>{user?.email}</p>
                                    </div>
                                    <Link to="/profile" onClick={() => setShowDropdown(false)} className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-500 transition-colors'>
                                        <User size={16} /> View Profile
                                    </Link>
                                    <Link to="/settings" onClick={() => setShowDropdown(false)} className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-500 transition-colors'>
                                        <Settings size={16} /> Settings
                                    </Link>
                                    {(user.role === 'employer' || user.role === 'recruiter') && (
                                        <Link to="/admin/jobs" onClick={() => setShowDropdown(false)} className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-500 transition-colors'>
                                            <Settings size={16} /> Dashboard
                                        </Link>
                                    )}
                                    <div className='border-t border-gray-100 mt-1'>
                                        <button onClick={logoutHandler} className='flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition-colors'>
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setMobileMenu(!mobileMenu)} className='md:hidden p-2 hover:bg-gray-100 rounded-lg'>
                    {mobileMenu ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
                <div className='md:hidden bg-white border-t border-gray-100 animate-fade-in-down'>
                    <div className='px-4 py-4 space-y-2'>
                        {!user ? (
                            <>
                                <Link to="/login" className='block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium'>Login</Link>
                                <Link to="/signup" className='block px-4 py-3 text-white bg-brand-500 rounded-lg font-medium text-center'>Sign Up</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg'><Home size={18} /> Home</Link>
                                <Link to="/jobs" className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg'><Briefcase size={18} /> Jobs</Link>
                                <Link to="/browse" className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg'><Building2 size={18} /> Browse</Link>
                                <Link to="/profile" className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg'><User size={18} /> Profile</Link>
                                <button onClick={logoutHandler} className='flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg w-full'><LogOut size={18} /> Logout</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar