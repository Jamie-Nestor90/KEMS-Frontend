import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

//페이지 컴포넌트
import LoginPage from '../../pages/LoginPage';
import MyPage from '../../pages/MyPage';

//부속 컴포넌트
import { LoginInfo } from '../../types/interface/LoginInfo';
import Sidebar from './Sidebar';
import OAuth2RedirectHandler from './OAuth2RedirectHandler';

//글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
`;

//스타일링 설정
const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
`;
const SidebarWrapper = styled.div`
    flex-shrink: 0;
`;
const ContentArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

interface RouterProps {
    user: LoginInfo | null;
    setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
}

const AppLayout: React.FC<{ user: LoginInfo | null; setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>> }> 
= ({ user, setUser }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login' || location.pathname === '/';

    return (
        <>
        <GlobalStyle />
        <Container>
            {!isLoginPage && (
                <SidebarWrapper>
                    <Sidebar user={ user } setUser={ setUser } />
                </SidebarWrapper>
            )}

            <ContentArea>
                <Routes>
                    {/* 로그인 파트 */}
                    <Route path='/login' element={<LoginPage user={ user } setUser={ setUser } />} />
                    <Route path='/' element={<LoginPage user={ user } setUser={ setUser } />} />
                    <Route path='/oauth2/redirect' element={<OAuth2RedirectHandler />} />
                    <Route path='/myPage' element={<MyPage />} />
                    {/* 다른 라우트 설정 가능 */}
                </Routes>
            </ContentArea>
        </Container>
        </>
    );
};

const Router: React.FC<RouterProps> = ({ user, setUser }) => {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <AppLayout user={ user } setUser={ setUser } />
        </BrowserRouter>
    );
}

export default Router;