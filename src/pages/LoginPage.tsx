import React, { useState } from 'react';
import LoginForm from '../components/common/LoginForm';
import { LoginInfo } from '../types/interface/LoginInfo';

interface LoginPageProps {
    setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
    user: LoginInfo | null;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUser, user }) => {
    return (
        <div>
            <div>
                <LoginForm setUser={ setUser } />
            </div>
        </div>
    )
}

export default LoginPage;