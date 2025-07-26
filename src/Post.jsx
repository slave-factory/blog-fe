import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Post({isLoggedIn}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState('');

  const nickname = localStorage.getItem('nickname');

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!commentInput.trim()) {
      setCommentError('댓글을 입력해주세요.');
      return;
    }

    const newComment = {
      postId: Number(id), 
      nickname: nickname, 
      content: commentInput 
    };

    fetch('https://69eb0af8e685.ngrok-free.app/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    })
      .then(res => {
        if (res.status === 201) {
          setCommentError('')
          return res.json();
        } else {
          throw new Error('서버 오류가 발생했습니다.');
        }
      })
      .then((data) => {
        setComments(prev => [...prev, data]);
        setCommentInput(''); 
      })
      .catch(err => {
        setCommentError('댓글 작성에 실패했습니다.');
        console.error(err);
      });
  };

  useEffect(() => {
    fetch(`https://69eb0af8e685.ngrok-free.app/api/posts/${id}`,{
      method: 'GET'
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 404) {
          throw new Error('게시물이 존재하지 않습니다.');
        } else {
          throw new Error('서버 오류가 발생했습니다.');
        }
      })
      .then(data => setPost(data))
      .catch(err => setError('게시물을 불러 올 수 없습니다'));
  }, [id]);

    useEffect(() => {
    fetch(`https://69eb0af8e685.ngrok-free.app/comments?postId=${id}`,{
      method: 'GET'
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('댓글을 불러오는 데 실패했습니다.');
        }
      })
      .then(data => setComments(data))
      .catch(err => {
        console.error(err);
      });
  }, [id]);

return (
    <div>
      <div className='header'>
        <h4 onClick={() => navigate('/lastdance')} style={{ cursor: 'pointer', marginLeft: '200px'}}>
          <img src="/images/KakaoTalk_20250712_003924896.png" alt='logo' style={{ width: '30px', height: 'auto', verticalAlign: 'middle', position: 'relative', top: '-3px', marginRight: '5px' }} />
          블로그
        </h4>
        {isLoggedIn ? (
          <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', color: 'white', cursor: 'pointer', verticalAlign: 'middle', position: 'relative', top: '-4px', whiteSpace: 'nowrap', display: 'inline-block', marginLeft: '880px' }}>{nickname}님</span>
        ) : (
          <button onClick={() => navigate('/lastdance/login')} style={{ marginLeft: '880px', cursor: 'pointer' }}>로그인</button>
        )}
      </div>

      <main style={{ padding: '20px' }}>
        {error ? (
          <div style={{ marginTop: '150px', textAlign:'center', fontSize:'20px'}}>
            <img src='/images/다운로드.png' alt='error' style={{width:'300px', height:'auto'}}/>
            <p style={{fontSize:'16px'}}>{error}</p>
          </div>
        ) : (
          <div style={{marginTop:'80px'}}>
            <h1 style={{marginBottom:'40px', textAlign: 'center'}}>{post?.title}</h1>
            <p style={{fontSize:'14px'}}>
              <img src='/images/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.png' alt='img' style={{width:'25px', height:'auto', verticalAlign: 'middle', position: 'relative', top: '-3px'}}/> {post?.author}
              <span style={{ marginLeft: '20px' , color: '#666'}}>
                {post ? new Date(post.createdAt).toLocaleString() : ''}
              </span>
            </p>
            <hr />
            <div style={{ marginTop: '50px', whiteSpace: 'pre-wrap' , height:'500px', textAlign: 'center'}}>{post?.content}</div>
            <hr />
          </div>
        )}
      </main>
      <form onSubmit={handleCommentSubmit} style={{ marginTop: '40px' , marginLeft: '155px'}}>
        <div style={{  marginBottom: '100px' , width: '1220px'}}>
          <h4 style={{ marginBottom: '40px' }}>댓글 {comments.length}개</h4>
          {comments.length === 0 ? (
            <p style={{ fontSize: '14px', color: '#666' }}>아직 댓글이 없습니다.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '14px' }}><img src='/images/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.png' alt='img' style={{width:'25px', height:'auto', verticalAlign: 'middle', position: 'relative', top: '-2px', marginRight: '8px'}}/>{comment.nickname}</p>
                <p style={{ fontSize: '14px' }}>{comment.content}</p>
                <p style={{ fontSize: '12px', color: '#999' }}>{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="댓글을 입력하세요"
          style={{ width: '1200px', height: '80px', padding: '10px', resize: 'none' }}
        />
        <p style={{ fontSize: '12px', color: 'red', marginBottom: '10px' , marginLeft: '30px'}}>{commentError}</p>
        <button type="submit" style={{ marginTop: '10px', padding: '8px 16px', marginBottom:'100px', marginLeft: '30px'}}>댓글 작성</button>
      </form>
    </div>
  );
}