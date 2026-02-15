import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import { setSingleJob } from '../redux/jobSlice';

const useGetSingleJob = (jobId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await api.get(`/job/get/${jobId}`);
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch]);
}

export default useGetSingleJob;
