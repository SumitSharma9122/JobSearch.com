import React from 'react'

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobCards = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow'>
            <div>
                <h1 className='font-medium text-lg'>Company Name</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Job Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <span className='px-2 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200'>12 Positions</span>
                <span className='px-2 py-1 rounded-full bg-red-50 text-red-700 font-bold text-xs border border-red-200'>Part Time</span>
                <span className='px-2 py-1 rounded-full bg-purple-50 text-purple-700 font-bold text-xs border border-purple-200'>24 LPA</span>
            </div>
        </div>
    )
}

const LatestJobs = () => {
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                {
                    randomJobs.slice(0, 6).map((item, index) => <LatestJobCards key={index} />)
                }
            </div>
        </div>
    )
}

export default LatestJobs
