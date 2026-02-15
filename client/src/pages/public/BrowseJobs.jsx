import React, { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Job from '../../components/ui/Job';
import FilterCard from '../../components/ui/FilterCard';
import useGetAllJobs from '../../hooks/useGetAllJobs';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice';
import { Briefcase, SearchX } from 'lucide-react';

const BrowseJobs = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])

    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filtered = allJobs.filter((job) => {
                return job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location?.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filtered)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50/20">
            <Navbar />
            <div className='max-w-7xl mx-auto py-8 px-4'>
                {/* Header */}
                <div className='mb-6 animate-fade-in'>
                    <h1 className='text-3xl font-bold text-gray-800'>
                        Search <span className='gradient-text'>Results</span>
                    </h1>
                    <p className='text-gray-400 mt-1'>{filterJobs.length} jobs found{searchedQuery ? ` for "${searchedQuery}"` : ''}</p>
                </div>

                <div className='flex flex-col md:flex-row gap-6'>
                    {/* Sidebar */}
                    <div className='w-full md:w-[260px] shrink-0'>
                        <div className='md:sticky md:top-24'>
                            <FilterCard />
                        </div>
                    </div>

                    {/* Jobs Grid */}
                    <div className='flex-1'>
                        {filterJobs.length > 0 ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {filterJobs.map((job, index) => (
                                    <div key={job._id} className={`animate-fade-in-up opacity-0`} style={{ animationDelay: `${Math.min(index * 0.06, 0.5)}s` }}>
                                        <Job job={job} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center py-20 animate-fade-in'>
                                <div className='w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4'>
                                    <SearchX size={32} className='text-gray-300' />
                                </div>
                                <h3 className='text-lg font-semibold text-gray-600'>No jobs found</h3>
                                <p className='text-sm text-gray-400 mt-1'>Try adjusting your filters or search terms</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowseJobs
