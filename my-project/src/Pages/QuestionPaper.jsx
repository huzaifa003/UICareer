import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import axios from 'axios'

const QuestionPaper = () => {

  const [question, setQuestions] = useState([])

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await axios.get('http://localhost:3000/big5/questions')
      setQuestions(response.data)
    }
    fetchQuestion()
  }, [])
  const answersDict = {};
  const options = {"A": "Strongly Agree", "B": "Agree", "C": "Neutral", "D": "Disagree","E": "Strongly Disagree"};
  const [answers, setAnswers] = useState(Array(question.length).fill(""));  
  const handleRadioChange = (index, option, value) => {
   answersDict[index+1] = value;
   console.log(answersDict);
  };

  const isCompleteButtonDisabled = answers.includes("");

  const postAnswers = async () => {
    try {
      const answers = Object.values(answersDict);
      // Create an object to hold the answers and any other necessary data
      const answersData = {
        answers: answers, // Your array of answers
   
      };
      const arrayAnswers = [];
      const keys = Object.keys(answers);

      const response = await axios.post('http://localhost:3000/big5', {answers});
      
     
      localStorage.setItem("test1",  JSON.stringify(response.data.career))//now checkmujhe confirm nahen

      console.log(response);
    } catch (error) {
      console.error('Error posting answers:', error);
    }
  };
// we cant use props as it uses routers 

  return (
    <>
       <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-6">Multiple Choice Questions</h1>
        {Object.values(question).map((q, index) => (
          <div key={index} className="mb-6 border rounded-lg shadow-lg p-3">
            <p className="text-lg mb-2">{`${index + 1}. ${q}`}</p>
            <div className="flex flex-col space-y-2">
              {Object.keys(options).map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question${index}`}
                    value={(index + 1) + option}
                    className="mr-2"
                    onChange={() => handleRadioChange(index, option, (index + 1) + option)}
                  />
                  <span className="text-sm">{option}.</span>
                  <span className="text-sm ">{options[option]}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <Link to='/Home'>Save as Draft</Link>
          </button>
          <button
            className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
              isCompleteButtonDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isCompleteButtonDisabled}
            onClick={postAnswers}
          >
            {isCompleteButtonDisabled ? (
              <>Please Complete the test</>
            ) : (
              <Link to="/Mbti" >View Result</Link>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default QuestionPaper;
