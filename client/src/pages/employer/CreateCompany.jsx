import React, { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../../redux/companySlice'
// import { toast } from 'sonner' 

const CreateCompany = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await api.post("/company/register", { companyName });
            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                // toast.success(res.data.message);
                const companyId = res.data.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                </div>

                <div>
                    <label className='font-bold'>Company Name</label>
                    <input
                        type="text"
                        className='w-full border border-gray-200 p-2 rounded my-2'
                        placeholder="JobHunt, Microsoft etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <div className='flex items-center gap-2 my-10'>
                        <button className='border border-gray-300 px-4 py-2 rounded-md' onClick={() => navigate("/admin/companies")}>Cancel</button>
                        <button className='bg-[#6A38C2] text-white px-4 py-2 rounded-md' onClick={registerNewCompany}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany
