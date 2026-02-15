import React, { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/api'
import { useSelector } from 'react-redux'
import useGetCompanyById from '../../hooks/useGetCompanyById' // need to create this hook

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: singleCompany.logo || null
            })
        }
    }, [singleCompany]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await api.put(`/company/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                // toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <button onClick={() => navigate("/admin/companies")} className='flex items-center gap-2 text-gray-500 font-bold'>
                            <ArrowLeft />
                            <span>Back</span>
                        </button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='font-bold'>Company Name</label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 p-2 rounded my-1'
                            />
                        </div>
                        <div>
                            <label className='font-bold'>Description</label>
                            <input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 p-2 rounded my-1'
                            />
                        </div>
                        <div>
                            <label className='font-bold'>Website</label>
                            <input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 p-2 rounded my-1'
                            />
                        </div>
                        <div>
                            <label className='font-bold'>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 p-2 rounded my-1'
                            />
                        </div>
                        <div>
                            <label className='font-bold'>Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className='w-full border border-gray-200 p-2 rounded my-1'
                            />
                        </div>
                    </div>
                    {
                        loading ? <button disabled className='w-full bg-gray-400 text-white p-2 rounded-md mt-4 flex justify-center items-center gap-2' > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </button> : <button type="submit" className='w-full bg-[#6A38C2] text-white p-2 rounded-md mt-4 hover:bg-[#5b30a6] transition-colors'>Update</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
