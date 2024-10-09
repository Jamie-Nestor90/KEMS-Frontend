import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { redirectToGoogleOAuth } from '../../util/api';

const MyPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    // Google OAuth2 로그인 API 호출
    const handleGoogleLink = () => {
        redirectToGoogleOAuth();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <header>
                <h1>My Page</h1>
                <p>Welcome, {user?.userName}!</p>
            </header>

            <div>
                <h2>프로필 정보</h2>
                <p><strong>사용자명:</strong> {user?.userName}</p>
                <p><strong>유형:</strong> {user?.userType}</p>
                <p><strong>소속캠퍼스 :</strong> {user?.userDept}</p>
                <br/>

                <div className="left-area">
                    <button onClick={handleGoogleLink}>Google 연동</button>
                </div><br/>
                <div className="right-area">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default MyPage;