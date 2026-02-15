import React, { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Loader2, Briefcase, Building2, MapPin, IndianRupee, FileText, CheckCircle2 } from 'lucide-react';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';

const PostJob = () => {
    useGetAllCompanies();
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
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    // Check if user is allowed to post jobs
    const { user } = useSelector(store => store.auth);
    if (user?.role !== 'recruiter' && user?.role !== 'employer') {
        // Redirect or show access denied if somehow a job seeker gets here
        // Ideally should be handled by protected route, but safe to check
    }

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        setError(""); // Clear error on change
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
        setError("");
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!input.title || !input.description || !input.requirements || !input.salary || !input.location || !input.jobType || !input.experience || !input.position || !input.companyId) {
            setError("Please fill in all fields.");
            return;
        }

        // Salary validation
        if (isNaN(input.salary)) {
            setError("Salary must be a number.");
            return;
        }

        try {
            setLoading(true);
            const res = await api.post("/job/post", input);
            if (res.data.success) {
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50/20">
            <Navbar />
            <div className='flex items-center justify-center p-4 py-10'>
                <div className='w-full max-w-4xl animate-fade-in-up'>

                    <div className='text-center mb-8'>
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Post a New <span className='gradient-text'>Job</span></h1>
                        <p className='text-gray-500'>Create a job posting to find the perfect candidate</p>
                    </div>

                    <form onSubmit={submitHandler} className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8'>
                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center justify-center">
                                {error}
                            </div>
                        )}

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {/* Job Title */}
                            <div>
                                <label className='font-semibold text-gray-700 block mb-2 text-sm'>Job Title</label>
                                <div className='relative'>
                                    <Briefcase className='absolute left-3 top-3 text-gray-400' size={18} />
                                    <input
                                        type="text"
                                        name="title"
                                        value={input.title}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. Senior Frontend Developer"
                                        className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm'
                                    />
                                </div>
                            </div>

                            {/* Company Selection */}
                            <div>
                                <label className='font-semibold text-gray-700 block mb-2 text-sm'>Company</label>
                                <div className='relative'>
                                    <Building2 className='absolute left-3 top-3 text-gray-400' size={18} />
                                    {companies.length > 0 ? (
                                        <select
                                            onChange={(e) => selectChangeHandler(e.target.value.toLowerCase())}
                                            className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm appearance-none bg-white'
                                        >
                                            <option value="" disabled selected>Select Company</option>
                                            {companies.map((company) => (
                                                <option key={company._id} value={company.name?.toLowerCase()}>{company.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className='w-full pl-10 pr-4 py-3 border border-red-200 bg-red-50 text-red-600 rounded-xl text-sm'>
                                            Please register a company first
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className='font-semibold text-gray-700 block mb-2 text-sm'>Location</label>
                                <div className='relative'>
                                    <MapPin className='absolute left-3 top-3 text-gray-400' size={18} />
                                    <input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. Bangalore, India"
                                        className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm'
                                    />
                                </div>
                            </div>

                            {/* Salary */}
                            <div>
                                <label className='font-semibold text-gray-700 block mb-2 text-sm'>Salary (LPA)</label>
                                <div className='relative'>
                                    <IndianRupee className='absolute left-3 top-3 text-gray-400' size={18} />
                                    <input
                                        type="number"
                                        name="salary"
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. 12"
                                        className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm'
                                    />
                                </div>
                            </div>

                            {/* Job Type */}
                            <div>
                                <label className='font-semibold text-gray-700 block mb-2 text-sm'>Job Type</label>
                                <select
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm bg-white'
                                >
                                    <option value="" disabled>Select Job Type</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Freelance">Freelance</option>
                                </select>
                            </div>

                            {/* Experience */}
                            <div>
                                <label className='font-semibold text-gray-700 block mb-2 text-sm'>Experience Level</label>
                                <select
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm bg-white'
                                >
                                    <option value="" disabled>Select Experience</option>
                                    <option value="Entry Level">Entry Level</option>
                                    <option value="Mid Level">Mid Level</option>
                                    <option value="Senior Level">Senior Level</option>
                                </select>
                            </div>

                            {/* No of Position */}
                            <div>
                                <label className='font-semibold text-gray-700 block mb-2 text-sm'>Number of Positions</label>
                                <input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm'
                                />
                            </div>

                            {/* Requirements */}
                            <div className='md:col-span-2'>
                                <label className='font-semibold text-gray-700 block mb-2 text-sm'>Requirements (comma separated)</label>
                                <input
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    placeholder="React, Node.js, MongoDB"
                                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm'
                                />
                            </div>

                            {/* Description */}
                            <div className='md:col-span-2'>
                                <label className='font-semibold text-gray-700 block mb-2 text-sm'>Description</label>
                                <textarea
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Enter job description..."
                                    rows="4"
                                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm resize-none'
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='mt-8'>
                            {loading ? (
                                <button disabled className='w-full bg-gray-200 text-gray-500 py-3 rounded-xl flex justify-center items-center gap-2 font-medium cursor-not-allowed'>
                                    <Loader2 className='animate-spin' size={20} /> Posting Job...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={companies.length === 0}
                                    className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${companies.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'btn-primary bg-brand-500 hover:bg-brand-600'}`}
                                >
                                    <CheckCircle2 size={20} /> Post Job
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob
