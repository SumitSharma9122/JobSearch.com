import React from 'react'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    return (
        <div className='max-w-xl mx-auto my-20'>
            <div className='flex gap-4 overflow-x-auto no-scrollbar justify-center flex-wrap'>
                {
                    category.map((cat, index) => (
                        <button key={index} className='bg-white text-gray-800 font-medium py-2 px-4 rounded-full shadow-sm border border-gray-200 whitespace-nowrap hover:shadow-md transition-shadow'>
                            {cat}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default CategoryCarousel
