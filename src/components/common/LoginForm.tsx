import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LoginInfo } from '../../types/interface/LoginInfo';
import { login, googleLoginUrl } from '../../util/api';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import googleLogo from '../../assets/images/google_logo.svg';

//스타일링 설정
const LoginBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0E1B3D;
    width: 100%;
    height: 100vh; /* 뷰포트 전체 높이 */
`;

const ContentsLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 45%;
    background-color: #333;
    border-radius: 15px;
`;

const AppTitleText = styled.div`
    display: flex;
    flex: 1; /* 상단 제목 영역의 비율 */
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 60px;
    font-weight: 600;
`;

const LoginFormContainer = styled.div`
    display: flex;
    flex: 3; /* 하단 폼 영역의 비율 */
    flex-direction: column;
    align-items: center;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%; /* 부모 컨테이너에 맞추어 너비 설정 */
    gap: 20px;

    @media (max-width: 600px) {
        width: 100%; /* 작은 화면에서도 부모 컨테이너에 맞춤 */
    }
`;

interface InputProps {
    hasToggle?: boolean;
}

const InputInfo = styled.input<InputProps>`
    width: 100%; /* 부모 컨테이너에 맞춤 */
    height: 50px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: #f5f5f5;
    border: 1.5px solid #f5f5f5;
    padding-left: 20px;
    padding-right: ${({ hasToggle }) => (hasToggle ? '40px' : '20px')};
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
        border-color: #000000; /* 포커스 시 테두리 색상 변경 */
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.6); /* 포커스 시 박스 섀도우 추가 */
    }
`;

const PasswordInputWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const ShowPasswordBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: gray;
    cursor: pointer;

    &:hover {
        color: #6799FF;
    }
`;

const InputButton = styled.button`
    width: 100%; /* 부모 컨테이너에 맞춤 */
    height: 48px;
    text-align: center;
    border: none;
    border: 1.5px solid #1E88E5;
    border-radius: 5px;
    box-sizing: border-box;
    outline-style: unset;
    font-size: 16px;
    padding: 0 18px;
    background-color: #1E88E5;
    color: #fff;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s;

    &:hover {
        background-color: #1C6ED4;
        transform: scale(1.02);
    }
`;

const SocialLoginBtn = styled.button`
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    background-color: #fff;
    background-image: url(${googleLogo});
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: center;
    padding: 5%;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const LoginError = styled.p`
    text-align: center;
    color: red;
`;

// 3. LoginForm 컴포넌트 정의
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
            navigate(`/myPage`); // 로그인 시 이동 페이지
        } catch (error) {
            setLoginError('로그인 실패: ' + (error as Error).message);
        }
    };

    const toggleShowUserPwd = () => {
        setShowUserPwd(prevState => !prevState);
    };

    // 구글 로그인 요청 연결 함수
    const handleGoogleLogin = () => {
        window.location.href = googleLoginUrl();
    }

    return (
        <>
            <LoginBody>
                <ContentsLogin>
                    <AppTitleText>
                        K E M S
                    </AppTitleText>
                    <LoginFormContainer>
                        <StyledForm onSubmit={handleLogin}>
                            <InputInfo
                                placeholder='학번'
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                aria-label="학번 입력창"
                            />
                            <PasswordInputWrapper>
                                <InputInfo
                                    placeholder='비밀번호'
                                    type={showUserPwd ? 'text' : 'password'}
                                    value={userPwd}
                                    onChange={(e) => setUserPwd(e.target.value)}
                                    aria-label="비밀번호 입력창"
                                    hasToggle
                                />
                                <ShowPasswordBtn
                                    type="button"
                                    onClick={toggleShowUserPwd}
                                    aria-label={showUserPwd ? "비밀번호 숨기기" : "비밀번호 보기"}
                                >
                                    {showUserPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </ShowPasswordBtn>
                            </PasswordInputWrapper>
                            <InputButton type="submit">로그인</InputButton>
                            <SocialLoginBtn type="button" onClick={handleGoogleLogin} aria-label="구글 로그인 버튼" />
                        </StyledForm>
                        {loginError && <LoginError>{loginError}</LoginError>}
                    </LoginFormContainer>
                </ContentsLogin>
            </LoginBody>
        </>
    );
}

export default LoginForm;
