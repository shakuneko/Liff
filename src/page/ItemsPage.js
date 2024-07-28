import React, {  useState ,useEffect } from 'react';

// const items = [
//   { id: 1, name: '道具1', description: '這是道具1的說明', image: 'https://i.imgur.com/Qk4cUGL.png' },
//   { id: 2, name: '道具2', description: '這是道具2的說明', image: 'https://i.imgur.com/Qk4cUGL.png' },
//   { id: 3, name: '道具3', description: '這是道具3的說明', image: 'https://i.imgur.com/Qk4cUGL.png' },
//   { id: 4, name: '道具4', description: '這是道具4的說明', image: 'https://i.imgur.com/Qk4cUGL.png' },
//   // Add more items as needed
// ];

const Item = ({ name, image, description, used_gift }) => (
  <div style={{ margin: '5px', textAlign: 'center', width: '150px', position: 'relative' }}>
    {used_gift && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}></div>}
    <div style={{
      backgroundColor: '#FFD666',
      borderRadius: '10px',
      padding: '15px',
      display: 'inline-block',
      width: '100%', // 調整內容寬度為100%
      height: '100%' // 調整內容高度為100%
    }}>
      <img src={image} alt={name} style={{ width: '110px', height: '110px', marginBottom: '15px' }} />
      <div>{name}</div>
      <div style={{ marginTop: '10px', borderTop: '1px solid #FAAD14' }}>{/* 調整描述文字的大小和上邊距 */}</div>
      <div style={{ fontSize: '12px', marginTop: '10px' }}>{description}</div>
    </div>
  </div>
);

function ItemsPage() {
  const [itemsData, setItemsData] = useState([]);
  useEffect(() => {

    //fetch('https://azuredjangodb.azurewebsites.net/api/items/')
    fetch('http://127.0.0.1:8000/api/items/')
    .then(response => response.json())
      .then(data => {
        console.log('Completed data', data);
        if (Array.isArray(data)) {
          const formattedData = data.map(item => ({
            name: item.item_name,
            image: item.item_url,
            description: item.description,
            used_gift: item.used_gift
          }));
          setItemsData(formattedData);
        } else {
          console.error('Received data is not an array:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching category data:', error);
      });
    document.title = "道具一覽";
  }, []);
  

  return (
    <div>
      {itemsData.reduce((groups, item, index, array) => {
        if (index % 2 === 0) {
          groups.push([]);
        }
        groups[groups.length - 1].push(item);
        // Check if it's the last iteration and there's only one item remaining
        if (index === array.length - 1 && array.length % 2 !== 0) {
          groups[groups.length - 1].push(null); // Add a placeholder item
        }
        return groups;
      }, []).map((group, index) => (
        <div key={index} style={{ display: 'flex', justifyContent:'center'}}>
          {group.map((item, itemIndex) => (
            <div key={itemIndex} style={{ margin: "10px",marginTop:"15px"}}>
              {item ? <Item name={item.name} image={item.image} description={item.description} used_gift={item.used_gift} /> : <div style={{ width: '150px', height: '100px' }}></div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
export default ItemsPage;
