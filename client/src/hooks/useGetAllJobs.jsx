import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import { setJobs } from '../redux/jobSlice';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await api.get("/job/get");
                if (res.data.success) {
                    dispatch(setJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    }, []);
}

export default useGetAllJobs;
