import React, { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import api from '../../services/api';
import { Users, Briefcase, Building2, FileText } from 'lucide-react';

const AdminStatistics = () => {
    const [stats, setStats] = useState({
        users: 0,
        companies: 0,
        jobs: 0,
        applications: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/admin/stats");
                if (res.data.success) {
                    setStats(res.data.stats);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchStats();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-2xl mb-8'>Platform Statistics</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-gray-500'>Total Users</p>
                                <h1 className='text-3xl font-bold'>{stats.users}</h1>
                            </div>
                            <div className='bg-blue-100 p-3 rounded-full text-blue-600'>
                                <Users size={24} />
                            </div>
                        </div>
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-gray-500'>Companies</p>
                                <h1 className='text-3xl font-bold'>{stats.companies}</h1>
                            </div>
                            <div className='bg-orange-100 p-3 rounded-full text-orange-600'>
                                <Building2 size={24} />
                            </div>
                        </div>
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-gray-500'>Active Jobs</p>
                                <h1 className='text-3xl font-bold'>{stats.jobs}</h1>
                            </div>
                            <div className='bg-green-100 p-3 rounded-full text-green-600'>
                                <Briefcase size={24} />
                            </div>
                        </div>
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-gray-500'>Applications</p>
                                <h1 className='text-3xl font-bold'>{stats.applications}</h1>
                            </div>
                            <div className='bg-purple-100 p-3 rounded-full text-purple-600'>
                                <FileText size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminStatistics
