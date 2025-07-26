import React, { useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);        // 글을 하나의 post로 묶어 array의 한 요소로 관리. 글 하나의 여러 정보들은 딕셔너리로 저장할 예정.
  const [title, setTitle] = useState('');        // 사용자가 입력할 제목과 내용을 state에 저장
  const [content, setContent] = useState('');    

  const [userInformation] = useState({                // 사용자의 기본 정보(이름, 아이디, 별명)을 여기에 받아옴. 로그인을 하고 얻은 정보(자신의 기본키)가 여기에 들어갈 것. 서버에서 받아와야 하는 정보이고, 일단은 빈 값으로 설정해놓음.
    name: '',
    userId: '',
    nickname: '',
  });

  function Upload() {                // <글 업로드 함수>

    if (!title || !content) {                  // 빈 값 입력 방지
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const now = new Date();                    // 글 정보 중, 날짜

    const newPost = {                           
      title,
      content,
      timestamp : now.toLocaleString(),
      other: {                                 // 이름, 이이디, 별명 등 사용자의 기본키는 other 로 따로 구별해서 하나로 묶어놓기
        name: userInformation.name,
        userId: userInformation.userId,
        nickname: userInformation.nickname,
      },
    };

    setPosts([...posts, newPost]); 

    setTitle('');                             // 입력받을 값 다시 초기화 
    setContent('');
  };

  return (
    <div className="app_container">
      <h2>글 작성</h2>

      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input_field"
      />

      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textarea_field"
      />

      <button onClick={Upload} className="upload_button">업로드</button>

      <hr className="divider" />

      <h3>작성된 글</h3>                  {/* 작성된 글 카드를 밑에 띄움 */}
      {posts.map((post, index) => (
        <div key={index} className="post_card">   {/* 각 카드의 키는 index 값으로 지정 */}
          <h4>{post.title}</h4>
          <p>{post.content}</p>
          <small>작성 시각: {post.time}</small>          
          <br />
          <small>
            작성자: {post.other.name || '이름 없음'} /{' '}
            {post.other.userId || '아이디 없음'} /{' '}
            {post.other.nickname || '별명 없음'}
          </small>
        </div>
      ))}
    </div>
  );
}

export default App;