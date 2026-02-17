import React, { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'
import { Loader2, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        setError("");
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");

        if (!input.email || !input.password || !input.role) {
            setError("Please fill in all fields (Email, Password, and Role).");
            return;
        }

        try {
            dispatch(setLoading(true));
            const res = await api.post("/user/login", input);
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
            const msg = error?.response?.data?.message || "Something went wrong. Please try again.";
            setError(msg);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300'>
            <Navbar />
            <div className='flex items-center justify-center px-4 py-12'>
                <div className='w-full max-w-md animate-fade-in-up'>
                    {/* Card */}
                    <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 relative overflow-hidden transition-colors duration-300'>
                        {/* Gradient accent */}
                        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-blue-500 to-brand-500'></div>

                        {/* Header */}
                        <div className='text-center mb-8'>
                            <div className='w-14 h-14 bg-brand-50 dark:bg-brand-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors'>
                                <Sparkles className='text-brand-500 dark:text-brand-400' size={24} />
                            </div>
                            <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Welcome Back</h1>
                            <p className='text-gray-400 dark:text-gray-500 text-sm mt-1'>Sign in to continue your journey</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-5'>
                            {/* Email */}
                            <div>
                                <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Email</label>
                                <div className='relative'>
                                    <Mail size={18} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                    <input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="you@example.com"
                                        className='w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500'
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Password</label>
                                <div className='relative'>
                                    <Lock size={18} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className='w-full pl-11 pr-11 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500'
                                    />
                                    <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'>
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Role Select */}
                            <div>
                                <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block'>I am a</label>
                                <div className='grid grid-cols-2 gap-3'>
                                    <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${input.role === 'job_seeker' ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                                        <input type="radio" name="role" value="job_seeker" checked={input.role === 'job_seeker'} onChange={changeEventHandler} className="hidden" />
                                        <span className='text-sm font-medium'>🎓 Job Seeker</span>
                                    </label>
                                    <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${input.role === 'employer' ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                                        <input type="radio" name="role" value="employer" checked={input.role === 'employer'} onChange={changeEventHandler} className="hidden" />
                                        <span className='text-sm font-medium'>💼 Recruiter</span>
                                    </label>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl'>
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            {loading ? (
                                <button disabled className='w-full bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 py-3 rounded-xl flex justify-center items-center gap-2 cursor-not-allowed'>
                                    <Loader2 className='h-4 w-4 animate-spin' /> Signing in...
                                </button>
                            ) : (
                                <button type="submit" className='btn-primary w-full bg-brand-500 text-white py-3 rounded-xl font-semibold hover:bg-brand-600 shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 transition-all duration-200 transform hover:-translate-y-0.5'>
                                    Sign In
                                </button>
                            )}
                        </form>

                        <p className='text-sm text-center mt-6 text-gray-500 dark:text-gray-400'>
                            Don't have an account? <Link to="/signup" className='text-brand-500 dark:text-brand-400 font-semibold hover:text-brand-600 dark:hover:text-brand-300 transition-colors'>Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
