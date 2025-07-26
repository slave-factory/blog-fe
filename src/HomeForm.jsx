import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

export default function HomeForm({ isLoggedIn , setIsLoggedIn }) {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
  const storedId = localStorage.getItem('id');
  const storedNickname = localStorage.getItem('nickname');

  setId(storedId || '');
  setNickname(storedNickname || '');

  if (storedId && storedNickname) {
    setIsLoggedIn(true);
  }
}, [setIsLoggedIn]);

useEffect(() => {
  fetch('https://69eb0af8e685.ngrok-free.app/api/posts',{
    method: 'GET'
  })
    .then(res => {
      if (res.status === 200) return res.json();
      throw new Error('서버 응답 오류');
    })
    .then(data => {
      setPosts(data);
    })
    .catch(err => {
      setError('게시물을 불러 올 수 없습니다.');
    });
}, []);

  
  const indexOfLastPost = currentPage * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / 10);

  const renderPageNumbers = () => {
    const pageGroupSize = 5;
    const currentGroup = Math.ceil(currentPage / pageGroupSize);
    const startPage = (currentGroup - 1) * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

    const numbers = [];

    if (startPage > 1) {
      numbers.push(
        <button key="prev" onClick={() => setCurrentPage(startPage - 1)} style={pageButtonStyle}>
          &lt; 이전
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      numbers.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        style={{
          margin: '0 6px',
          padding: '4px 8px',
          border: i === currentPage ? '1px solid #000' : 'none',
          background: 'none',
          color: i === currentPage ? '#000' : '#666',
          fontWeight: i === currentPage ? 'bold' : 'normal',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        {i}
      </button>
      );
    }

    if (endPage < totalPages) {
      numbers.push(
        <button key="next" onClick={() => setCurrentPage(endPage + 1)} style={pageButtonStyle}>
          다음 &gt;
        </button>
      );
    }

    return numbers;
  };

  const pageButtonStyle = {
    margin: '0 4px',
    padding: '4px 10px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#666',
    border: 'none'
  };
  const handleLogout = () => {
    fetch('https://69eb0af8e685.ngrok-free.app/api/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      localStorage.removeItem('id');
      localStorage.removeItem('nickname');
      setIsLoggedIn(false);
      navigate('/lastdance');
    });
  };

  return (
    <div>
      <div className='header'>
        <h4 onClick={() => navigate('/lastdance')} style={{ cursor: 'pointer', marginLeft: '200px'}}>
          <img src="/images/KakaoTalk_20250712_003924896.png" alt='logo' style={{ width: '30px', height: 'auto', verticalAlign: 'middle', position: 'relative', top: '-3px', marginRight: '5px' }} />
          블로그
        </h4>

        {isLoggedIn ? (
          <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', color: 'white', cursor: 'pointer',verticalAlign: 'middle',position: 'relative', top: '-4px', whiteSpace: 'nowrap',display: 'inline-block', marginLeft: '880px'}}>{nickname}님</span>
        ) : (
          <button onClick={() => navigate('/lastdance/login')} style={{ marginLeft: '880px', cursor: 'pointer' }}>로그인</button>
        )}
      </div>

      <div style={{ display: 'flex', marginLeft:'250px', marginTop: '150px' }}>
        <div style={{ width: '800px' }}>
          <h3 style={{ fontWeight: 'bold', textAlign: 'center', marginTop:'10px' }}>The Last Dance 게시글</h3>
          <hr style={{ borderTop: '3px solid gray', marginBottom: '50px'}} />

          {posts.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', fontSize: '15px' }}>{error}</p>
          ) : (
            currentPosts.map((post) => (
              <div key={post.id} style={{ padding: '16px', marginTop: '-20px'}}>
                <p style={{ fontSize: '14px', color: '#555' }}><img src="/images/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.png" alt='author' style={{ width: '30px', height: 'auto', verticalAlign: 'middle', position: 'relative', top: '-3px', marginRight: '5px' }} />{post.author}</p>
                <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' , cursor:'pointer'}}>{post.title}</h3>
                <p style={{ marginBottom: '10px' ,fontSize: '15px', cursor:'pointer'}}>{post.content}</p>
                </Link>
                <p style={{fontSize:'12px', color:'#666', marginTop: '30px'}}>좋아요 10   댓글 10</p>
                <hr style={{ borderTop: '1px solid #666', margin: '20px 0' , marginTop: '50px'}} />
              </div>
            ))
          )}

          <div style={{ textAlign: 'center', marginTop: '30px' , marginBottom: '100px'}}>
            {renderPageNumbers()}
          </div>
        </div>

        <div style={{ textAlign: 'center', border: '1px solid black', padding: '20px', width: '220px', height: '120px',  marginLeft: '20px'}}>
          {isLoggedIn ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' ,marginTop:'-20px'}}>
              <p style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginBottom: '10px'}}>{nickname}님</p>

              <img
                src="/images/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.png"
                alt="img"
                style={{ width: '50px', height: 'auto', marginBottom: '20px' }}
              />

              <div>
                <button style={{ margin: '2px', cursor: 'pointer' }}>글쓰기</button>
                <button style={{ margin: '2px', cursor: 'pointer' }} onClick={handleLogout}>로그아웃</button>
              </div>
            </div>
          ) : (
            <div>
              <button onClick={() => navigate('/lastdance/login')} style={{ fontSize: '18px', padding: '10px 70px', marginTop: '10px', cursor: 'pointer' }}>로그인</button>
              <div className="links">
                <span>비밀번호 찾기</span><span>|</span>
                <span>아이디 찾기</span><span>|</span>
                <span onClick={() => navigate('/lastdance/signup')} style={{ cursor: 'pointer' }}>회원가입</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}