import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import Break from "../Components/Break";

const Disc = () => {
  const [questions, setQuestions] = useState(null);
  const [answersDict, setAnswersDict] = useState({});
  const [curr, setCurr] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isNext, setIsNext] = useState(true);
  const [isPrev, setIsPrev] = useState(true);


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Clear timeout if the component unmounts

  }, []);

  

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
      const response = await axios.get("http://localhost:3002/disc/questions");
      console.log(response.data);
      setQuestions(response.data);
    };
    fetchQuestion();
  }, []);

  const postAnswers = async () => {
    try {
      const answers = Object.values(answersDict);
      const response = await axios.post("http://localhost:3002/disc", {
        answers,
      });
      localStorage.setItem("test3", JSON.stringify(response.data.career))
      const listData = []
      listData.push(JSON.parse(localStorage.getItem('test1')))
      listData.push(JSON.parse(localStorage.getItem('test2')))
      listData.push(response.data.career)
    //   console.log(response);
    console.log(listData);
    } catch (error) {
      console.error("Error posting answers:", error);
    }
  };
  const OnNext = () => {
    if (limit < 24) {
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

  function questionRendering (starting,ending){
    return(
      <>
      {questions ? (
        questions.slice(starting,ending).map((question, index) => (
           
          <div key={index + curr} className="mb-6 p-4 border rounded-lg shadow-md">
            <div className="flex gap-5">
              <h1 className="text-md font-semibold mb-2">{question.Number + "-"}</h1>
              <p className="text-md font-medium mb-2"> Are you: </p>
            </div>

            <div className="flex flex-row gap-5 ">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question${index+curr}`}
                  value={question.Number + "A"}
                  className="mr-2"
                  onChange={() => handleRadioChange(index+curr, question.number + "A")}
                      checked={answersDict[index+curr]?.answer === question.number + "A"}
                />
                {question["A"]}
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question${index}`}
                  value={question.number + "B"}
                  className="mr-2"
                  onChange={() => handleRadioChange(index+curr, question.number + "B")}
                      checked={answersDict[index+curr]?.answer === question.number + "B"}
                />
                {question["B"]}
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question${index}`}
                  value={question.number + "C"}
                  className="mr-2"
                  onChange={() => handleRadioChange(index+curr, question.number + "C")}
                      checked={answersDict[index+curr]?.answer === question.number + "C"}
                />
                {question["C"]}
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question${index}`}
                  value={question.number + "D"}
                  className="mr-2"
                  onChange={() => handleRadioChange(index+curr, question.number + "D")}
                      checked={answersDict[index+curr]?.answer === question.number + "D"}
                />
                {question["D"]}
              </label>
            </div>
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}
      </>
    )
  }

  return (
    <>
      {isLoading ? (
        <div><Break/></div>
      ) : (
        <div className=" mx-auto mb-6 ">
          <Navbar />
          <div className="px-10">       
          <h1 className="text-3xl font-semibold mb-6 mt-6 ">
            Multiple Choice Questions
          </h1>
          <progress
            className="my-progress-bar"
            value={(Object.keys(answersDict).length / 24) * 100}
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
              {limit < 24 && isNext && (
                <button
                  className="bg-blue-600 p-2 text-white rounded-md"
                  onClick={OnNext}
                >
                  Next Question
                </button>
              )}
            </div>
            {Object.keys(answersDict).length === 24 && (
              <>
                <Link to="/Result">
                  <button
                    className={`bg-[#C70039] text-white px-4 py-2 rounded  `}
                    onClick={postAnswers}
                  >
                    View Result
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        </div>
      )}
    </>
  );
}

export default Disc;
