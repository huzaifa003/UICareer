const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
app = express()
const port = 3000;


// Middleware to parse JSON requests
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
    origin: '*'
}));

const keys = {
    "1A": 1, "1B": 2, "1C": 3, "1D": 4, "1E": 5,
    "2A": 1, "2B": 2, "2C": 3, "2D": 4, "2E": 5,
    "3A": 1, "3B": 2, "3C": 3, "3D": 4, "3E": 5,
    "4A": 1, "4B": 2, "4C": 3, "4D": 4, "4E": 5,
    "5A": 1, "5B": 2, "5C": 3, "5D": 4, "5E": 5,
    "6A": 1, "6B": 2, "6C": 3, "6D": 4, "6E": 5,
    "7A": 1, "7B": 2, "7C": 3, "7D": 4, "7E": 5,
    "8A": 1, "8B": 2, "8C": 3, "8D": 4, "8E": 5,
    "9A": 1, "9B": 2, "9C": 3, "9D": 4, "9E": 5,
    "10A": 1, "10B": 2, "10C": 3, "10D": 4, "10E": 5,
    "11A": 1, "11B": 2, "11C": 3, "11D": 4, "11E": 5,
    "12A": 1, "12B": 2, "12C": 3, "12D": 4, "12E": 5,
    "13A": 1, "13B": 2, "13C": 3, "13D": 4, "13E": 5,
    "14A": 1, "14B": 2, "14C": 3, "14D": 4, "14E": 5,
    "15A": 1, "15B": 2, "15C": 3, "15D": 4, "15E": 5,
    "16A": 1, "16B": 2, "16C": 3, "16D": 4, "16E": 5,
    "17A": 1, "17B": 2, "17C": 3, "17D": 4, "17E": 5,
    "18A": 1, "18B": 2, "18C": 3, "18D": 4, "18E": 5,
    "19A": 1, "19B": 2, "19C": 3, "19D": 4, "19E": 5,
    "20A": 1, "20B": 2, "20C": 3, "20D": 4, "20E": 5,
    "21A": 1, "21B": 2, "21C": 3, "21D": 4, "21E": 5,
    "22A": 1, "22B": 2, "22C": 3, "22D": 4, "22E": 5,
    "23A": 1, "23B": 2, "23C": 3, "23D": 4, "23E": 5,
    "24A": 1, "24B": 2, "24C": 3, "24D": 4, "24E": 5,
    "25A": 1, "25B": 2, "25C": 3, "25D": 4, "25E": 5,
    "26A": 1, "26B": 2, "26C": 3, "26D": 4, "26E": 5,
    "27A": 1, "27B": 2, "27C": 3, "27D": 4, "27E": 5,
    "28A": 1, "28B": 2, "28C": 3, "28D": 4, "28E": 5,
    "29A": 1, "29B": 2, "29C": 3, "29D": 4, "29E": 5,
    "30A": 1, "30B": 2, "30C": 3, "30D": 4, "30E": 5,
    "31A": 1, "31B": 2, "31C": 3, "31D": 4, "31E": 5,
    "32A": 1, "32B": 2, "32C": 3, "32D": 4, "32E": 5,
    "33A": 1, "33B": 2, "33C": 3, "33D": 4, "33E": 5,
    "34A": 1, "34B": 2, "34C": 3, "34D": 4, "34E": 5,
    "35A": 1, "35B": 2, "35C": 3, "35D": 4, "35E": 5,
    "36A": 1, "36B": 2, "36C": 3, "36D": 4, "36E": 5,
    "37A": 1, "37B": 2, "37C": 3, "37D": 4, "37E": 5,
    "38A": 1, "38B": 2, "38C": 3, "38D": 4, "38E": 5,
    "39A": 1, "39B": 2, "39C": 3, "39D": 4, "39E": 5,
    "40A": 1, "40B": 2, "40C": 3, "40D": 4, "40E": 5,
    "41A": 1, "41B": 2, "41C": 3, "41D": 4, "41E": 5,
    "42A": 1, "42B": 2, "42C": 3, "42D": 4, "42E": 5,
    "43A": 1, "43B": 2, "43C": 3, "43D": 4, "43E": 5,
    "44A": 1, "44B": 2, "44C": 3, "44D": 4, "44E": 5,
    "45A": 1, "45B": 2, "45C": 3, "45D": 4, "45E": 5,
    "46A": 1, "46B": 2, "46C": 3, "46D": 4, "46E": 5,
    "47A": 1, "47B": 2, "47C": 3, "47D": 4, "47E": 5,
    "48A": 1, "48B": 2, "48C": 3, "48D": 4, "48E": 5,
    "49A": 1, "49B": 2, "49C": 3, "49D": 4, "49E": 5,
    "50A": 1, "50B": 2, "50C": 3, "50D": 4, "50E": 5
}

const questions = {
    1: "I am the life of the party.",
    2: "I feel little concern for others.",
    3: "I am always prepared.",
    4: "I get stressed out easily.",
    5: "I have a rich vocabulary.",
    6: "I don't talk a lot.",
    7: "I am interested in people.",
    8: "I leave my belongings around.",
    9: "I am relaxed most of the time.",
    10: "I have difficulty understanding abstract ideas.",
    11: "I feel comfortable around people.",
    12: "I insult people.",
    13: "I pay attention to details.",
    14: "I worry about things.",
    15: "I have a vivid imagination.",
    16: "I keep in the background.",
    17: "I sympathize with others' feelings.",
    18: "I make a mess of things.",
    19: "I seldom feel blue.",
    20: "I am not interested in abstract ideas.",
    21: "I start conversations.",
    22: "I am not interested in other people's problems.",
    23: "I get chores done right away.",
    24: "I am easily disturbed.",
    25: "I have excellent ideas.",
    26: "I have little to say.",
    27: "I have a soft heart.",
    28: "I often forget to put things back in their proper place.",
    29: "I get upset easily.",
    30: "I do not have a good imagination.",
    31: "I talk to a lot of different people at parties.",
    32: "I am not really interested in others.",
    33: "I like order.",
    34: "I change my mood a lot.",
    35: "I am quick to understand things.",
    36: "I don't like to draw attention to myself.",
    37: "I take time out for others.",
    38: "I shirk my duties.",
    39: "I have frequent mood swings.",
    40: "I use difficult words.",
    41: "I don't mind being the center of attention.",
    42: "I feel others' emotions.",
    43: "I follow a schedule.",
    44: "I get irritated easily.",
    45: "I spend time reflecting on things.",
    46: "I am quiet around strangers.",
    47: "I make people feel at ease.",
    48: "I am exacting in my work.",
    49: "I often feel blue.",
    50: "I am full of ideas."
};


const careerSuggestions = {
    "Openness": [
        "Creative professions such as artists, writers, musicians, and designers.",
        "Scientific research and innovation.",
        "Counseling or therapy where creative problem-solving is required.",
        "Entrepreneurship for innovative and original business ideas."
    ],
    "Conscientiousness": [
        "Accountant or Financial Analyst.",
        "Project Manager or Team Leader.",
        "Lawyer or Legal Consultant.",
        "Engineer or Architect.",
        "Healthcare Administrator."
    ],
    "Extroversion": [
        "Sales and Marketing roles.",
        "Public Relations Specialist.",
        "Event Planner or Coordinator.",
        "Teacher or Trainer.",
        "Hospitality and Tourism industry jobs."
    ],
    "Agreeableness": [
        "Social Worker or Counselor.",
        "Nurse or Healthcare Provider.",
        "Human Resources Specialist.",
        "Non-profit or Charity work.",
        "Mediator or Conflict Resolution Specialist."
    ],
    "Neurotisicsm": [
        "Therapist or Counselor.",
        "Yoga Instructor or Meditation Coach.",
        "Researcher studying mental health or psychological disorders.",
        "Laboratory Technician where attention to detail and precision is crucial.",
        "Librarian or Archivist."
    ]
};






// EACNO
const ptestAns = [
    {
        "question": "is talkative",
        "ans": "E"
    },
    {
        "question": "Is reserved",
        "ans": "A"
    },
    {
        "question": 'Is reserved',
        "ans": "C"
    },
    {
        "question": "is helpful and unselfish with others",
        "ans": "N"
    }
]

app.get("/big5/questions", (req, res) => {
    res.json(questions);
})
app.get('/personalityTest', (req, res) => {
    let totalScore = 0;
    // first index is for normal scoring and 2nd index is for reverse scoring
    const valueMapping = {
        'E': [1, 5],
        'A': [2, 4],
        'C': [3, 3],
        'N': [4, 2],
        'O': [5, 1],
    };

    for (let index = 0; index < ptestAns.length; index++) {
        const question = ptestAns[index].question;
        const answer = ptestAns[index].ans;

        const category = ptest.positive.includes(question) ? 'positive' : 'negative';
        const value = valueMapping[answer];

        if (category === 'positive') {
            totalScore += value[0];
        } else if (category === 'negative') {
            totalScore += value[1];
        }
    }
    const responseObj = {
        ptestAns: ptestAns,
        totalScore: totalScore
    };
    res.json(responseObj)
});

app.post("/big5", (req, res) => {

    const answers = req.body.answers;
    console.log(answers);
    // const sorted = answers.sort();

    if (answers.length < 50){
        res.send(401,"Invalid Data");
    }
    const answerKey = {}
    answers.forEach(answer => {
        let no = answer.match(/(\d+)/)[0];
        answerKey[no] = keys[answer];
    })
    const extroversion = 20 + answerKey[1] - answerKey[6] + answerKey[11] - answerKey[16] + answerKey[21] - answerKey[26] + answerKey[32] - answerKey[36] + answerKey[41] - answerKey[46];

    const agreeableness = 14 - answerKey[2] + answerKey[7] - answerKey[12] + answerKey[17] - answerKey[22] + answerKey[27] - answerKey[32] + answerKey[37] + answerKey[42] + answerKey[47];

    const conscientiousness = 14 + answerKey[3] - answerKey[8] + answerKey[13] - answerKey[18] + answerKey[23] - answerKey[28] + answerKey[33] - answerKey[38] + answerKey[43] + answerKey[48];

    const neurotisicsm = 38 - answerKey[4] + answerKey[9] - answerKey[14] + answerKey[19] - answerKey[24] - answerKey[29] - answerKey[34] - answerKey[39] - answerKey[44] - answerKey[49];

    const openness = 8 + answerKey[5] - answerKey[10] + answerKey[15] - answerKey[20] + answerKey[25] - answerKey[30] + answerKey[35] + answerKey[40] + answerKey[45] + answerKey[50];

    const InverseMapping = {
        extroversion: "Extroversion",
        agreeableness: "Agreeableness",
        conscientiousness: "Conscientiousness",
        neurotisicsm: "Neurotisicsm",
        openness: "Openness"
    }
    const mapping = { "extroversion": extroversion, "agreeableness": agreeableness, "consceientiousness": conscientiousness, "neurotisicsm": neurotisicsm, "openness": openness }
    

    const personalityScores = [extroversion,agreeableness,conscientiousness,neurotisicsm,openness];
    
    const maxInd = personalityScores.indexOf(Math.max(...personalityScores))
    console.log(personalityScores)
    console.log(maxInd)
    let personality;
    if (maxInd == 0){
        personality = "Extroversion"
    }
    else if (maxInd == 1){
        personality = "Agreeableness"
    }
    else if (maxInd == 2){
        personality = "Conscientiousness"
    }
    else if (maxInd == 3){
        personality = "Neurotisicsm"
    }
    else if (personality == 4){
        personality = "Openness"
    }
    

    const careerMap = careerSuggestions[personality]
    console.log(careerSuggestions['Neurotisicsm'])
    res.send(200, { personality,  "career" :careerMap });
})
//So the proble is prolly the local storage try withprops and it should work, local storage turns it into string
// we cant use props next page pr redirect honay k lea routing use ki ha and i dont know how to pass data via routing :D
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

