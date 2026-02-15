import React, { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import FilterCard from '../../components/ui/FilterCard'
import Job from '../../components/ui/Job'
import { useSelector } from 'react-redux';
import useGetAllJobs from '../../hooks/useGetAllJobs';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const JobWeb = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50/20'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-6'>
                {/* Header */}
                <div className='flex items-center justify-between mb-6 animate-fade-in'>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-800'>
                            {searchedQuery ? (
                                <>Results for "<span className='gradient-text'>{searchedQuery}</span>"</>
                            ) : (
                                <>All <span className='gradient-text'>Jobs</span></>
                            )}
                        </h1>
                        <p className='text-sm text-gray-400 mt-1'>{filterJobs.length} jobs found</p>
                    </div>
                    <button onClick={() => setShowFilter(!showFilter)} className='md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50'>
                        <SlidersHorizontal size={16} /> Filters
                    </button>
                </div>

                <div className='flex gap-6'>
                    {/* Filter Sidebar */}
                    <div className={`${showFilter ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto md:relative md:inset-auto md:z-auto md:bg-transparent md:p-0' : 'hidden md:block'} w-full md:w-[260px] shrink-0`}>
                        {showFilter && (
                            <button onClick={() => setShowFilter(false)} className='md:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full'>
                                <X size={20} />
                            </button>
                        )}
                        <div className='sticky top-24'>
                            <FilterCard />
                        </div>
                    </div>

                    {/* Jobs Grid */}
                    {filterJobs.length <= 0 ? (
                        <div className='flex-1 flex flex-col items-center justify-center py-20 animate-fade-in'>
                            <div className='w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4'>
                                <Search size={32} className='text-gray-300' />
                            </div>
                            <h3 className='text-lg font-semibold text-gray-600'>No jobs found</h3>
                            <p className='text-sm text-gray-400 mt-1'>Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <div className='flex-1 h-[85vh] overflow-y-auto pb-5 no-scrollbar'>
                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                                {filterJobs.map((job, index) => (
                                    <div key={job?._id} className={`animate-fade-in-up opacity-0`} style={{ animationDelay: `${Math.min(index * 0.08, 0.5)}s` }}>
                                        <Job job={job} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default JobWeb
