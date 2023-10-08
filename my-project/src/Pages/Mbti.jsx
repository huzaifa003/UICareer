import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Mbti = () => {
  const [questions, setQuestions] = useState(null);
  const answersDict = {};

  const handleRadioChange = (index, value) => {
    answersDict[index + 1] = value;
    console.log(answersDict);
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await axios.get("http://localhost:3001/mbti/questions");
      console.log(response.data);
      setQuestions(response.data);
    };
    fetchQuestion();
  }, []);

  const postAnswers = async () => {
    try {
      const answers = Object.values(answersDict);
      const response = await axios.post("http://localhost:3001/mbti", {
        answers,
      });

       localStorage.setItem("test2",JSON.stringify(response.data.career))
      console.log(response);
    } catch (error) {
      console.error("Error posting answers:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {questions ? (
        questions.map((question, index) => (
          <div key={index} className="mb-6 p-4 border rounded-lg shadow-md">
          <div className="flex gap-5">
          <h1 className="text-xl font-semibold mb-2">{question.number}</h1>
            <p className="mb-4">{question.question}</p>
          </div>
            
            <div className="flex flex-col space-y-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question${index}`}
                  value={question.number + "A"}
                  className="mr-2"
                  onChange={() => handleRadioChange(index, question.number + "A")}
                />
                {question["A"]}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question${index}`}
                  value={question.number + "B"}
                  className="mr-2"
                  onChange={() => handleRadioChange(index, question.number + "B")}
                />
                {question["B"]}
              </label>
            </div>
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}
      <div className="flex justify-between mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <Link to="/Home">Save as Draft</Link>
        </button>
        <button
          className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
            Object.values(answersDict).includes("") ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={Object.values(answersDict).includes("")}
          onClick={postAnswers}
        >
          {Object.values(answersDict).includes("") ? (
            "Please Complete the test"
          ) : (
            <Link to="/Disc">View Result</Link>
          )}
        </button>
      </div>
    </div>
  );
};

export default Mbti;
