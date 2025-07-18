import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function SignupForm() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !nickname || !password || !passwordConfirm) {
      setError('모든 항목을 입력해주세요.');
      return;
    } if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, nickname, password, passwordConfirm }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setMessage(data.message);
        setSuccess(true);
      } else if (response.status === 409) {
        if (data.error !== error) {
          setError(data.error);
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }

    } catch {
      setError('서버에 연결할 수 없습니다.');
    }
  };

  if (success) {
    return (
      <div>
        <h2>회원가입 성공</h2>
        <p>{message}</p>
        <button onClick={() => navigate('/lastdance/login')}>
          로그인
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <h4 onClick={() => navigate('/lastdance')} style={{ cursor: 'pointer', marginLeft: '200px' }}><img src="/images/KakaoTalk_20250712_003924896.png" style={{width: '30px', height: 'auto', verticalAlign: 'middle', verticalAlign: 'middle', position: 'relative', top: '-3px', marginRight:'5px'}}/>블로그</h4>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          textAlign: 'center',
          marginTop: '100px',
          border: '1px solid black',
          width: '500px',
          height: '550px',
          marginLeft: '550px',
        }}>
        <h2 style={{ marginTop: '50px', marginBottom: '40px' }}>회원가입</h2>

        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ width: '400px', marginBottom: '10px', padding: '8px' }}/>

        <input
          type="text"
          placeholder="별명"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={{ width: '400px', marginBottom: '10px', padding: '8px' }}/>

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '400px', marginBottom: '10px', padding: '8px' }}/>

        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          style={{ width: '400px', marginBottom: '10px', padding: '8px' }}/>

        <p style={{ fontSize: '12px', color: 'red', marginBottom: '10px' }}>{error}</p>

        <button type="submit" style={{ padding: '10px 190px', cursor: 'pointer', fontSize: '18px', margin: '10px 20px' }}>가입</button>

        <button type="button" onClick={() => navigate(-1)} style={{ marginTop: '20px', fontSize: '12px', color: 'gray', cursor: 'pointer' }}>뒤로가기</button>
      </form>
    </div>
  );
}