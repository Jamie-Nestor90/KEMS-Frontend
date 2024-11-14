import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SidebarMenuArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70px;
    cursor: pointer;
`;
const MenuIconArea = styled.div<{ isAppIcon: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: white;
    color: #2f3136;
    margin: 10px;
    
    /* 앱 아이콘은 원형, 일반 메뉴 아이콘은 둥근 직사각형 */
    ${({ isAppIcon }) => isAppIcon 
        ? css
            `border-radius: 50%;` 
        : css
            `
                border-radius: 10px; 
                width: 40px;
                height: 40px;
            `}
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
const ToggleButtonArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
`;
const ToggleButton = styled.button`
    background: none;
    border: none;
    color: #ecf0f1;
    cursor: pointer;
`;

interface MenuListItemProps {
    icon: React.ReactNode;
    label?: string;
    isOpen: boolean;
    isAppIcon?: boolean;
    onToggle?: () => void;
    onClick?: () => void;
}

const MenuListItem: React.FC<MenuListItemProps> = ({ icon, label, isOpen, isAppIcon = false, onToggle, onClick }) => {

    return (
        <SidebarMenuArea onClick={onClick}>
            <MenuIconArea isAppIcon={isAppIcon}>{icon}</MenuIconArea>
            <TextArea isOpen={isOpen}>{label}</TextArea>
            <ToggleButtonArea>
                {onToggle ? (
                    <ToggleButton onClick={onToggle}>
                        {isOpen ? <ArrowForwardIcon /> : <ArrowBackIcon />}
                    </ToggleButton>
                ) : null}
            </ToggleButtonArea>
        </SidebarMenuArea>
    );
};

export default MenuListItem;