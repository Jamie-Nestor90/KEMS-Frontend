import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

//페이지 컴포넌트
import LoginPage from '../../pages/LoginPage';
import MyPage from '../user/MyPage';
import CreateUser from './CreateUser';

//부속 컴포넌트
import { LoginInfo } from '../../types/interface/LoginInfo';
import Header from './Header';
import OAuth2RedirectHandler from './OAuth2RedirectHandler';

interface RouterProps {
  user: LoginInfo | null;
  setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
}

const AppLayout: React.FC<{ user: LoginInfo | null; setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>> }> 
= ({ user, setUser }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isLoginPage2 = location.pathname === '/';


  return (
    <>
      {!isLoginPage && !isLoginPage2 && <Header user={ user } setUser={ setUser } />}

      <Routes>
        {/* 로그인 파트 */}
        <Route path='/login' element={<LoginPage user={ user } setUser={ setUser } />} />
        <Route path='/' element={<LoginPage user={ user } setUser={ setUser } />} />
        <Route path='/oauth2/redirect' element={<OAuth2RedirectHandler />} />
        <Route path='/myPage' element={<MyPage />} />
        <Route path='/admin/user/create' element={<CreateUser />} />
        {/* 다른 라우트 설정 가능 */}
      </Routes>
    </>
  );
};

const Router: React.FC<RouterProps> = ({ user, setUser }) => {
  return (
    <BrowserRouter>
      <AppLayout user={ user } setUser={ setUser } />
    </BrowserRouter>
  );
}

export default Router;