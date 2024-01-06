import axios, { BASE_URL } from '../axios';
import useAuth from '../auth/useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
    
    const refresh = async () => {
        const response = await axios.get('/api/refresh', {
            withCredentials: true
        });
        // console.log(response?.data);
        
        setAuth(prev => {
            // console.log(prev);
            // console.log(JSON.stringify(response.data));
            // console.log(response?.data?.accessToken);
        //console.log(response?.data);
            return { 
                ...prev, 
                accessToken: response?.data?.accessToken,
                foundUser: response?.data?.foundUser,
                }
            
                
        });
        //console.log(auth);
        return response?.data?.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
