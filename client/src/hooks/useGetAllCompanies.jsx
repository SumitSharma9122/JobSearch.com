import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import { setCompanies } from '../redux/companySlice';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await api.get("/company/get");
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    }, []);
}
export default useGetAllCompanies;
