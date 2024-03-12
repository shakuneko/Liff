import './App.css';
import { TimePicker, DatePicker, Select, Modal } from 'antd';
import 'antd/dist/reset.css';
import React, { useState, useEffect } from 'react';
import liff from '@line/liff'; // 引入 LIFF SDK

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
        
        try {
            const data = {
                task: task,
                time: time ? time.format('HH:mm:ss') : '',
                date: date ? date.format('YYYY-MM-DD') : '',
                category: category
            };

            // 使用 LIFF 发送数据到 Django 后端
            if (liff.isInClient()) {
                await liff.sendMessages([
                    {
                        'type': 'text',
                        'text': JSON.stringify(data)
                    }
                ]);
            } else {
                console.log('Not in LIFF');
            }

            setModalMessage('任务清单已发送');
            setModalSuccess(true);
            setModalVisible(true);

            // 在这里处理成功的响应，例如重置表单等
            setTask('');
            setTime(null);
            setDate(null);
            setCategory('');
        } catch (error) {
            console.error('Error submitting form:', error);

            setModalMessage('发送失败');
            setModalSuccess(false);
            setModalVisible(true);
        }
    };

    useEffect(() => {
        document.title = "任务清单";

        // 初始化 LIFF
        initializeLiff();
    }, []);

    // 初始化 LIFF
    const initializeLiff = async () => {
        try {
            await liff.init({ liffId: '2002705912-5lZb9dKB' });
        } catch (error) {
            console.error('LIFF 初始化失败:', error.message);
        }
    };

    return (
        <div className="contain">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>任务名称</label>
                    <input type="text" className="form-input" value={task} onChange={handleTaskChange} />
                </div>
                <div className="form-group">
                    <label>日期</label>
                    <DatePicker value={date} className="form-input" onChange={handleDateChange} placeholder="选择日期"/>
                </div>
                <div className="form-group">
                    <label>预计执行时间</label>
                    <TimePicker value={time} className="form-input" onChange={handleTimeChange} format="HH:mm" placeholder="选择时间" minuteStep={60} />
                </div>
                <div className="form-group">
                    <label>类别</label>
                    <Select value={category} className="form-select"  onChange={handleCategoryChange}>
                        <Option value="" >选择类别</Option>
                        <Option value="personal">日常</Option>
                        <Option value="school">学校</Option>
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
                title={modalSuccess ? "成功" : "失败"}
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
