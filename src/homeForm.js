import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function HomeForm({ isLoggedIn , setIsLoggedIn}) {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem('id');
    const storedNickname = localStorage.getItem('nickname');

    setId(storedId || '');
    setNickname(storedNickname || '');

    if (storedId && storedNickname) {
      setIsLoggedIn(true);
    }
  });

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
      }).then(() => {
    localStorage.removeItem('id');
    localStorage.removeItem('nickname');
    setIsLoggedIn(false);
    navigate('/lastdance');
    });
  }

  return (
    <div>
      <div className='header'>
        <h4 onClick={() => navigate('/lastdance')} style={{ cursor: 'pointer', marginLeft: '200px' }}><img src="/images/KakaoTalk_20250712_003924896.png" alt='logo' style={{width: '30px', height: 'auto', verticalAlign: 'middle', position: 'relative', top: '-3px', marginRight:'5px'}}/>블로그</h4>

        {isLoggedIn ? (
          <span style={{ marginLeft: '855px', cursor: 'pointer' , color: 'white'}}>{nickname}님</span>
        ) : (
          <button
            onClick={() => navigate('/lastdance/login')} style={{ marginLeft: '855px', cursor: 'pointer' }}>로그인</button>
        )}
      </div>

      <div style={{textAlign: 'center', marginTop: '150px', marginLeft: '1050px', border: '1px solid black', padding: '20px', width: '220px',height: '120px'}}>
        {isLoggedIn ? (
          <div>
            <p>{nickname}님</p>

            <button style={{ marginTop: '35px', margin: '2px', cursor: 'pointer' }}>글쓰기</button>
            <button style={{ cursor: 'pointer' , margin: '2px'}}>내 글</button>
            <button style={{ cursor: 'pointer' , margin: '2px'}} onClick={handleLogout}>로그아웃</button>
          </div>
        ) : (
          <div>
            <button onClick={() => navigate('/lastdance/login')}style={{fontSize: '18px',padding: '10px 70px',marginTop: '10px',cursor: 'pointer'}}>로그인</button>
            <div className="links">
              <span>비밀번호 찾기</span><span>|</span>
              <span>아이디 찾기</span><span>|</span>
              <span onClick={() => navigate('/lastdance/signup')} style={{ cursor: 'pointer' }}>회원가입</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}