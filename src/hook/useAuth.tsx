//2024-10-08 22:55분 버전 테스트
import { useState, useEffect } from 'react';
import { LoginInfo } from '../types/interface/LoginInfo';

export const useAuth = () => {
    const [user, setUser] = useState<LoginInfo | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return { user, isAuthenticated };
};