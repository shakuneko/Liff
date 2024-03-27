import 'chart.js/auto'; // 导入 chart.js 库
import React, {  useState,useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Segmented } from 'antd';
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [taskData, setTaskData] = useState({
    completed: 0,
    notCompleted: 0
  });
  const [categoryCounts, setCategoryCounts] = useState({
    school: 0,
    work: 0,
    daily: 0,
    other: 0,
  });

  useEffect(() => {

    fetch('https://azuredjangodb.azurewebsites.net/api/tasks/')
    //fetch('http://127.0.0.1:8000/api/tasks/')
    .then(response => response.json())
      .then(data => {
        console.log('Completed data', data);
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayString = `${year}-${month}-${day}`; // 获取 ISO 8601 格式的日期字符串，如 "2024-03-25"

        // 初始化完成和未完成任务的计数器
        let completedTasks = 0;
        let notCompletedTasks = 0;

        // 遍历数据并根据日期判断任务是否是今天的任务
        data.forEach(task => {
          if (task.date === todayString) {
            if (task.completed) {
              completedTasks++;
            } else {
              notCompletedTasks++;
            }
          }
      })
      // 设置任务数据状态
      setTaskData({
        completed: completedTasks,
        notCompleted: notCompletedTasks
      });
      console.log('Completed', completedTasks);
        // 算類別數量
        let schoolCount = 0;
        let workCount = 0;
        let dailyCount = 0;
        let otherCount = 0;
    
        data.forEach(item => {
          if (item.date === todayString) {
            switch (item.category) {
              case '學校':
                schoolCount++;
                break;
              case '工作':
                workCount++;
                break;
              case '日常':
                dailyCount++;
                break;
              case '其他':
                otherCount++;
                break;
              default:
                break;
            }
          }
        });
          
        // 更新狀態
        setCategoryCounts({
          school: schoolCount,
          work: workCount,
          daily: dailyCount,
          other: otherCount,
        });
      })
      .catch(error => {
        console.error('Error fetching category data:', error);
      });
    document.title = "統計圖表";
  }, []);
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
          school={categoryCounts.school}
          work={categoryCounts.work}
          daily={categoryCounts.daily}
          other={categoryCounts.other}
        />
      </div>
    </div>
      <div style={{ marginTop: "0px", textAlign: "center" }}>
        <p>目前的任務總數：{totalTasks}</p>
      </div>
    </div>
  );
};

export default RecordPage;