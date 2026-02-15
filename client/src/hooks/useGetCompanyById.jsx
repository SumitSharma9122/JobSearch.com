import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import { setSingleCompany } from '../redux/companySlice';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await api.get(`/company/get/${companyId}`);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    }, [companyId, dispatch]);
}
export default useGetCompanyById;
