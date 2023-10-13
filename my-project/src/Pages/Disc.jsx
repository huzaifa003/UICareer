import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth, db } from "../Components/FirebaseAuth";
import { get, set, ref, onValue } from "@firebase/database";
import { onAuthStateChanged } from "@firebase/auth";
import { useNavigate } from 'react-router-dom';
import Break from "../Components/Break";

const Disc = () => {
  const [questions, setQuestions] = useState(null);
  const [answersDict, setAnswersDict] = useState({});
  const [curr, setCurr] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isNext, setIsNext] = useState(true);
  const [isPrev, setIsPrev] = useState(true);
  const [draftColor, setDraftColor] = useState("bg-gradient-to-b from-[#184272] to-[#001834] text-white px-4 py-2 rounded")
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('')

  const navigate = useNavigate();


  async function saveDraft() {
    await set(ref(db, "users/" + username + "/disc"), {
      "answersDict": answersDict
    }).then((value) => {
      setDraftColor("bg-green text-white px-4 py-2 rounded")
    })
    setDraftColor("bg-green-500 text-white px-4 py-2 rounded")
  }

  async function getDraft() {
    console.log(username);
    const snapshot = await get(ref(db, "users/" + username + "/disc"))
    if (snapshot.exists()) {
      setAnswersDict(snapshot.val().answersDict)
      setDraftColor("bg-green-500 text-white px-4 py-2 rounded")
    }
    else {
      console.log(snapshot.val())
      console.log("No Draft Available");
    }

    // get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });

  }
  async function writeUserData(personality, careerMap) {

    await set(ref(db, "users/" + username), {
      "progress": 3
    })
    console.log("-------------------------------")
    console.log(personality, careerMap, answersDict)
    await set(ref(db, 'users/' + username + "/disc"), {
      "personality": personality,
      "careerMap": careerMap,
      "answersDict": answersDict,

    }).then((response) => {
      console.log(response)

    })
  }

  // Function to update the answersDict when a radio button is changed
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

    setDraftColor("bg-gradient-to-b from-[#184272] to-[#001834] text-white px-4 py-2 rounded");
  };




  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.email.split("@")[0])
        console.log(username)
      }
      else {
        navigate("/")
      }
    })

    console.log(loading);

    const fetchQuestion = async () => {
      const response = await axios.get("http://localhost:3002/disc/questions");
      console.log(response.data);
      setQuestions(response.data);
    };


    fetchQuestion();

    getDraft();
    setLoading(false);
  }, [username]);

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

      // while (response != null || response !=)
      const res = await writeUserData(response.data.personality, response.data.career)
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

  function questionRendering(starting, ending) {
    return (
      <>
        {questions ? (
          questions.slice(starting, ending).map((question, index) => (

            <div key={index + curr} className="mb-6 p-4 border rounded-lg shadow-md">
              <div className="flex gap-5">
                <h1 className="text-md font-semibold mb-2">{question.Number + "-"}</h1>
                <p className="text-md font-medium mb-2"> Are you: </p>
              </div>

              <div className="flex flex-row gap-5 ">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`question${index + curr}`}
                    value={question.Number + "A"}
                    className="mr-2"
                    onChange={() => handleRadioChange(index + curr, question.Number + "A")}
                    checked={answersDict[index + curr]?.answer === question.Number + "A"}
                  />
                  {question["A"]}
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`question${index}`}
                    value={question.Number + "B"}
                    className="mr-2"
                    onChange={() => handleRadioChange(index + curr, question.Number + "B")}
                    checked={answersDict[index + curr]?.answer === question.Number + "B"}
                  />
                  {question["B"]}
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`question${index}`}
                    value={question.Number + "C"}
                    className="mr-2"
                    onChange={() => handleRadioChange(index + curr, question.Number + "C")}
                    checked={answersDict[index + curr]?.answer === question.Number + "C"}
                  />
                  {question["C"]}
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`question${index}`}
                    value={question.Number + "D"}
                    className="mr-2"
                    onChange={() => handleRadioChange(index + curr, question.Number + "D")}
                    checked={answersDict[index + curr]?.answer === question.Number + "D"}
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
        <div><Break /></div>
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
                <button onClick={saveDraft} className={draftColor}>
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
