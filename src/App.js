import './App.css';
import { TimePicker, DatePicker, Select, Modal } from 'antd';
import 'antd/dist/reset.css';
import React, { useState, useEffect } from 'react';

const { Option } = Select;

function App() {
    const [task, setTask] = useState('');
    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null);
    const [category, setCategory] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalSuccess, setModalSuccess] = useState(true); // 默认为发送成功

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handleTimeChange = (value) => {
        const selectedTime = value ? value.clone().minute(0) : null;
        setTime(selectedTime);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit button clicked')
        const data = {
            task: task,
            time: time ? time.format('HH:mm:ss') : '',
            date: date ? date.format('YYYY-MM-DD') : '',
            category: category
        };

        try {
            const response = await fetch('/api/tasks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setModalMessage('任務清單已完成');
            setModalSuccess(true);
            setModalVisible(true);

            // 在这里处理成功的响应，例如重置表单等
            setTask('');
            setTime(null);
            setDate(null);
            setCategory('');
        } catch (error) {
            console.error('Error submitting form:', error);

            setModalMessage('失敗嗚嗚嗚');
            setModalSuccess(false);
            setModalVisible(true);
        }
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
            
            {/* 成功发送数据的模态框 */}
            <Modal
                title={modalSuccess ? "成功" : "失敗"}
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
            >
                <p>{modalMessage}</p>
            </Modal>
        </div>
    );
}

export default App;
