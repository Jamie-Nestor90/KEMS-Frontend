import React from 'react';
import styled from 'styled-components';

//부속 컴포넌트
import Header from '../components/common/Header';
import MyProfile from '../components/common/MyProfile';

//스타일링 설정
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const MyPageContentArea = styled.div`
    flex: 1;
    width: 90%
    padding: 20px;
`;

const MyPage: React.FC = () => {

    return (
        <PageContainer>
            <Header />
            <MyPageContentArea>
                <MyProfile />
            </MyPageContentArea>
        </PageContainer>
    );
};

export default MyPage;