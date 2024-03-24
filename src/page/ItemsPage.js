import React, {  useState ,useEffect } from 'react';

// const items = [
//   { id: 1, name: '道具1', description: '這是道具1的說明', image: 'https://i.imgur.com/Qk4cUGL.png' },
//   { id: 2, name: '道具2', description: '這是道具2的說明', image: 'https://i.imgur.com/Qk4cUGL.png' },
//   { id: 3, name: '道具3', description: '這是道具3的說明', image: 'https://i.imgur.com/Qk4cUGL.png' },
//   { id: 4, name: '道具4', description: '這是道具4的說明', image: 'https://i.imgur.com/Qk4cUGL.png' },
//   // Add more items as needed
// ];

const Item = ({ name, image }) => (
  <div style={{ margin: '10px', textAlign: 'center' }}>
    <img src={image} alt={name} style={{ width: '100px', height: '100px', marginBottom: '5px' }} />
    <div>{name}</div>
  </div>
);

function ItemsPage() {
  const [itemsData, setItemsData] = useState([]);
  useEffect(() => {

    fetch('https://azuredjangodb.azurewebsites.net/api/items/')
    .then(response => response.json())
      .then(data => {
        console.log('Completed data', data);
        if (Array.isArray(data)) {
          const formattedData = data.map(item => ({
            name: item.item_name,
            image: item.item_url
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
        <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
          {group.map((item, itemIndex) => (
            <div key={itemIndex} style={{ margin: "20px" }}>
              {item ? <Item name={item.name} image={item.image} /> : <div style={{ width: '100px', height: '100px' }}></div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
export default ItemsPage;
