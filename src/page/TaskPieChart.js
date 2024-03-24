import 'chart.js/auto'; // 导入 chart.js 库
import React, {  useState,useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { DatePicker, Segmented } from 'antd';
import 'antd/dist/reset.css';
const TaskPieChart = ({ completed, notCompleted }) => {
  const data = {
    labels: ['已完成', '未完成'],
    datasets: [
      {
        data: [completed, notCompleted],
        backgroundColor: ['#FFD666', '#D9D9D9'],
        hoverBackgroundColor: ['#FFD666', '#D9D9D9'],
      },
    ],
  };

  const options = {
    layout: {
      padding:0
    },
    cutout: '60%', // 设置内环半径，创建圆环
    plugins: {
      legend: {
        position: 'right', // 设置标签位置为右侧
      },
      // title: {
      //   display: true,
      //   text: '任务完成情况', // 标题内容
      //   position: 'bottom', // 将标题放置在底部
      // },
    },
  };


  return <Pie data={data} options={options} width={100} height={100} />;
};

const CategoryPieChart = ({ school, work, daily, other }) => {
  const data = {
    labels: ['學校', '工作', '日常', '其他'],
    datasets: [
      {
        data: [school, work, daily, other],
        backgroundColor: ['#FFD666', '#597EF7', '#ADC6FF', '#FFE58F'],
        hoverBackgroundColor: ['#FFD666', '#597EF7', '#ADC6FF', '#FFE58F'],
      },
    ],
  };

  const options = {
    cutout: '60%', // 设置内环半径，创建圆环
    plugins: {
      legend: {
        position: 'right', // 设置标签位置为右侧
      },
    },
  };
  
  return <Pie data={data} options={options} width={100} height={100} />;
};

const RecordPage = () => {
  // const [viewMode, setViewMode] = useState('daily');
  const [viewMode, setViewMode] = useState('daily');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    document.title = "詳細資訊";
  }, []);

  // 模拟数据
  const taskData = {
    completed: 20,
    notCompleted: 10,
  };

  const categoryData = {
    school: 5,
    work: 10,
    daily: 8,
    other: 7,
  };
  const totalTasks = taskData.completed + taskData.notCompleted;
  const handlePreviousDay = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate);
  };

  const handleNextDay = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
  };
  return (
    <div>
        <Segmented style={{marginTop:"10px"}}options={['日圖表', '月圖表']} block />
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center',marginTop:'16px' }}>
        <img src="https://imgur.com/kfxWnnH.png" alt="previous" style={{ width: '24px', height: '24px', cursor: 'pointer' }} onClick={handlePreviousDay} />
          <div>{currentDate.toLocaleDateString()}</div>
        <img src="https://imgur.com/4VKUp20.png" alt="next" style={{ width: '24px', height: '24px', cursor: 'pointer' }} onClick={handleNextDay} />
      </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: "300px", height: "300px" }}>
        <TaskPieChart
          completed={taskData.completed}
          notCompleted={taskData.notCompleted}
        />
      </div>
      
      <div style={{ width: "300px", height: "300px" }}>
        <CategoryPieChart
          school={categoryData.school}
          work={categoryData.work}
          daily={categoryData.daily}
          other={categoryData.other}
        />
      </div>
    </div>
      <div style={{ marginTop: "0px", textAlign: "center" }}>
        <p>目前完成的任務總數：{totalTasks}</p>
      </div>
    </div>
  );
};

export default RecordPage;