import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import { setAllAdminJobs } from '../redux/jobSlice';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const res = await api.get("/job/getadminjobs");
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAdminJobs();
    }, []);
}
export default useGetAllAdminJobs;
