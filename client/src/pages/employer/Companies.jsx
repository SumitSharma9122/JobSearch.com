import React, { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '../../redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { companies, searchCompanyByText } = useSelector(store => store.company);

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <input
                        className="w-fit border border-gray-200 p-2 rounded"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={() => navigate("/admin/companies/create")} className='bg-[#6A38C2] text-white px-4 py-2 rounded-md'>New Company</button>
                </div>
                <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope="col" className="px-6 py-3">Logo</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                companies.filter((company) => {
                                    if (searchCompanyByText === "") {
                                        return company;
                                    } else if (company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())) {
                                        return company;
                                    }
                                }).map((company) => (
                                    <tr key={company._id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className='cursor-pointer w-10 h-10'>
                                                <img src={company.logo || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"} alt='logo' />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{company.name}</td>
                                        <td className="px-6 py-4">{company.createdAt.split("T")[0]}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => navigate(`/admin/companies/${company._id}`)} className='font-medium text-blue-600 hover:underline'>Edit</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {companies.length === 0 && <span className='p-4 block'>No Companies found</span>}
                </div>
            </div>
        </div>
    )
}

export default Companies
