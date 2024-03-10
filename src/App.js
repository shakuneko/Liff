import logo from './logo.svg';
import './App.css';
import { TimePicker, DatePicker, Select } from 'antd';
import 'antd/dist/reset.css';
import React, { useState } from 'react';

const { Option } = Select;


function App() {
    const [task, setTask] = useState('');
    const [time, setTime] = useState(null); // 使用null代替空字符串
    const [date, setDate] = useState(null); // 使用null代替空字符串
    const [category, setCategory] = useState('');

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handleTimeChange = (value) => {
        // 设置分钟部分为 00
        const selectedTime = value ? value.clone().minute(0) : null;
        setTime(selectedTime);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 在这里处理表单提交逻辑
        console.log('任务:', task);
        console.log('时间:', time ? time.format('HH:mm:ss') : ''); // 格式化时间
        console.log('日期:', date ? date.format('YYYY-MM-DD') : ''); // 格式化日期
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
                    <TimePicker 
                    value={time} 
                    onChange={handleTimeChange} 
                    format="HH:mm" // 显示小时和分钟
                    minuteStep={60} // 设置分钟步长为60，只显示整点
                />
                </div>
                <div>
                    <label>日期:</label>
                    <DatePicker value={date} onChange={handleDateChange} />
                </div>
                <div>
                    <label>类别选择:</label>
                    <Select value={category} onChange={handleCategoryChange} style={{ width: '100%' }}>
                        <Option value="">选择类别</Option>
                        <Option value="personal">个人</Option>
                        <Option value="work">工作</Option>
                        <Option value="other">其他</Option>
                    </Select>
                </div>
                <button type="submit">完成</button>
            </form>
        </div>
    );
}

export default App;
