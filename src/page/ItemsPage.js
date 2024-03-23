import React, { useEffect } from 'react';

const items = [
  { id: 1, name: '道具1', description: '這是道具1的說明', image: 'https://i.imgur.com/Qk4cUGL.png' },
  { id: 2, name: '道具2', description: '這是道具2的說明', image: 'https://i.imgur.com/Qk4cUGL.png' },
  { id: 3, name: '道具3', description: '這是道具3的說明', image: 'https://i.imgur.com/Qk4cUGL.png' },
  { id: 4, name: '道具4', description: '這是道具4的說明', image: 'https://i.imgur.com/Qk4cUGL.png' },
  // Add more items as needed
];

const Item = ({ name, image }) => (
  <div style={{ margin: '10px', textAlign: 'center' }}>
    <img src={image} alt={name} style={{ width: '100px', height: '100px', marginBottom: '5px' }} />
    <div>{name}</div>
  </div>
);

function ItemsPage() {
  useEffect(() => {
    document.title = "道具列表";
  }, []);

  const groupedItems = items.reduce((acc, item, index) => {
    const groupIndex = Math.floor(index / 2);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(item);
    return acc;
  }, []);

  return (
    <div>
      {groupedItems.map((group, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
          {group.map(item => (
            <div style={{ margin: "20px" }}>
            <Item
              key={item.id}
              name={item.name}
              image={item.image}
            />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ItemsPage;
