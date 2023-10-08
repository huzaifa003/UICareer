const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
app = express()
const port = 3002;


// Middleware to parse JSON requests
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
    origin: '*'
}));
// Sample data (can be replaced with your own data)
const results = {
    "1B": "D",
    "1D": "I",
    "1A": "S",
    "1C": "C",
    "2A": "D",
    "2C": "I",
    "2D": "S",
    "2B": "C",
    "3C": "D",
    "3B": "I",
    "3A": "S",
    "3D": "C",
    "4A": "D",
    "4D": "I",
    "4C": "S",
    "4B": "C",
    "5D": "D",
    "5B": "I",
    "5C": "S",
    "5A": "C",
    "6B": "D",
    "6A": "I",
    "6D": "S",
    "6C": "C",
    "7C": "D",
    "7D": "I",
    "7B": "S",
    "7A": "C",
    "8B": "D",
    "8A": "I",
    "8D": "S",
    "8C": "C",
    "9A": "D",
    "9D": "I",
    "9C": "S",
    "9B": "C",
    "10C": "D",
    "10B": "I",
    "10D": "S",
    "10A": "C",
    "11A": "D",
    "11D": "I",
    "11C": "S",
    "11B": "C",
    "12D": "D",
    "12C": "I",
    "12A": "S",
    "12B": "C",
    "13B": "D",
    "13A": "I",
    "13D": "S",
    "13C": "C",
    "14C": "D",
    "14D": "I",
    "14B": "S",
    "14A": "C",
    "15A": "D",
    "15C": "I",
    "15B": "S",
    "15D": "C",
    "16B": "D",
    "16C": "I",
    "16D": "S",
    "16A": "C",
    "17C": "D",
    "17A": "I",
    "17B": "S",
    "17D": "C",
    "18A": "D",
    "18B": "I",
    "18D": "S",
    "18C": "C",
    "19D": "D",
    "19B": "I",
    "19C": "S",
    "19A": "C",
    "20A": "D",
    "20D": "I",
    "20C": "S",
    "20B": "C",
    "21A": "D",
    "21B": "I",
    "21C": "S",
    "21D": "C",
    "22D": "D",
    "22C": "I",
    "22B": "S",
    "22A": "C",
    "23D": "D",
    "23B": "I",
    "23A": "S",
    "23C": "C",
    "24D": "D",
    "24C": "I",
    "24A": "S",
    "24B": "C"
  }

  
  const questions = [
    {"Number": 1, "A": "Restrained", "B": "Forceful", "C": "Careful", "D": "Expressive"},
    {"Number": 2, "A": "Pioneering", "B": "Correct", "C": "Exciting", "D": "Satisfied"},
    {"Number": 3, "A": "Willing", "B": "Animated", "C": "Bold", "D": "Precise"},
    {"Number": 4, "A": "Argumentative", "B": "Doubting", "C": "Indecisive", "D": "Unpredictable"},
    {"Number": 5, "A": "Respectful", "B": "Out-going", "C": "Patient", "D": "Daring"},
    {"Number": 6, "A": "Persuasive", "B": "Self-reliant", "C": "Logical", "D": "Gentle"},
    {"Number": 7, "A": "Cautious", "B": "Even-tempered", "C": "Decisive", "D": "Life-of-the-party"},
    {"Number": 8, "A": "Popular", "B": "Assertive", "C": "Perfectionist", "D": "Generous"},
    {"Number": 9, "A": "Colorful", "B": "Modest", "C": "Easy-going", "D": "Unyielding"},
    {"Number": 10, "A": "Systematic", "B": "Optimistic", "C": "Persistent", "D": "Accommodating"},
    {"Number": 11, "A": "Relentless", "B": "Humble", "C": "Neighborly", "D": "Talkative"},
    {"Number": 12, "A": "Friendly", "B": "Observant", "C": "Playful", "D": "Strong-willed"},
    {"Number": 13, "A": "Charming", "B": "Adventurous", "C": "Disciplined", "D": "Deliberate"},
    {"Number": 14, "A": "Restrained", "B": "Steady", "C": "Aggressive", "D": "Attractive"},
    {"Number": 15, "A": "Enthusiastic", "B": "Analytical", "C": "Sympathetic", "D": "Determined"},
    {"Number": 16, "A": "Commanding", "B": "Impulsive", "C": "Slow-paced", "D": "Critical"},
    {"Number": 17, "A": "Consistent", "B": "Force-of-character", "C": "Lively", "D": "Laid-back"},
    {"Number": 18, "A": "Influential", "B": "Kind", "C": "Independent", "D": "Orderly"},
    {"Number": 19, "A": "Idealistic", "B": "Popular", "C": "Pleasant", "D": "Out-spoken"},
    {"Number": 20, "A": "Impatient", "B": "Serious", "C": "Procrastinator", "D": "Emotional"},
    {"Number": 21, "A": "Competitive", "B": "Spontaneous", "C": "Loyal", "D": "Thoughtful"},
    {"Number": 22, "A": "Self-sacrificing", "B": "Considerate", "C": "Convincing", "D": "Courageous"},
    {"Number": 23, "A": "Dependent", "B": "Flighty", "C": "Stoic", "D": "Pushy"},
    {"Number": 24, "A": "Tolerant", "B": "Conventional", "C": "Stimulating", "D": "Directing"}
]

const careers ={
    "D": [
      "CEO",
      "Entrepreneur",
      "Lawyer",
      "Manager",
      "Sales Manager",
      "Engineer",
      "Military Officer",
      "Pilot"
    ],
    "I": [
      "Salesperson",
      "Marketing Specialist",
      "Public Relations Specialist",
      "Event Planner",
      "Actor/Entertainer",
      "Politician",
      "Teacher/Trainer",
      "Customer Service Representative"
    ],
    "S": [
      "Nurse",
      "Counselor/Therapist",
      "Human Resources Specialist",
      "Social Worker",
      "Administrative Assistant",
      "Librarian",
      "Customer Support Representative",
      "Accountant"
    ],
    "C": [
      "Scientist/Researcher",
      "Software Developer/Engineer",
      "Accountant",
      "Architect",
      "Statistician",
      "Quality Control Specialist",
      "Financial Analyst",
      "Technical Writer"
    ]
  }

// Middleware to parse JSON requests
app.use(express.json());

// GET request to retrieve all users
app.get('/disc/questions', (req, res) => {
    res.json(questions);
});


// POST request to add a new user
app.post('/disc', (req, res) => {
    const tally = {"D":0, "I": 0, "S": 0,"C": 0};
    const answers = req.body.answers;
    answers.forEach(element => {
        tally[results[element]]++;
    });

    const values = [tally['D'], tally['I'], tally['S'], tally['C']];
    let maxIndex = 0;
    for (let index = 0; index < values.length - 1; index++) {
        const element = values[index];
        if (values[index + 1] > element){
            maxIndex = index+1;
        }
    }

    const maxInd = values.indexOf(Math.max(...values));
    let maxValue;
    if (maxInd == 0){
        maxValue = "D"
    }
    else if (maxInd == 1){
        maxValue = "I"
    }
    else if (maxInd == 2){
        maxValue = "S"
    }
    else if (maxInd == 3){
        maxValue = "C"
    }
    console.log(tally);
    console.log(maxInd);
    console.log(maxValue)
    console.log(careers[maxValue])
    res.send(200,{"personality" : maxValue,  "career" : careers[maxValue]});
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});