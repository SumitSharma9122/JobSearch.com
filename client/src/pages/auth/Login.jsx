import React, { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await api.post("/user/login", input);
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/dashboard");
                // toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5 text-center'>Login</h1>
                    <div className='my-2'>
                        <label className='font-medium'>Email</label>
                        <input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="i.e. example@gmail.com"
                            className='w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                        />
                    </div>
                    <div className='my-2'>
                        <label className='font-medium'>Password</label>
                        <input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Password"
                            className='w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <div className='flex items-center gap-1'>
                                <input
                                    type="radio"
                                    name="role"
                                    value="job_seeker"
                                    checked={input.role === 'job_seeker'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <label className='cursor-pointer'>Student</label>
                            </div>
                            <div className='flex items-center gap-1'>
                                <input
                                    type="radio"
                                    name="role"
                                    value="employer"
                                    checked={input.role === 'employer'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <label className='cursor-pointer'>Recruiter</label>
                            </div>
                        </div>
                    </div>
                    {
                        loading ? <button disabled className='w-full bg-gray-400 text-white p-2 rounded-md mt-4 flex justify-center items-center gap-2' > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </button> : <button type="submit" className='w-full bg-[#6A38C2] text-white p-2 rounded-md mt-4 hover:bg-[#5b30a6] transition-colors'>Login</button>
                    }
                    <span className='text-sm block text-center mt-2'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login
