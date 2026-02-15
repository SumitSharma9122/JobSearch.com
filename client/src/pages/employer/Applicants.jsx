import React, { useEffect } from 'react'
import Navbar from '../../components/layout/Navbar'
import ApplicantsTable from '../../components/ui/ApplicantsTable'
import useGetAllApplicants from '../../hooks/useGetAllApplicants'
import { useSelector } from 'react-redux'

const Applicants = () => {
    useGetAllApplicants();
    const { applicants } = useSelector(store => store.application);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants
