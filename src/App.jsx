import React, { useState } from 'react';

export default function App() {
  const [제목, 제목변경] = useState('');
  const [내용, 내용변경] = useState('');
  const [날짜, 날짜변경] = useState('');
  const [일기목록, 일기목록변경] = useState([]);

  const 일기추가 = () => {
    const 새일기 = {
      id: Date.now(),
      제목,
      내용,
      날짜
    };

    일기목록변경([...일기목록, 새일기]);
    제목변경('');
    내용변경('');
    날짜변경('');
  };

  const 일기삭제 = (id) => {
    일기목록변경(일기목록.filter((a) => a.id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc'}}>
      <h2> 일기장</h2>

      <input
        type="text"
        placeholder="제목"
        value={제목}
        onChange={(e) => 제목변경(e.target.value)}
        style={{ width: '100%'}}
      />
      <textarea
        placeholder="내용"
        value={내용}
        onChange={(e) => 내용변경(e.target.value)}
        rows="4"
        style={{ width: '100%'}}
      />
      <input
        type="date"
        value={날짜}
        onChange={(e) => 날짜변경(e.target.value)}
      />

      <button onClick={일기추가}>일기 추가</button>


      {일기목록.map((item) => (
        <div key={item.id}>
          <h4>{item.제목}</h4>
          <p>{item.내용}</p>
          <p>{item.날짜}</p>
          <button onClick={() => 일기삭제(item.id)}>삭제</button>
        </div>
      ))}
    </div>
  );
}