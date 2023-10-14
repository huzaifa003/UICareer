import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth, db } from "../Components/FirebaseAuth";
import { set, ref, get } from "@firebase/database";
import { onAuthStateChanged } from "@firebase/auth";
import Break from "../Components/Break";
import { useNavigate } from 'react-router-dom'
const QuestionPaper = () => {



  const [draftColor, setDraftColor] = useState("bg-gradient-to-b from-[#184272] to-[#001834] text-white px-4 py-2 rounded")
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('')
  const [answersDict, setAnswersDict] = useState({})
  const navigate = useNavigate();


  async function saveDraft() {
    await set(ref(db, "users/" + username + "/big5"), {
      "answersDict": answersDict
    }).then((value) => {
      setDraftColor("bg-green text-white px-4 py-2 rounded")
    })
    setDraftColor("bg-green-500 text-white px-4 py-2 rounded")
  }

  function getDraft() {
    console.log('users/' + username + "/big5")
    get(ref(db, "users/" + username + "/big5")).then((snapshot) => {
      
      if (snapshot.exists()) {
        setAnswersDict(snapshot.val().answersDict)
        setAnswers(Object.values(snapshot.val().answersDict))
        setDraftColor("bg-green-500 text-white px-4 py-2 rounded")
      }
      else {
        console.log(snapshot.val())
        console.log("No Draft Available");
      }

    })

    // if (snapshot.exists()) {
    //   setAnswersDict(snapshot.val().answersDict)
    //   setAnswers(Object.values(snapshot.val().answersDict))
    //   setDraftColor("bg-green-500 text-white px-4 py-2 rounded")
    // }
    // else {

    //   console.log(snapshot.val())
    //   console.log("No Draft Available");
    // }

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
    // console.log(personality, careerMap, newA)
    await set(ref(db, 'users/' + username + "/big5"), {
      "personality": personality,
      "careerMap": careerMap,
      "answersDict": answersDict,

    }).then((response) => {
      console.log(response)

    })
  }




  const [question, setQuestions] = useState([]);
  const [limit, setLimit] = useState(10);
  const [curr, setCurr] = useState(0);
  const [isloading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1); // 10 seconds

    return () => clearTimeout(timer); // Clear timeout if the component unmounts

  }, []);




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
      const response = await axios.get("http://localhost:3000/big5/questions");
      console.log(response.data);
      setQuestions(response.data);
    };


    fetchQuestion();

    getDraft();
    setLoading(false);
  }, [username]);

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
    console.log(answersDict);
    const newAnswers = [...answers];
    newAnswers[index + curr] = value; // Update the answers array based on the current question's index
    setAnswers(newAnswers);
    answersDict[index] = {"answer" : value, "questionNumber" : index + 1}
    setDraftColor("bg-gradient-to-b from-[#184272] to-[#001834] text-white px-4 py-2 rounded")

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

      const answersOnly = []
      for (let index = 0; index < answersDict.length; index++) {
        const element = answersDict[index];
        console.log(element);
        answersOnly.push(element.answer);
      }

      console.log(answersOnly);
      
      const response = await axios.post(
        "http://localhost:3000/big5",
        {"answers":answersOnly}
      );

      localStorage.setItem("test1", JSON.stringify(response.data.career));
      const res = await writeUserData(response.data.personality, response.data.career);
      await writeUserData(response.data.personality, response.data.career)
      console.log(res);
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
                      name={index + curr + 1 + option}
                      value={index + curr + 1 + option}
                      checked={
                        answersDict[index + curr]?.answer == (index+ curr +1) + option
                      }
                      
                      className="mr-2 "
                      onChange={() =>
                        handleRadioChange(
                          index + curr,
                          option,
                          index + curr + 1 + option
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
      {console.log(username)}
      {console.log(answersDict)}
      {console.log('users/' + username + "/big5")}
      {isloading ? (
        <> <Break /></>
      ) : (

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
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5">
              {questionRendering(curr, limit)}
            </div>
            <div className="flex justify-between mt-6">

              <button className={draftColor} onClick={saveDraft}>
                Save as Draft
              </button>

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
              {(answers.filter((element) => element !== undefined).length / 50) *
                100 ===
                100 && (
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
      )}
    </>
  );
};

export default QuestionPaper;
