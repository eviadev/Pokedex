import React from 'react';
import './styles/DetailView.css';

const DetailView = ({ pokemon }) => {
  const { name, sprite, type, weight, height, abilities, stats } = pokemon;
  console.log(stats);
  return (
    <section className="detail-view">
      <img src={sprite} className='sprite-image' alt="sprite"/>
      <div className='data-wrapper'>
        <h1 className='data-name'>Nom: {name}</h1>
        <p className="data-char">Type: {type}</p>
        <p className="data-char">Poids: {weight} kg</p>
        <p className="data-char">Taille: {height}</p>
        <p className="data-char">Abilities: {abilities}</p>
      </div>
    </section>
  )
}

export default DetailView;