import { useSelector } from 'react-redux';


const useAuth = () => {
    const userLogin = useSelector(state => state.userLogin)
    
    return userLogin
}

export default useAuth