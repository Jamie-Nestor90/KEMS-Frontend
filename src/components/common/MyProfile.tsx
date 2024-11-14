import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { redirectToGoogleOAuth } from '../../util/api';
import styled from 'styled-components';
import googleIcon from '../../assets/images/google_logo.svg';

//스타일링 설정
const MyProfileArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-left: 80px;
    margin-right: 80px;
`;
const MyProfileTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0px;
`
const MyProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`
const MyProfileCategory = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 18px;
    font-weight: bold;
`
const MyProfileValue = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 18px;
`
const SocialLoginLinkArea = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 150px;
    background-color: #FFFFFF;
    color: #000000;
    border: 1px solid #A6A6A6;
    border-radius: 15px;
    cursor: pointer;

    &:hover {
        border-color: #A6A6A6;
        box-shadow: 0 0 5px rgba(0, 0, 0.4, 0.8);
    }
`
const SocialLoginIcon = styled.div`
    display: flex;
    justify-self: center;
    align-self: center;
    width: 30px;
    height: 30px;
    margin: 10px 10px 10px 10px;
`
const SocialLoginText = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
`

const MyProfile: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    // Google OAuth2 로그인 API 호출
    const handleGoogleLink = () => {
        redirectToGoogleOAuth();
    };

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <MyProfileArea>
                <div>
                    <MyProfileTitle>프로필 정보</MyProfileTitle>
                    <MyProfileContainer>
                        <MyProfileCategory>
                            <div>이름 : </div>
                            <div>구분 : </div>
                            <div>소속캠퍼스 : </div>
                        </MyProfileCategory>
                        <MyProfileValue>
                            <div>{user?.userName}</div>
                            <div>{user?.userType}</div>
                            <div>{user?.userDept}</div>
                        </MyProfileValue>
                    </MyProfileContainer>
                    <br/>
                    <SocialLoginLinkArea onClick={handleGoogleLink}>
                        <SocialLoginIcon>
                            <img src={googleIcon} alt="Google" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                        </SocialLoginIcon>
                        <SocialLoginText>
                            Google 연동
                        </SocialLoginText>
                    </SocialLoginLinkArea>
                    <br/>
                </div>
            </MyProfileArea>
        </>
    );
};

export default MyProfile;