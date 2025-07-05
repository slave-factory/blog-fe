import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [창, 창변경] = useState('홈')
  const [아이디, 아이디변경] = useState('')
  const [비밀번호, 비밀번호변경] = useState('')

  const 로그인 = () => {
    if (!아이디 || !비밀번호) {
      alert('아이디와 비밀번호를 모두 입력하세요.')
      return
    }
  };

  if (창 === '홈') {
    return (
      <div>
        <div className='header'>블로그<button onClick={()=> 창변경('로그인')}>로그인</button></div>
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <button onClick={() => 창변경('로그인')} style={{ fontSize: '18px', padding: '10px 20px' }}>
            로그인
          </button>
        </div>
      </div>
    );
  }

  if (창 === '로그인') {
    return (
      <div>
        <div className='header'>블로그</div>
        <div style={{ maxWidth: '300px', margin: '100px auto', textAlign: 'center' }}>
          <h2>로그인</h2>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={아이디}
            onChange={(e) => 아이디변경(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={비밀번호}
            onChange={(e) => 비밀번호변경(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <button onClick={로그인} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            로그인
          </button>

          <div className="links">
            <span>비밀번호 찾기</span>
            <span>|</span>
            <span>아이디 찾기</span>
            <span>|</span>
            <span>회원가입</span>
          </div>

          <button
            onClick={() => 창변경('홈')}
            style={{ marginTop: '20px', fontSize: '12px', color: 'gray' }}
          >
            뒤로가기
          </button>
        </div>
      </div>
    );
  }
}