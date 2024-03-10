import logo from './logo.svg';
import './App.css';
import { TimePicker, DatePicker, Select } from 'antd';
import 'antd/dist/reset.css';
import React, { useState,useEffect } from 'react';

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
        console.log('任務:', task);
        console.log('時間:', time ? time.format('HH:mm:ss') : ''); // 格式化时间
        console.log('日期:', date ? date.format('YYYY-MM-DD') : ''); // 格式化日期
        console.log('類別:', category);
    };
    useEffect(() => {
        document.title = "任務清單";
    }, []);
    
    return (
        <div className="contain">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>任務名稱</label>
                    <input type="text" className="form-input" value={task} onChange={handleTaskChange} />
                </div>
                <div className="form-group">
                    <label>日期</label>
                    <DatePicker value={date} className="form-input" onChange={handleDateChange} placeholder="選擇日期"/>
                </div>
                <div className="form-group">
                    <label>預計執行時間</label>
                    <TimePicker value={time} className="form-input" onChange={handleTimeChange} format="HH:mm" placeholder="選擇時間"/>
                </div>
                <div className="form-group">
                    <label>類別</label>
                    <Select value={category} className="form-select"  onChange={handleCategoryChange}>
                        <Option value="" >選擇類別</Option>
                        <Option value="personal">日常</Option>
                        <Option value="school">學校</Option>
                        <Option value="work">工作</Option>
                        <Option value="other">其他</Option>
                    </Select>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn-finish">完成</button>
                </div>
            </form>
        </div>
    );
}

export default App;
