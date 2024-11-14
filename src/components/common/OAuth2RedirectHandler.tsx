import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2RedirectHandler: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        const userId = urlParams.get('userId');
        const userName = urlParams.get('userName');
        const userRole = urlParams.get('userRole');
        const userType = urlParams.get('userType');
        const userDept = urlParams.get('userDept');

        if (token && userId && userName) {
            const user = { userId, userName, userRole, userType, userDept };
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/myPage');
        } else {
            console.error('Google 로그인 실패');
            navigate('/login');
        }
    }, [navigate, location.search]);

    return <div>Loading...</div>;
};

export default OAuth2RedirectHandler;
