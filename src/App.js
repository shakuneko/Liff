import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const handleTaskChange = (e) => {
      setTask(e.target.value);
  };

  const handleTimeChange = (e) => {
      setTime(e.target.value);
  };

  const handleDateChange = (e) => {
      setDate(e.target.value);
  };

  const handleCategoryChange = (e) => {
      setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      // 在这里处理表单提交逻辑
      console.log('任务:', task);
      console.log('时间:', time);
      console.log('日期:', date);
      console.log('类别:', category);
  };

  return (
      <div>

          <form onSubmit={handleSubmit}>
              <div>
                  <label>任务清单:</label>
                  <input type="text" value={task} onChange={handleTaskChange} />
              </div>
              <div>
                  <label>时间:</label>
                  <input type="time" value={time} onChange={handleTimeChange} />
              </div>
              <div>
                  <label>日期:</label>
                  <input type="date" value={date} onChange={handleDateChange} />
              </div>
              <div>
                  <label>类别选择:</label>
                  <select value={category} onChange={handleCategoryChange}>
                      <option value="">选择类别</option>
                      <option value="personal">个人</option>
                      <option value="work">工作</option>
                      <option value="other">其他</option>
                  </select>
              </div>
              <button type="submit">完成</button>
          </form>
      </div>
  );
}

export default App;
