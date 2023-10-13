import React from 'react';
import career from '../assets/feature2.jpg';
import accuracy from '../assets/accuracy.png';
import personality from '../assets/feature1.png';
import growth from '../assets/feature3.png';

const featuresData = [
  {
    image: career,
    title: 'Career Development',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. fugiat harum earum qui?',
  },
  {
    image: accuracy,
    title: 'Accurate Results',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. fugiat harum earum qui?',
  },
  {
    image: personality,
    title: 'Personality Analysis',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. fugiat harum earum qui?',
  },
  {
    image: growth,
    title: 'Test Conduction',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. fugiat harum earum qui?',
  },
];

const ListScope = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4 lg:px-10 mb-10 '>
      {featuresData.map((feature, index) => (
        <div
          key={index}
          className='bg-white shadow-lg p-4 rounded-lg hover:shadow-xl hover:-translate-y-5 transition-all duration-200 '
        >
          <img className='w-16 h-16 mx-auto' src={feature.image} alt={feature.title} />
          <h1 className='font-bold text-center mt-3'>{feature.title}</h1>
          <p className='text-sm text-center'>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ListScope;
