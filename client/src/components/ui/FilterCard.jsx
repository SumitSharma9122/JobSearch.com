import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../../redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value === selectedValue ? '' : value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm'>
            <h1 className='font-bold text-base text-gray-800 mb-1'>Filter Jobs</h1>
            <p className='text-xs text-gray-400 mb-4'>Narrow down your search</p>
            <hr className='border-gray-100' />
            {
                fitlerData.map((data, index) => (
                    <div key={index} className='mt-4'>
                        <h2 className='font-semibold text-sm text-gray-700 mb-2 uppercase tracking-wider'>{data.fitlerType}</h2>
                        <div className='space-y-1.5'>
                            {
                                data.array.map((item, idx) => {
                                    const isActive = selectedValue === item;
                                    return (
                                        <label
                                            key={`${index}-${idx}`}
                                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-150 ${isActive ? 'bg-brand-50 border border-brand-200' : 'hover:bg-gray-50 border border-transparent'}`}
                                            onClick={() => changeHandler(item)}
                                        >
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? 'border-brand-500' : 'border-gray-300'}`}>
                                                {isActive && <div className='w-2 h-2 rounded-full bg-brand-500'></div>}
                                            </div>
                                            <span className={`text-sm ${isActive ? 'text-brand-600 font-medium' : 'text-gray-600'}`}>{item}</span>
                                        </label>
                                    )
                                })
                            }
                        </div>
                    </div>
                ))
            }
            {selectedValue && (
                <button
                    onClick={() => setSelectedValue('')}
                    className='mt-4 w-full py-2 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors'
                >
                    Clear Filter
                </button>
            )}
        </div>
    )
}

export default FilterCard
