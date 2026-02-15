import React, { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner' // Assuming sonner or react-toastify usage
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'
import api from '../../services/api'

// Note: JOB_API_END_POINT is already in api service, but using direct api instance is better. 
// I'll stick to using the api service created.

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
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

        // Basicvalidation
        if (!input.fullname || !input.email || !input.password || !input.role) {
            // Toast error here
            console.error("Missing fields"); // placeholder
            return;
        }

        const formData = new FormData();    // formData object
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
                    <h1 className='font-bold text-xl mb-5 text-center'>Sign Up</h1>
                    <div className='my-2'>
                        <label className='font-medium'>Full Name</label>
                        <input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Full Name"
                            className='w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                        />
                    </div>
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
                        {/* Profile pic later */}
                    </div>
                    {
                        loading ? <button disabled className='w-full bg-gray-400 text-white p-2 rounded-md mt-4 flex justify-center items-center gap-2' > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </button> : <button type="submit" className='w-full bg-[#6A38C2] text-white p-2 rounded-md mt-4 hover:bg-[#5b30a6] transition-colors'>Signup</button>
                    }
                    <span className='text-sm block text-center mt-2'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup
