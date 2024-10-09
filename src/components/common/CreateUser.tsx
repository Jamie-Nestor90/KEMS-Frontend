import React, { useState } from 'react';
import { createUser } from '../../util/api';

const CreateUser: React.FC = () => {
    const [userId, setUserId] = useState<string>(''); // userId를 문자열로 처리
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPhone, setUserPhone] = useState<string>('');
    const [userDept, setUserDept] = useState<string>('이대');
    const [userType, setUserType] = useState<string>('학생');
    const [userRole, setUserRole] = useState<string>('ROLE_USER');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    //student, employee, tutor 테이블에 입학/입사일 입력
    const [joinDate, setJoinDate] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const userRequest = {
            userId: parseInt(userId, 10),
            userName,
            userEmail,
            userPhone,
            userDept,
            userType,
            userRole,
            userPwd: password,
            joinDate
        };

        try {
            const response = await createUser(userRequest);
            setSuccessMessage('사용자 생성 성공!');
            setError(null);
            console.log('사용자 생성 성공:', response);
        } catch (err) {
            setError('사용자 생성 실패: 정보를 확인하고 다시 시도해 주세요.');
            setSuccessMessage(null);
            console.error('사용자 생성 오류:', err);
        }
    };

    return (
        <div>
            <h1>사용자 생성 페이지</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <h3>회원정보 입력</h3>
                <div>아이디 : 
                    <input
                        type="text"
                        placeholder='Id'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div><br />
                <div>이름 : 
                    <input
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div><br />
                <div>이메일 : 
                    <input
                        type="email"
                        placeholder="Email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </div><br />
                <div>연락처 : 
                    <input
                        type="text"
                        placeholder="Phone"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                    />
                </div><br />
                <div>사용자 구분 : 
                    <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="학생">학생</option>
                        <option value="강사">강사</option>
                        <option value="행정팀">행정팀</option>
                    </select>
                </div><br />
                <div>비밀번호 : 
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div><br />
                <hr/>
                <h3>추가정보 입력</h3>
                <div>입학/입사일 : 
                    <input
                        type="date"
                        placeholder="가입일"
                        value={joinDate}
                        onChange={(e) => setJoinDate(e.target.value)}
                    />
                </div><br />
                <div>캠퍼스 : 
                    <select
                        value={userDept}
                        onChange={(e) => setUserDept(e.target.value)}
                    >
                        <option value="이대">이대</option>
                        <option value="강남">강남</option>
                    </select>
                </div><br />
                <hr />
                <button type="submit">사용자 생성</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default CreateUser;