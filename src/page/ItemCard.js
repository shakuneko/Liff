import React from 'react';

const ItemCard = ({ name, description, image }) => (
  <div style={styles.card}>
    <img src={image} alt={name} style={styles.image} />
    <div style={styles.details}>
      <h2 style={styles.name}>{name}</h2>
      <p style={styles.description}>{description}</p>
    </div>
  </div>
);

const styles = {
  card: {
    backgroundColor: '#FFF',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '300px',
    margin: 'auto',
    marginTop: '50px',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
  },
  details: {
    marginTop: '20px',
  },
  name: {
    margin: '0',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    margin: '10px 0',
    fontSize: '16px',
    color: '#666',
  },
};

const ItemPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>道具介紹</h1>
      <ItemCard
        name="道具名稱"
        description="這是道具的簡要說明。"
        image="https://example.com/item-image.jpg"
      />
    </div>
  );
};

export default ItemPage;
