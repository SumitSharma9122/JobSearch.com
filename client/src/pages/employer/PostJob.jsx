import React, { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await api.post("/job/post", input);
            if (res.data.success) {
                // toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <label className='font-bold'>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 p-2 rounded my-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
                            />
                        </div>
                        <div>
                            <label className='font-bold'>Description</label>
                            <input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 p-2 rounded my-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
                            />
                        </div>
                        <div>
                            <label className='font-bold'>Requirements</label>
                            <input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 p-2 rounded my-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
                            />
                        </div>
                        <div>
                            <label className='font-bold'>Salary</label>
                            <input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 p-2 rounded my-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
                            />
                        </div>
                        <div>
                            <label className='font-bold'>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 p-2 rounded my-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
                            />
                        </div>
                        <div>
                            <label className='font-bold'>Job Type</label>
                            <input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 p-2 rounded my-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
                            />
                        </div>
                        <div>
                            <label className='font-bold'>Experience Level</label>
                            <input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 p-2 rounded my-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
                            />
                        </div>
                        <div>
                            <label className='font-bold'>No of Position</label>
                            <input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 p-2 rounded my-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <select onChange={(e) => selectChangeHandler(e.target.value.toLowerCase())} className='w-full border border-gray-200 p-2 rounded my-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500'>
                                    <option value="" disabled selected>Select Company</option>
                                    {
                                        companies.map((company) => {
                                            return (
                                                <option key={company._id} value={company.name?.toLowerCase()}>{company.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            )
                        }
                    </div>
                    {
                        loading ? <button disabled className='w-full bg-gray-400 text-white p-2 rounded-md mt-4 flex justify-center items-center gap-2' > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </button> : <button type="submit" className='w-full bg-[#6A38C2] text-white p-2 rounded-md mt-4 hover:bg-[#5b30a6] transition-colors'>Post New Job</button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob
