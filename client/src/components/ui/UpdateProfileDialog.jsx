import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';
import { setUser } from '../../redux/authSlice';
import { Loader2 } from 'lucide-react';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        fullname: user?.name || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await api.post("/user/profile/update", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                setOpen(false);
                // toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    if (!open) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded-md w-1/2'>
                <h1 className='text-xl font-bold mb-4'>Update Profile</h1>
                <form onSubmit={submitHandler}>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='my-2'>
                            <label className='font-medium'>Name</label>
                            <input
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 rounded p-2'
                            />
                        </div>
                        <div className='my-2'>
                            <label className='font-medium'>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 rounded p-2'
                            />
                        </div>
                        <div className='my-2'>
                            <label className='font-medium'>Bio</label>
                            <input
                                type="text"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 rounded p-2'
                            />
                        </div>
                        <div className='my-2'>
                            <label className='font-medium'>Skills</label>
                            <input
                                type="text"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-200 rounded p-2'
                            />
                        </div>
                        <div className='col-span-2 my-2'>
                            <label className='font-medium mb-1 block'>Resume</label>
                            <div className="flex items-center gap-2">
                                <label htmlFor="resume-upload" className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md border border-gray-300 transition-colors w-full text-center">
                                    {input.file ? input.file.name : "Upload Resume"}
                                </label>
                                <input
                                    id="resume-upload"
                                    type="file"
                                    name="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className='hidden'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end gap-2 mt-4'>
                        <button type="button" onClick={() => setOpen(false)} className='bg-gray-200 px-4 py-2 rounded-md'>Cancel</button>
                        {
                            loading ? <button disabled className='bg-[#6A38C2] text-white px-4 py-2 rounded-md flex items-center gap-2' > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </button> : <button type="submit" className='bg-[#6A38C2] text-white px-4 py-2 rounded-md hover:bg-[#5b30a6] transition-colors'>Update</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfileDialog
