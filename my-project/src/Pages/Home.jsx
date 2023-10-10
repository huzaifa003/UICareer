import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Feature from '../Components/Features';
import testImg from '../assets/feature3.png';
import careerImg from '../assets/career.jpg';
import personality from '../assets/personality.jpg'
import collaboration from '../assets/collaboration.jpg'
import Footer from '../Components/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app, auth } from '../Components/FirebaseAuth';
const featuresData = [
  {
    img: testImg,
    title: 'Test Conduction',
    content:
      "Taking a career test plays a crucial role in shaping a student's future. These tests are invaluable tools that offer students insights into their strengths, weaknesses, and interests...",
    isRev: false,
    btnText: 'Give Test',
  },
  {
    img: careerImg,
    title: 'Career Guide',
    content:
      'A career guide is a valuable resource that offers expert advice and information to help individuals make informed decisions about their professional paths...',
    isRev: true,
    btnText: 'Get Career Suggestion',
  },
  {
    img: personality,
    title: 'Personality Analysis',
    content:
      'A career guide is a valuable resource that offers expert advice and information to help individuals make informed decisions about their professional paths...',
    isRev: false,
    btnText: 'Analyse your Personality',
  },
  {
    img: collaboration,
    title: 'Students Collaboration',
    content:
      'A career guide is a valuable resource that offers expert advice and information to help individuals make informed decisions about their professional paths...',
    isRev: true,
    btnText: 'Analyse your Personality',
  },
];

const Home = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(auth.currentUser.email);
        setEmail(auth.currentUser.email);
        // ...
      } else {
        // User is signed out
        // ...
        navigate("/")
      }
    });
  },[])
  return (
    <div>
      <Navbar />
      <Hero />
      {featuresData.map((feature, uniqueKey) => (
        <Feature key={uniqueKey} {...feature} />
      ))}
      <Footer/>
    </div>
  );
};

export default Home;
