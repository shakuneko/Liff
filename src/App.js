import './App.css';
import { TimePicker, DatePicker, Select } from 'antd';
import 'antd/dist/reset.css';
import React, { useState, useEffect } from 'react';
import liff from '@line/liff'; // 引入 LIFF SDK
const { Option } = Select;

function App() {
    const [task, setTask] = useState('');
    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null);
    const [category, setCategory] = useState('');
    // const [modalVisible, setModalVisible] = useState(false);
    // const [modalMessage, setModalMessage] = useState('');
    // const [modalSuccess, setModalSuccess] = useState(true); // 默认为发送成功

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
        try {
            const data = {
                task: task,
                time: time ? time.format('HH:mm') : '',
                date: date ? date.format('YYYY/MM/DD') : '',
                category: category
            };
            const message = `新增任務\n任務名稱：${data.task}\n日期：${data.date}\n預計執行時間：${data.time}\n類別：${data.category}`;
            // 使用 LIFF 发送数据到 Django 后端
            if (liff.isInClient()) {
                await liff.sendMessages([
                    {
                        'type': 'text',
                        'text': message
                    }
                ]);
            } else {
                console.log('Not in LIFF');
            }
            // setModalMessage('任務清單已完成');
            // setModalSuccess(true);
            // setModalVisible(true);
            window.alert("成功新增任務！");
            liff.closeWindow();
            // 在这里处理成功的响应，例如重置表单等
            setTask('');
            setTime(null);
            setDate(null);
            setCategory('');
        } catch (error) {
            console.error('Error submitting form:', error);
            window.alert("Error sending message: " + error);
            // setModalMessage('失敗嗚嗚嗚');
            // setModalSuccess(false);
            // setModalVisible(true);
        }
    };

    useEffect(() => {
        document.title = "任務清單";
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
                    <label>任務名稱</label>
                    <input type="text" className="form-input" value={task} onChange={handleTaskChange} />
                </div>
                <div className="form-group">
                    <label>日期</label>
                    <DatePicker value={date} className="form-input" onChange={handleDateChange} placeholder="選擇日期"/>
                </div>
                <div className="form-group">
                    <label>預計執行時間</label>
                    <TimePicker value={time} className="form-input" onChange={handleTimeChange} format="HH:mm" placeholder="選擇時間"minuteStep={60} />
                </div>
                <div className="form-group">
                    <label>類別</label>
                    <Select value={category} className="form-select"  onChange={handleCategoryChange}>
                        <Option value="" >選擇類別</Option>
                        <Option value="日常">日常</Option>
                        <Option value="學校">學校</Option>
                        <Option value="工作">工作</Option>
                        <Option value="其他">其他</Option>
                    </Select>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn-finish">完成</button>
                </div>
                
            </form>
            
            {/* 成功发送数据的模态框 */}
            {/* <Modal
                title={modalSuccess ? "成功" : "失敗"}
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
            >
                <p>{modalMessage}</p>
            </Modal> */}
        </div>
    );
}

export default App;
