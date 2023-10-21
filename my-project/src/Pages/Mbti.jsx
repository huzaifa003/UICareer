import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import Break from "../Components/Break";
import { onAuthStateChanged } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { get, set, ref } from "@firebase/database";
import { auth, db } from "../Components/FirebaseAuth";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


const Mbti = () => {
  const [questions, setQuestions] = useState(null);
  const [answersDict, setAnswersDict] = useState({});
  const [curr, setCurr] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isNext, setIsNext] = useState(true);
  const [isPrev, setIsPrev] = useState(true);
  const [isloading, setIsLoading] = useState(true);
  const [draftColor, setDraftColor] = useState(
    "bg-gradient-to-b from-[#184272] to-[#001834] text-white px-4 py-2 rounded"
  );
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const sizeIdx = {
    0: "58",
    1: "45",
    2: "34",
    3: "45",
    4: "58",
  };
  const colorIdx = {
    0: "green",
    1: "green",
    2: "light blue",
    3: "#C70039",
    4: "#C70039",
  };

  async function saveDraft() {
    await set(ref(db, "users/" + username + "/mbti"), {
      answersDict: answersDict,
    }).then((value) => {
      setDraftColor("bg-green text-white px-4 py-2 rounded");
    });
    setDraftColor("bg-green-500 text-white px-4 py-2 rounded");
  }

  function getDraft() {
    console.log("users/" + username + "/mbti");
    get(ref(db, "users/" + username + "/mbti")).then((snapshot) => {
      if (snapshot.exists()) {
        setAnswersDict(snapshot.val().answersDict);
        // setAnswers(Object.values(snapshot.val().answersDict))
        setDraftColor("bg-green-500 text-white px-4 py-2 rounded");
      } else {
        console.log(snapshot.val());
        console.log("No Draft Available");
      }
    });

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
    console.log("-------------------------------");
    // console.log(personality, careerMap, newA)
    await set(ref(db, "users/" + username + "/mbti"), {
      personality: personality,
      careerMap: careerMap,
      answersDict: answersDict,
    }).then((response) => {
      console.log(response);
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 10 seconds

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, []);
  // Function to update the answersDict when a radio button is changed
  const handleRadioChange = (index, value) => {
    console.log(index, value);
    setAnswersDict((prevAnswersDict) => ({
      ...prevAnswersDict,
      [index]: {
        number: index,
        answer: value,
      },
    }));
    setDraftColor(
      "bg-gradient-to-b from-[#184272] to-[#001834] text-white px-4 py-2 rounded"
    );
    // console.log(answersDict);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.email.split("@")[0]);
        console.log(username);
      } else {
        navigate("/");
      }
    });

    // console.log(loading);

    const fetchQuestion = async () => {
      const response = await axios.get("http://localhost:3001/mbti/questions");
      console.log(response.data);
      setQuestions(response.data);
    };

    fetchQuestion();

    getDraft();
  }, [username]);

  const postAnswers = async () => {
    try {
      const answers = Object.values(answersDict);
      const response = await axios.post("http://localhost:3001/mbti", {
        answers,
      });
      console.log(response);
      localStorage.setItem("test2", JSON.stringify(response.data.career));
      await writeUserData(response.data.personality, response.data.career);
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
              <div
                key={answerKey}
                className="mb-6 p-4 border rounded-lg shadow-md"
              >
                <div className="flex gap-5">
                  <h1 className="text-xl font-semibold mb-2">
                    {question.number}
                  </h1>
                  <p className="text-md font-semibold mb-4">
                    {question.question}
                  </p>
                </div>

                <div className="flex flex-row gap-5">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`question${question.number}`}
                      value={question.number + "A"}
                      className="mr-2"
                      onChange={() =>
                        handleRadioChange(
                          question.number - 1,
                          question.number + "A"
                        )
                      }
                      checked={
                        answersDict[question.number - 1]?.answer ===
                        question.number + "A"
                      }
                    />
                    <p className="text-sm">{question["A"]}</p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`question${question.number}`}
                      value={question.number + "B"}
                      className="mr-2"
                      onChange={() =>
                        handleRadioChange(
                          question.number - 1,
                          question.number + "B"
                        )
                      }
                      checked={
                        answersDict[question.number - 1]?.answer ===
                        question.number + "B"
                      }
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
    <>
      {console.log(answersDict)}
      {isloading ? (
        <div>
          <Break />
        </div>
      ) : (
        <div className=" mx-auto mb-6 w-full  ">
          <Navbar />
          <div className="px-10 mt-5 mb-5">

          
          <Tabs
            aria-label="disabled tabs example"
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
           <Tab label={'Personality Test ✅'} disabled style={{ color: "#999" }} />
            <Tab label={'Aptitude Test ✅'} disabled style={{ color: "#999" }} />
            <Tab
              label="Psychology Test"
              style={{
                textTransform: "none",
                minWidth: 0,
                padding: "6px 15px",
                marginRight: 15,
                fontWeight: 500,
                fontSize: "16px",
                color: "#333",
                "&:hover": {
                  color: "#555",
                  opacity: 1,
                },
                "&$selected": {
                  color: "#000",
                  fontWeight: 600,
                },
              }}
            />
          </Tabs>
          </div>
          {/* <h1 className="text-3xl font-semibold mb-6 mt-6 px-10 ">
            Multiple Choice Questions
          </h1> */}
          <div className="px-10">
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
              {Object.keys(answersDict).length === 50 && (
                <>
                  <button
                    className={`bg-[#C70039] text-white px-4 py-2 rounded  `}
                    onClick={postAnswers}
                  >
                    <Link to="/Result">Go to Next Test</Link>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Mbti;
