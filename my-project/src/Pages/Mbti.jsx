import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Mbti = () => {
  const [questions, setQuestions] = useState(null);
  const [answersDict, setAnswersDict] = useState({});
  const [curr, setCurr] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isNext, setIsNext] = useState(true);
  const [isPrev, setIsPrev] = useState(true);

  // Function to update the answersDict when a radio button is changed
  const handleRadioChange = (index, value) => {
    setAnswersDict((prevAnswersDict) => ({
      ...prevAnswersDict,
      [index]: {
        questionNumber: index,
        answer: value,
      },
    }));
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await axios.get("http://localhost:3001/mbti/questions");
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
      console.log(response);
      localStorage.setItem("test2", JSON.stringify(response.data.career));
    } catch (error) {
      console.error("Error posting answers:", error);
    }
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

  function questionRendering(starting, ending) {
    return (
      <>
        {questions ? (
          questions.slice(starting, ending).map((question, index) => {
            const answerKey = index + curr;
            return (
              <div key={answerKey} className="mb-6 p-4 border rounded-lg shadow-md">
                <div className="flex gap-5">
                  <h1 className="text-xl font-semibold mb-2">{question.number}</h1>
                  <p className="text-md font-semibold mb-4">{question.question}</p>
                </div>

                <div className="flex flex-col space-y-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`question${answerKey}`}
                      value={question.number + "A"}
                      className="mr-2"
                      onChange={() => handleRadioChange(answerKey, question.number + "A")}
                      checked={answersDict[answerKey]?.answer === question.number + "A"}
                    />
                    <p className="text-sm">{question["A"]}</p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`question${answerKey}`}
                      value={question.number + "B"}
                      className="mr-2"
                      onChange={() => handleRadioChange(answerKey, question.number + "B")}
                      checked={answersDict[answerKey]?.answer === question.number + "B"}
                    />
                    <p className="text-sm">{question["B"]}</p>
                  </label>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading questions...</p>
        )}
      </>
    );
  }
  
  return (
    <div className="container mx-auto mb-6 ">
      <Navbar />
      <h1 className="text-3xl font-semibold mb-6 mt-6 ">
        Multiple Choice Questions
      </h1>
      <progress
        className="my-progress-bar"
        value={(Object.keys(answersDict).length / 50) * 100}
        max={100}
        min={0}
        style={{
          width: "100%",
          height: "10px",
          backgroundColor: "green",
        }}
      />
      <div className="grid grid-cols-1 gap-5 mt-5">
        {questionRendering(curr, limit)}
      </div>
      <div className="flex justify-between mt-6">
        <Link to="/Home">
          <button className="bg-gradient-to-b from-[#184272] to-[#001834] text-white px-4 py-2 rounded ">
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
        {Object.keys(answersDict).length === 50 && (
          <>
            <button
              className={`bg-[#C70039] text-white px-4 py-2 rounded  `}
              onClick={postAnswers}
            >
              <Link to="/Disc">Go to Next Test</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Mbti;
