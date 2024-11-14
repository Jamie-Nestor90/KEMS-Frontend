import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//부속 컴포넌트
import MenuListItem from './MenuListItem';
import UserInfo from './UserInfo';
import { LoginInfo } from '../../types/interface/LoginInfo';

//스타일링 설정
const SidebarContainer = styled.div<{ isOpen: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: ${({ isOpen }) => (isOpen ? '120px' : '330px')};
    height: 700px;
    background-color: #2f3136;
    color: white;
    transition: width 0.3s ease;
`;

const MenuItemContainer = styled.div`
`

interface SidebarProps {
    user: LoginInfo | null;
    setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
}

const Sidebar: React.FC<SidebarProps> = ({ user, setUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const navigate = useNavigate();


    return (
        <SidebarContainer isOpen={isOpen}>
            <MenuItemContainer>
                <MenuListItem icon="🌐" isOpen={isOpen} isAppIcon onToggle={toggleSidebar} />
                <MenuListItem icon="🏠" label="Home" isOpen={isOpen} onClick={() => navigate('/myPage')} />
                <MenuListItem icon="🎮" label="Game" isOpen={isOpen} onClick={() => navigate('/game')} />
            </MenuItemContainer>
            <UserInfo user={ user } setUser={ setUser } isOpen={ isOpen } />
        </SidebarContainer>
    );
};

export default Sidebar;