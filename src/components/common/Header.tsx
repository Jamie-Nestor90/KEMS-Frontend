import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 52px;
    background-color: #2f3136;
    margin: 0px;
`;
const LeftSection = styled.div`
    display: flex;
    align-items: center;
    color: #FFFFFF;
    margin-left: 80px;
`;
const HomeIconBtn = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 8px;
`;
const PageTitle = styled.span`
    font-size: 18px;
    font-weight: bold;
`;
const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 80px;
`
const SearchBox = styled.input`
    width: 300px;
    height: 32px;
    padding: 0 40px 0 10px;
    border: 1px solid #A6A6A6;
    border-radius: 8px;
    font-size: 14px;
    outline: none;

    &:focus {
        border-color: #A6A6A6; /* 테두리 색상을 검은색으로 변경 */
        box-shadow: 0 0 10px rgba(0, 0, 0.4, 0.8); /* 검은색 계열 박스 섀도우 추가 */
    }
`;
const SearchIconWrapper = styled.div`
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
    color: #888;

    &:hover {
        color: #6799FF;
    }
`;

const Header: React.FC = () => {
    const navigate = useNavigate();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 검색 기능 구현 (현재는 콘솔에 입력값 출력)
        console.log('검색어:', e.target.value);
    };

    const goHome = () => {
        navigate('/myPage'); // 홈 경로로 이동
    };

    return (
        <HeaderContainer>
            <LeftSection>
                <HomeIconBtn>
                    <HomeIcon onClick={goHome} />
                </HomeIconBtn>
                <PageTitle>마이페이지</PageTitle>
            </LeftSection>
            <SearchContainer>
                <SearchBox
                    type="text"
                    placeholder="이 페이지에서 검색..."
                    onChange={handleSearch}
                />
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
            </SearchContainer>
        </HeaderContainer>
    );
};

export default Header;
