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
        <div className="header">
          <h4 onClick={() => navigate('/lastdance')} style={{ cursor: 'pointer', marginLeft: '200px' }}><img src="/images/KakaoTalk_20250712_003924896.png" alt='logo' style={{width: '30px', height: 'auto', verticalAlign: 'middle', position: 'relative', top: '-3px', marginRight:'5px'}}/>블로그</h4>
        </div>
        <div style={{
          textAlign: 'center',
          marginTop: '100px',
          border: '1px solid black',
          width: '500px',
          height: '550px',
          marginLeft: '550px'}}>
          <h2>회원가입 성공</h2>
          <p>{nickname}님</p>
          <p>가입을 축하합니다</p>
          <button onClick={() => navigate('/lastdance/login')} style={{ padding: '10px 190px', cursor: 'pointer', fontSize: '18px', margin: '10px 20px' , marginTop: '120px'}}>로그인</button>
          <button onClick={() => navigate('/lastdance')} style={{ padding: '10px 190px', cursor: 'pointer', fontSize: '18px', margin: '10px 20px' }}>홈으로</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <h4 onClick={() => navigate('/lastdance')} style={{ cursor: 'pointer', marginLeft: '200px' }}><img src="/images/KakaoTalk_20250712_003924896.png" alt='logo' style={{width: '30px', height: 'auto', verticalAlign: 'middle', position: 'relative', top: '-3px', marginRight:'5px'}}/>블로그</h4>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          textAlign: 'center',
          marginTop: '100px',
          border: '1px solid black',
          width: '500px',
          height: '550px',
          marginLeft: '550px'
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
}import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function SigninForm({setIsLoggedIn}) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !password) {
      setWarning('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }

    try {
      const response = await fetch('/api/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setIsLoggedIn(true);
        localStorage.setItem('id', data.id);
        localStorage.setItem('nickname', data.nickname);
        navigate('/lastdance');

      } else if (response.status === 401) {
        setWarning(data.error);
      } else {
        setWarning('알 수 없는 오류가 발생했습니다.');
      }
    } catch {
      setWarning('서버에 연결할 수 없습니다.');
    }
  };

  return (
    <div>
      <div className="header" style={{position: 'relative', top: '-1px'}}>
        <h4 onClick={() => navigate('/lastdance')} style={{ cursor: 'pointer', marginLeft: '200px' }}><img src="/images/KakaoTalk_20250712_003924896.png" alt='logo' style={{width: '30px', height: 'auto', verticalAlign: 'middle', position: 'relative', top: '-3px', marginRight:'5px'}}/>블로그</h4>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          textAlign: 'center',
          marginTop: '100px',
          border: '1px solid black',
          width: '500px',
          height: '500px',
          marginLeft: '550px',
        }}
      >
        <h2 style={{ marginTop: '50px', marginBottom: '40px' }}>로그인</h2>

        <input
          type="text"
          placeholder="아이디를 입력하세요"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ width: '400px', marginBottom: '10px', padding: '8px' }}/>

        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '400px', marginBottom: '10px', padding: '8px' }}/>

        <p style={{ fontSize: '12px', color: 'red', marginBottom: '10px' }}>{warning}</p>

        <button type="submit" style={{ padding: '10px 183px', cursor: 'pointer', fontSize: '18px' }}>로그인</button>

        <div className="links" style={{ marginTop: '10px' }}>
          <span>비밀번호 찾기</span><span> | </span>
          <span>아이디 찾기</span><span> | </span>
          <span onClick={() => navigate('/lastdance/signup')} style={{ cursor: 'pointer' }}>회원가입</span>
        </div>

        <button type="button" onClick={() => navigate(-1)} style={{ marginTop: '20px', fontSize: '12px', color: 'gray', cursor: 'pointer' }}>뒤로가기</button>
      </form>
    </div>
  );
}