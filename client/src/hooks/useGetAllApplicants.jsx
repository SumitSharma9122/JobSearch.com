import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import { setAllApplicants } from '../redux/applicationSlice';
import { useParams } from 'react-router-dom';

const useGetAllApplicants = () => {
    const params = useParams();
    const headers = { 'Content-Type': 'multipart/form-data' }; // wait, get doesn't need this usually
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await api.get(`/application/${params.id}/applicants`);
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job)); // backend returns {job, success} where job has applications populated
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);
}
export default useGetAllApplicants;
