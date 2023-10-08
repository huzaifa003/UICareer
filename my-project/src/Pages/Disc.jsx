import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Disc = () => {
  const [questions, setQuestions] = useState(null);
  const answersDict = {};

  const handleRadioChange = (index, value) => {
    answersDict[index + 1] = value;
    console.log(answersDict);
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

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 p-4 border square-lg shadow-xl">
        <p className="tex-15 font-bold fill-slate-600">
            Choose The option that suits you the most
        </p>
      </div>
      {questions ? (
        questions.map((question, index) => (
          <div key={index} className="mb-6 p-4 border rounded-lg shadow-md">
            <div className="flex gap-5">
              <h1 className="text-md font-semibold mb-2">{question.Number + "-"}</h1>
              <p className="text-md font-medium mb-2"> Are you: </p>
            </div>

            <div className="flex flex-row gap-5 ">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question${index}`}
                  value={question.Number + "A"}
                  className="mr-2"
                  onChange={() =>
                    handleRadioChange(index, question.Number + "A")
                  }
                />
                {question["A"]}
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question${index}`}
                  value={question.number + "B"}
                  className="mr-2"
                  onChange={() =>
                    handleRadioChange(index, question.Number + "D")
                  }
                />
                {question["B"]}
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question${index}`}
                  value={question.number + "C"}
                  className="mr-2"
                  onChange={() =>
                    handleRadioChange(index, question.Number + "C")
                  }
                />
                {question["C"]}
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question${index}`}
                  value={question.number + "D"}
                  className="mr-2"
                  onChange={() =>
                    handleRadioChange(index, question.Number + "D")
                  }
                />
                {question["D"]}
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
            Object.values(answersDict).includes("")
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
          disabled={Object.values(answersDict).includes("")}
          onClick={postAnswers}
        >
          {Object.values(answersDict).includes("") ? (
            "Please Complete the test"
          ) : (
            <Link to="/Result">View Result</Link>
          )}
        </button>
      </div>
    </div>
  );
};

export default Disc;
