import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가
import { LoginInfo } from '../../types/interface/LoginInfo';
import { login, googleLoginUrl } from '../../util/api';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../../assets/styles/login/Login.css';

interface LoginProps {
    setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
}

const LoginForm: React.FC<LoginProps> = ({ setUser }) => {
const [userId, setUserId] = useState('');
const [userPwd, setUserPwd] = useState('');
const [showUserPwd, setShowUserPwd] = useState(false); // 비밀번호 보기 상태 추가
const [loginError, setLoginError] = useState('');
const navigate = useNavigate();

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const data = await login(userId, userPwd);
        const { token, ...user } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        navigate(`/myPage`); //로그인 시 이동 페이지
    } catch (error) {
        setLoginError('로그인 실패: ' + (error as Error).message);
    }
};

const toggleShowUserPwd = () => {
    setShowUserPwd(prevState => !prevState);
};

//구글 로그인 요청 연결 함수
const handleGoogleLogin = () => {
    window.location.href = googleLoginUrl();
}

//회원가입 버튼 클릭 시 이동 함수
const handleRegisterClick = () => {
    navigate(`/admin/user/create`);
}

return (
    <div className='contents_login'>
    {/* 로그인 로고 */}
    <div className='logo_img'>
    {/* <img className='login-logo-img' src={'../../assets/images/jamie.jpg'} alt='login'/> */}
    {/* <div className='login-logo-img' style={{backgroundImage: 'D:\KEMS\kems-login-front\src\assets\images\jamie.jpg'}}></div> */}
    </div>
    {/* 로그인폼 시작 */}
    <div className='login_frm'>
        <form onSubmit={handleLogin}>
        <label>
            <input
            className='input_info'
            style={{ paddingLeft: '20px' }}
            placeholder='학번'
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            />
        </label>
        <label style={{ position: 'relative' }}>
            <input
            className='input_info'
            style={{ paddingLeft: '20px' }}
            placeholder='비밀번호'
            type={showUserPwd ? 'text' : 'password'}
            value={userPwd}
            onChange={(e) => setUserPwd(e.target.value)}
            />
            <button
            type="button"
            className='show-password-btn'
            onClick={toggleShowUserPwd}
            style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'gray',
                cursor: 'pointer',
            }}
            >
            {showUserPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
        </label>
        <button className='input_button' type="submit">로그인</button>
        <button className='input_button' type="button" onClick={handleGoogleLogin}>Google 로그인</button>
        </form>
        {loginError && <p>{loginError}</p>}
        <button className='input_button' type="button" onClick={handleRegisterClick}>사용자 생성</button>
    </div>
    </div>
);
}

export default LoginForm;