import React, { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Job from '../../components/ui/Job';
import FilterCard from '../../components/ui/FilterCard';
import useGetAllJobs from '../../hooks/useGetAllJobs';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice';

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
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filtered)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <h1 className='font-bold text-xl my-10'>Search Results ({filterJobs.length})</h1>
                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='w-full md:w-[20%]'>
                        <FilterCard />
                    </div>
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5 no-scrollbar'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {
                                filterJobs.map((job) => {
                                    return (
                                        <Job key={job._id} job={job} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowseJobs
