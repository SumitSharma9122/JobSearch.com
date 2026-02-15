import React, { useState } from 'react'
import { Search, ArrowRight, Sparkles, TrendingUp, Users, Briefcase } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') searchJobHandler();
    }

    return (
        <div className='relative overflow-hidden bg-hero-pattern'>
            {/* Decorative Blobs */}
            <div className='blob hero-blob-1'></div>
            <div className='blob hero-blob-2'></div>

            <div className='relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-20 text-center'>
                {/* Badge */}
                <div className='animate-fade-in-down'>
                    <span className='inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-brand-50 to-purple-50 text-brand-500 font-semibold text-sm border border-brand-100 shadow-sm'>
                        <Sparkles size={16} className='animate-wiggle' />
                        India's #1 Job Portal — Trusted by 10M+ users
                    </span>
                </div>

                {/* Heading */}
                <h1 className='text-5xl md:text-7xl font-extrabold mt-8 mb-6 animate-fade-in-up leading-tight tracking-tight'>
                    Search, Apply &<br />
                    Get Your <span className='gradient-text'>Dream Job</span>
                </h1>

                {/* Subheading */}
                <p className='text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2 opacity-0'>
                    Discover thousands of opportunities from top companies. Your next career move starts here.
                </p>

                {/* Search Bar */}
                <div className='animate-fade-in-up stagger-3 opacity-0'>
                    <div className='flex w-full max-w-2xl mx-auto shadow-xl rounded-full items-center gap-2 bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300 hover:border-brand-200'>
                        <div className='pl-6'>
                            <Search className='h-5 w-5 text-gray-400' />
                        </div>
                        <input
                            type="text"
                            placeholder='Job title, keyword, or company...'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className='outline-none border-none w-full py-4 bg-transparent text-gray-700 placeholder-gray-400'
                        />
                        <button onClick={searchJobHandler} className='btn-primary rounded-full bg-brand-500 hover:bg-brand-600 px-8 py-4 text-white font-semibold flex items-center gap-2 mr-1 whitespace-nowrap'>
                            Search
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Popular Searches */}
                <div className='mt-6 animate-fade-in-up stagger-4 opacity-0'>
                    <span className='text-sm text-gray-400 mr-2'>Popular:</span>
                    {["React Developer", "Data Analyst", "UX Designer", "Java Developer"].map((term, i) => (
                        <button
                            key={i}
                            onClick={() => { setQuery(term); dispatch(setSearchedQuery(term)); navigate("/browse"); }}
                            className='text-sm text-brand-500 hover:text-brand-600 bg-brand-50 hover:bg-brand-100 px-3 py-1 rounded-full mr-2 transition-all duration-200 hover:scale-105'
                        >
                            {term}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className='flex flex-wrap justify-center gap-8 mt-16 animate-fade-in-up stagger-5 opacity-0'>
                    {[
                        { icon: <Briefcase size={22} />, num: "50K+", label: "Active Jobs", color: "text-blue-500 bg-blue-50" },
                        { icon: <Users size={22} />, num: "10M+", label: "Job Seekers", color: "text-purple-500 bg-purple-50" },
                        { icon: <TrendingUp size={22} />, num: "25K+", label: "Companies", color: "text-green-500 bg-green-50" },
                    ].map((stat, i) => (
                        <div key={i} className='flex items-center gap-3 group'>
                            <div className={`p-3 rounded-xl ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                {stat.icon}
                            </div>
                            <div className='text-left'>
                                <p className='text-2xl font-bold text-gray-800'>{stat.num}</p>
                                <p className='text-sm text-gray-500'>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HeroSection
