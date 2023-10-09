import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const QuestionPaper = () => {
  const [question, setQuestions] = useState([]);
  const [limit, setLimit] = useState(10);
  const [curr, setCurr] = useState(0);
  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await axios.get("http://localhost:3000/big5/questions");
      setQuestions(response.data);
    };

    fetchQuestion();
  }, [limit, curr]);


  const options = {
    A: "Strongly Agree",
    B: "Agree",
    C: "Neutral",
    D: "Disagree",
    E: "Strongly Disagree",
  };
  const [answers, setAnswers] = useState(Array(question.length).fill(""));

  const [isNext, setIsNext] = useState(true);
  const [isPrev, setIsPrev] = useState(true);
  const handleRadioChange = (index, option, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const OnNext = () => {
    if (limit < 50) {
      setCurr((prevCurr) => prevCurr + 10);
      setLimit((prevLimit) => prevLimit + 10);
    } else {
      setIsNext(false);
    }
  };

  const OnPrev = () => {
    setCurr((prevCurr) => prevCurr - 10);
    setLimit((prevLimit) => prevLimit - 10);
  };

  const postAnswers = async () => {
    try {
      const answersData = {
        answers: Object.values(answers),
      };

      const response = await axios.post(
        "http://localhost:3000/big5",
        answersData
      );

      localStorage.setItem("test1", JSON.stringify(response.data.career));

      console.log(response);
    } catch (error) {
      console.error("Error posting answers:", error);
    }
  };

  function questionRendering(starting, end) {
    return (
      <>
        {Object.values(question)
          .slice(starting, end)
          .map((q, index) => (
            <div
              key={index + curr}
              className="mb-6 border rounded-lg shadow-lg p-3 bg-white"
            >
              <p className="text-lg mb-2">{`${index + curr + 1}. ${q}`}</p>
              <div className="flex flex-col space-y-2">
                {Object.keys(options).map((option, optionIndex) => (
                  <label
                    key={optionIndex + curr}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      name={`question${index + curr}`}
                      value={index + curr + 1 + option}
                      className="mr-2 "
                      onChange={() =>
                        handleRadioChange(
                          index + curr,
                          option,
                          index + 1 + curr + option
                        )
                      }
                    />
                    <span className="text-sm">{option}.</span>
                    <span className="text-sm ">{options[option]}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 ">
        <h1 className="text-3xl font-semibold mb-6 ">
          Multiple Choice Questions
        </h1>
        <progress
          className="my-progress-bar"
          value={
            (answers.filter((element) => element !== undefined).length / 50) *
            100
          }
          max={100}
          min={0}
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: "green",
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {questionRendering(curr, limit)}
        </div>
        <div className="flex justify-between mt-6">
          <Link to="/Home">
            <button className="bg-gradient-to-b from-[#184272] to-[#001834] text-white px-4 py-2 rounded hover:bg-blue-600">
              Save as Draft
            </button>
          </Link>
          <div className="flex gap-5">
            {limit !== 10 && isPrev && (
              <button
                className="bg-blue-600 p-2 text-white rounded-md"
                onClick={OnPrev}
              >
                Previous Question
              </button>
            )}
            {limit < 50 && isNext && (
              <button
                className="bg-blue-600 p-2 text-white rounded-md"
                onClick={OnNext}
              >
                Next Question
              </button>
            )}
          </div>
          {(answers.filter((element) => element !== undefined).length / 50) *100 ===100 &&(
            <>
            <button
            className={`bg-[#C70039] text-white px-4 py-2 rounded `}
            onClick={postAnswers}
          >
              <Link to="/Mbti">Go to Next Test</Link>
          </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionPaper;
