// Header.tsx
import React from 'react';
import '../../assets/styles/common/Header.css';
import { LoginInfo } from '../../types/interface/LoginInfo';

interface HeaderProps {
    user: LoginInfo | null;
    setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
}

const Header: React.FC<HeaderProps> = ({ user, setUser }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);  // 로그아웃 시 상태 초기화
        window.location.href = '/login';
    };

    return (
        <div id='header'>
            <div className='header-container'>
                <div className='login-user-info'>
                    <span className='login-user-text'>{ user?.userName }</span> 님 환영합니다.
                </div>
                <div className='header-right'>
                        <button className='header-btn' onClick={ handleLogout }>로그아웃</button>
                </div>
            </div>
        </div>
    );
}

export default Header;