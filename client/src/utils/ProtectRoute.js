import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';

function ProtectRoute({ children }) {
    const { user } = useAppContext();

    if (!user) {
        return <Navigate to='/landing' />;
    }

    return children;
}

export default ProtectRoute;