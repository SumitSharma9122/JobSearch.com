import React, { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'
import { Loader2, User, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react'
import api from '../../services/api'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.fullname || !input.email || !input.password || !input.role) {
            console.error("Missing fields");
            return;
        }

        const formData = new FormData();
        formData.append("name", input.fullname);
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await api.post("/user/register", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (res.data.success) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50'>
            <Navbar />
            <div className='flex items-center justify-center px-4 py-10'>
                <div className='w-full max-w-md animate-fade-in-up'>
                    <div className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8 relative overflow-hidden'>
                        {/* Gradient accent */}
                        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-blue-500 to-brand-500'></div>

                        {/* Header */}
                        <div className='text-center mb-7'>
                            <div className='w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                                <UserPlus className='text-brand-500' size={24} />
                            </div>
                            <h1 className='text-2xl font-bold text-gray-800'>Create Account</h1>
                            <p className='text-gray-400 text-sm mt-1'>Start your journey to your dream job</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-4'>
                            {/* Full Name */}
                            <div>
                                <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Full Name</label>
                                <div className='relative'>
                                    <User size={18} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                    <input
                                        type="text"
                                        value={input.fullname}
                                        name="fullname"
                                        onChange={changeEventHandler}
                                        placeholder="Sumit Sharma"
                                        className='w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm transition-all duration-200 hover:border-gray-300'
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Email</label>
                                <div className='relative'>
                                    <Mail size={18} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                    <input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="you@example.com"
                                        className='w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm transition-all duration-200 hover:border-gray-300'
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Password</label>
                                <div className='relative'>
                                    <Lock size={18} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Create a strong password"
                                        className='w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl text-sm transition-all duration-200 hover:border-gray-300'
                                    />
                                    <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Role */}
                            <div>
                                <label className='text-sm font-medium text-gray-700 mb-3 block'>I am a</label>
                                <div className='grid grid-cols-2 gap-3'>
                                    <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${input.role === 'job_seeker' ? 'border-brand-500 bg-brand-50 text-brand-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                        <input type="radio" name="role" value="job_seeker" checked={input.role === 'job_seeker'} onChange={changeEventHandler} className="hidden" />
                                        <span className='text-sm font-medium'>🎓 Job Seeker</span>
                                    </label>
                                    <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${input.role === 'employer' ? 'border-brand-500 bg-brand-50 text-brand-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                        <input type="radio" name="role" value="employer" checked={input.role === 'employer'} onChange={changeEventHandler} className="hidden" />
                                        <span className='text-sm font-medium'>💼 Recruiter</span>
                                    </label>
                                </div>
                            </div>

                            {/* Profile Photo */}
                            <div>
                                <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Profile Photo <span className='text-gray-400 font-normal'>(optional)</span></label>
                                <div className='relative'>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className='w-full text-sm file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-500 hover:file:bg-brand-100 border border-gray-200 rounded-xl cursor-pointer transition-all duration-200'
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            {loading ? (
                                <button disabled className='w-full bg-gray-200 text-gray-400 py-3 rounded-xl flex justify-center items-center gap-2'>
                                    <Loader2 className='h-4 w-4 animate-spin' /> Creating account...
                                </button>
                            ) : (
                                <button type="submit" className='btn-primary w-full bg-brand-500 text-white py-3 rounded-xl font-semibold hover:bg-brand-600 transition-all duration-200'>
                                    Create Account
                                </button>
                            )}
                        </form>

                        <p className='text-sm text-center mt-6 text-gray-500'>
                            Already have an account? <Link to="/login" className='text-brand-500 font-semibold hover:text-brand-600 transition-colors'>Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
