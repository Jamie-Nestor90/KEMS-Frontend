import React, { useState } from 'react';
import { LoginInfo } from '../../types/interface/LoginInfo';
import styled from 'styled-components';
import SettingsIcon from '@mui/icons-material/Settings';
import Popover from '@mui/material/Popover';
import profileImage from '../../assets/images/jamie.jpg';

//스타일링 설정
const UserInfoContainer = styled.div<{ isOpen: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const IconArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ecf0f1;
    color: #2f3136;
    font-size: 20px;
    font-weight: bold;
    margin: 10px;
`;
const TextArea = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? 'none' : 'flex')};
    align-items: center;
    justify-content: center;
    width: calc(70px * 3);
    overflow: hidden;
    white-space: nowrap;
    color: #ecf0f1;
    font-size: 20px;
    margin-left: 10px;
`;
const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    cursor: pointer;
`;
const PopoverBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-color: none;
    background-color: #747474;
    padding: 2px;
`;
const ModalLogoutBtn = styled.button`
    width: 100%;
    background-color: transparent;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    padding: 5px 10px;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: #FFFFFF;
        color: #000000;
    }
`;

interface UserInfoProps {
    user: LoginInfo | null;
    setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
    isOpen: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, setUser, isOpen }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/login';
    };

    const open = Boolean(anchorEl);
    const id = open ? 'logout-popover' : undefined;

    return (
        <>
            <UserInfoContainer isOpen={isOpen}>
                <IconArea>
                    {/* 프로필 이미지가 없을 경우 이름의 첫 글자를 표시 */}
                    {/* {user?.profileImage || user?.userName?.charAt(0).toUpperCase()} */}
                    <img src={profileImage} alt="UserProfileImage" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                </IconArea>
                <TextArea isOpen={isOpen}>{user?.userName}</TextArea>
                <ButtonArea onClick={handlePopoverOpen}>
                    <SettingsIcon />
                </ButtonArea>
            </UserInfoContainer>

            {/* 로그아웃 Popover */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <PopoverBox>
                    <ModalLogoutBtn onClick={handleLogout}>
                        로그아웃
                    </ModalLogoutBtn>
                </PopoverBox>
            </Popover>
        </>
    );
};

export default UserInfo;
