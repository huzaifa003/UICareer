const express = require('express');

const bodyParser = require('body-parser')
const cors = require('cors')
app = express()
const port = 3001;


// Middleware to parse JSON requests
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
    origin: '*'
}));

questions = [
    { "number": 1, "question": "WHEN YOU GO SOMEWHERE FOR THE DAY, WOULD YOU RATHER", "A": "PLAN WHAT YOU WILL DO AND WHEN", "B": "JUST GO!!" },
    { "number": 2, "question": "IF YOU WERE A TEACHER, WOULD YOU RATHER TEACH", "A": "FACTS-BASED COURSES", "B": "COURSES INVOLVING OPINION OR THEORY?" },
    { "number": 3, "question": "ARE YOU USUALLY", "A": "A “GOOD MIXER” WITH GROUPS OF PEOPLE", "B": "RATHER QUIET AND RESERVED?" },
    { "number": 4, "question": "DO YOU MORE OFTEN LET", "A": "YOUR HEART RULE YOUR HEAD", "B": "YOUR HEAD RULE YOUR HEART?" },
    { "number": 5, "question": "IN DOING SOMETHING THAT MANY OTHER PEOPLE DO, WOULD YOU RATHER", "A": "INVENT A WAY OF YOUR OWN", "B": "DO IT IN THE ACCEPTED WAY?" },
    { "number": 6, "question": "AMONG YOUR FRIENDS ARE YOU", "A": "FULL OF NEWS ABOUT EVERYBODY", "B": "ONE OF THE LAST TO HEAR WHAT IS GOING ON?" },
    { "number": 7, "question": "DOES THE IDEA OF MAKING A LIST OF WHAT YOU SHOULD GET DONE OVER A WEEKEND", "A": "HELP YOU", "B": "STRESS YOU", "C": "POSITIVELY DEPRESS YOU?" },
    { "number": 8, "question": "WHEN YOU HAVE A SPECIAL JOB TO DO, DO YOU LIKE TO", "A": "ORGANIZE IT CAREFULLY BEFORE YOU START", "B": "FIND OUT WHAT IS NECESSARY AS YOU GO ALONG?" },
    { "number": 9, "question": "DO YOU TEND TO HAVE", "A": "BROAD FRIENDSHIPS WITH MANY DIFFERENT PEOPLE", "B": "DEEP FRIENDSHIP WITH VERY FEW PEOPLE?" },
    { "number": 10, "question": "DO YOU ADMIRE MORE THE PEOPLE WHO ARE", "A": "NORMAL-ACTING TO NEVER MAKE THEMSELVES THE CENTER OF ATTENTION", "B": "TOO ORIGINAL AND INDIVIDUAL TO CARE WHETHER THEY ARE THE CENTER OF ATTENTION OR NOT?" },
    { "number": 11, "question": "DO YOU PREFER TO", "A": "ARRANGE PICNICS, PARTIES ETC, WELL IN ADVANCE", "B": "BE FREE TO DO WHATEVER TO LOOKS LIKE FUN WHEN THE TIME COMES?" },
    { "number": 12, "question": "DO YOU USUALLY GET ALONG BETTER WITH", "A": "REALISTIC PEOPLE", "B": "IMAGINATIVE PEOPLE?" },
    { "number": 13, "question": "WHEN YOU ARE WITH THE GROUP OF PEOPLE, WOULD YOU USUALLY RATHER", "A": "JOIN IN THE TALK OF THE GROUP", "B": "STAND BACK AND LISTEN FIRST?" },
    { "number": 14, "question": "IS IT A HIGHER COMPLIMENT TO BE CALLED", "A": "A PERSON OF REAL FEELING", "B": "A CONSISTENTLY REASONABLE PERSON?" },
    { "number": 15, "question": "IN READING FOR PLEASURE, DO YOU", "A": "ENJOY ODD OR ORIGINAL WAYS OF SAYING THINGS", "B": "LIKE WRITERS TO SAY EXACTLY WHAT THEY MEAN?" },
    { "number": 16, "question": "DO YOU", "A": "TALK EASILY TO ALMOST ANYONE FOR AS LONG AS YOU HAVE TO", "B": "FIND A LOT TO SAY ONLY TO CERTAIN PEOPLE OR UNDER CERTAIN CONDITIONS?" },
    { "number": 17, "question": "DOES FOLLOWING A SCHEDULE", "A": "APPEAL TO YOU", "B": "CRAMP YOU?" },
    { "number": 18, "question": "WHEN IT IS SETTLED WELL IN ADVANCE THAT YOU WILL DO A CERTAIN THING AT A CERTAIN TIME, DO YOU FIND IT", "A": "NICE TO BE ABLE TO PLAN ACCORDINGLY", "B": "A LITTLE UNPLEASANT TO BE TIED DOWN?" },
    { "number": 19, "question": "ARE YOU MORE SUCCESSFUL", "A": "AT FOLLOWING A CAREFULLY WORKED OUT PLAN", "B": "AT DEALING WITH THE UNEXPECTED AND SEEING QUICKLY WHAT SHOULD BE DONE?" },
    { "number": 20, "question": "WOULD YOU RATHER BE CONSIDERED", "A": "A PRACTICAL PERSON", "B": "AN OUT-OF-THE-BOX-THINKING PERSON?" },
    { "number": 21, "question": "IN A LARGE GROUP, DO YOU MORE OFTEN", "A": "INTRODUCE OTHERS", "B": "GET INTRODUCED?" },
    { "number": 22, "question": "DO YOU USUALLY", "A": "VALUE EMOTION MORE THAN LOGIC", "B": "VALUE LOGIC MORE THAN FEELINGS?" },
    { "number": 23, "question": "WOULD YOU RATHER HAVE AS A FRIEND", "A": "SOMEONE WHO IS ALWAYS COMING UP WITH NEW IDEAS", "B": "SOMEONE WHO HAS BOTH FEET ON THE GROUND?" },
    { "number": 24, "question": "CAN THE NEW PEOPLE YOU MEET TELL WHAT YOU ARE INTERESTED IN", "A": "RIGHT AWAY", "B": "ONLY AFTER THEY REALLY GET TO KNOW YOU?" },
    { "number": 25, "question": "IN YOUR DAILY WORK, DO YOU", "A": "USUALLY PLAN YOUR WORK SO YOU WON’T NEED TO WORK UNDER PRESSURE", "B": "RATHER ENJOY AN EMERGENCY THAT MAKES YOU WORK AGAINST TIME" },
    { "number": 26, "question": "DO YOU USUALLY", "A": "SHOW YOUR FEELINGS FREELY", "B": "KEEP YOUR FEELINGS TO YOURSELF?" },

    { "number": 27, "question": "Which word would you choose?", "A": "SCHEDULED", "B": "UNPLANNED" },
    { "number": 28, "question": "Which word would you choose?", "A": "FACTS", "B": "IDEAS" },
    { "number": 29, "question": "Which word would you choose?", "A": "QUIET", "B": "HEARTY" },
    { "number": 30, "question": "Which word would you choose?", "A": "CONVINCING", "B": "TOUCHING" },
    { "number": 31, "question": "Which word would you choose?", "A": "IMAGINATIVE", "B": "MATTER-OF-FACT" },
    { "number": 32, "question": "Which word would you choose?", "A": "BENEFITS", "B": "BLESSINGS" },
    { "number": 33, "question": "Which word would you choose?", "A": "PEACEMAKER", "B": "JUDGE" },
    { "number": 34, "question": "Which word would you choose?", "A": "SYSTEMATIC", "B": "SPONTANEOUS" },
    { "number": 35, "question": "Which word would you choose?", "A": "STATEMENT", "B": "CONCEPT" },
    { "number": 36, "question": "Which word would you choose?", "A": "RESERVED", "B": "TALKATIVE" },
    { "number": 37, "question": "Which word would you choose?", "A": "ANALYZE", "B": "SYMPATHIZE" },
    { "number": 38, "question": "Which word would you choose?", "A": "CREATE", "B": "MAKE" },
    { "number": 39, "question": "Which word would you choose?", "A": "DETERMINED", "B": "DEVOTED" },
    { "number": 40, "question": "Which word would you choose?", "A": "GENTLE", "B": "FIRM" },
    { "number": 41, "question": "Which word would you choose?", "A": "SYSTEMATIC", "B": "CASUAL" },
    { "number": 42, "question": "Which word would you choose?", "A": "CERTAINTY", "B": "THEORY" },
    { "number": 43, "question": "Which word would you choose?", "A": "CALM", "B": "LIVELY" },
    { "number": 44, "question": "Which word would you choose?", "A": "JUSTICE", "B": "MERCY" },
    { "number": 45, "question": "Which word would you choose?", "A": "FASCINATING", "B": "SENSIBLE" },
    { "number": 46, "question": "Which word would you choose?", "A": "FIRM-MINDED", "B": "WARM HEARTED" },
    { "number": 47, "question": "Which word would you choose?", "A": "FEELING", "B": "THINKING" },
    { "number": 48, "question": "Which word would you choose?", "A": "LITERAL", "B": "FIGURATIVE" },
    { "number": 49, "question": "Which word would you choose?", "A": "ANTICIPATION", "B": "COMPASSION" },
    { "number": 50, "question": "Which word would you choose?", "A": "HARD", "B": "SOFT" }
]

const keys = {
    "3A": [2, "E"],
    "26A": [1, "E"],
    "26B": [0, "I"],

    "3B": [2, "S"],
    "2A": [2, "N"],
    "2B": [2, "F"],
    "4B": [2, "E"],
    "4A": [1, "S"],
    "1A": [2, "S"],
    "1B": [2, "F"],
    "6A": [2, "E"],
    "6B": [1, "S"],
    "5B": [1, "S"],
    "5A": [1, "N"],
    "14B": [2, "E"],
    "14A": [1, "S"],
    "7A": [1, "S"],
    "7B": [1, "N"],
    "9A": [2, "E"],
    "9B": [1, "S"],
    "10A": [1, "S"],
    "10B": [2, "N"],
    "22B": [2, "F"],
    "22A": [2, "E"],
    "7C": [1, "S"],
    "13A": [1, "S"],
    "13B": [2, "N"],
    "12A": [1, "N"],
    "12B": [2, "F"],
    "30A": [2, "F"],
    "30B": [1, "E"],
    "8A": [1, "S"],
    "8B": [2, "S"],
    "16A": [2, "N"],
    "16B": [2, "N"],
    "32A": [1, "E"],
    "32B": [1, "E"],
    "11A": [2, "S"],
    "11B": [1, "S"],
    "21A": [2, "N"],
    "21B": [2, "N"],
    "20A": [2, "F"],
    "20B": [2, "F"],
    "33B": [2, "E"],
    "33A": [0, "S"],
    "17A": [2, "S"],
    "17B": [2, "N"],
    "24A": [1, "N"],
    "24B": [1, "F"],
    "23B": [2, "F"],
    "23A": [1, "F"],
    "37A": [1, "F"],
    "37B": [2, "F"],
    "18A": [1, "F"],
    "18B": [1, "F"],
    "28A": [2, "J"],
    "28B": [1, "J"],
    "39A": [1, "J"],
    "39B": [1, "J"],
    "19A": [1, "J"],
    "19B": [1, "J"],
    "29B": [2, "J"],
    "29A": [2, "J"],
    "31B": [2, "J"],
    "31A": [0, "J"],
    "40B": [2, "J"],
    "40A": [1, "J"],
    "36B": [2, "J"],
    "36A": [1, "J"],
    "35A": [2, "J"],
    "35B": [1, "J"],
    "44A": [1, "J"],
    "44B": [2, "J"],
    "43B": [1, "J"],
    "43A": [1, "J"],
    "38B": [2, "J"],
    "38A": [0, "J"],
    "46A": [2, "J"],
    "46B": [0, "J"],
    "27A": [2, "J"],
    "27B": [2, "J"],
    "42A": [1, "J"],
    "42B": [2, "J"],
    "47B": [2, "J"],
    "47A": [1, "J"],
    "34A": [2, "J"],
    "34B": [2, "J"],
    "45B": [2, "J"],
    "45A": [0, "J"],
    "49A": [2, "J"],
    "49B": [1, "J"],
    "41A": [2, "J"],
    "41B": [2, "J"],
    "48A": [1, "J"],
    "48B": [1, "J"],
    "50A": [2, "J"],
    "50B": [0, "J"],
    "25A": [1, "J"],
    "25C": [0, "J"],

    "25B": [1, "P"],
    "15A": [0, "N"],
    "15B": [1, "S"],




}


const personalityData = {
    "E": "Extraverted (E) – prefer group activities, think while speaking, get energized by social interaction.",
    "I": "Introverted (I) – prefer solitary activities, think before speaking, get exhausted by social interaction.",

    "N": "Intuitive (N) – imaginative, rely on their intuition, absorbed in ideas, focus on what might happen.",
    "S": "Sensing (S) – down-to-earth, rely on their senses, absorbed in practical matters, focus on what has happened.",

    "T": "Thinking (T) - tough, follow their minds, focus on objectivity and rationality",
    "F": "Feeling (F) – sensitive, follow their hearts, focus on harmony and cooperation",

    "J": "Judging (J) – decisive, prefer clear rules and guidelines, see deadlines as sacred, seek closure.",
    "P": "Perceiving (P) – very good at improvising, prefer keeping their options open, relaxed about their work, seek freedom"
}

const careers = {
    "ISTJ": ["Accountant", "Auditor", "Project Manager", "Computer Programmer", "Data Analyst", "Police Officer", "Civil Engineer", "Financial Analyst"],
    "ISFJ": ["Nurse", "Teacher", "Librarian", "Social Worker", "Office Manager", "Counselor", "Dental Hygienist", "Veterinarian"],
    "INFJ": ["Psychologist", "Counselor", "Social Worker", "Human Resources Manager", "Writer", "Artist", "Graphic Designer", "Librarian"],
    "INTJ": ["Scientist", "Engineer", "Architect", "IT Consultant", "Researcher", "Computer Programmer", "Financial Analyst", "Strategic Planner"],
    "ISTP": ["Mechanic", "Engineer", "Pilot", "Carpenter", "Forester", "Police Officer", "Firefighter", "Paramedic"],
    "ISFP": ["Artist", "Musician", "Graphic Designer", "Photographer", "Interior Designer", "Chef", "Counselor", "Veterinarian"],
    "INFP": ["Writer", "Counselor", "Psychologist", "Social Worker", "Graphic Designer", "Librarian", "Artist", "Musician"],
    "INTP": ["Scientist", "Software Developer", "Architect", "Engineer", "Mathematician", "Researcher", "University Professor", "Technical Writer"],
    "ESTP": ["Salesperson", "Entrepreneur", "Police Officer", "Paramedic", "Firefighter", "Real Estate Agent", "Sports Coach", "Pilot"],
    "ESFP": ["Actor", "Dancer", "Singer", "Event Planner", "Sales Representative", "Fashion Designer", "Chef", "Paramedic"],
    "ENFP": ["Teacher", "Counselor", "Public Relations Specialist", "Actor", "Writer", "Journalist", "Event Planner", "Social Worker"],
    "ENTP": ["Entrepreneur", "Lawyer", "Psychologist", "Engineer", "Scientist", "Marketing Manager", "Venture Capitalist", "Politician"],
    "ESTJ": ["Manager", "Business Administrator", "Police Officer", "Military Officer", "Judge", "Financial Advisor", "Civil Engineer", "Accountant"],
    "ESFJ": ["Nurse", "Teacher", "HR Specialist", "Event Planner", "Sales Representative", "Social Worker", "Customer Service Representative", "Librarian"],
    "ENFJ": ["Counselor", "Psychologist", "Social Worker", "HR Specialist", "Event Planner", "Public Relations Specialist", "Human Resources Manager", "Teacher"],
    "ENTJ": ["CEO", "Lawyer", "Judge", "Entrepreneur", "Financial Advisor", "Politician", "Marketing Manager", "Management Consultant"]
}


function choosePersonality(arr) {
    if (Object.values(arr)[1] >= Object.values(arr)[0]) {
        return 1;
    }
    return 0;
}

// GET request to retrieve all users
app.get('/mbti/questions', (req, res) => {
    res.json(questions);
});

app.post("/mbti", (req, res) => {

    const answers = req.body.answers;
    console.log(answers);
    const ei = { "E": 0, "I": 0 };
    const sn = { "S": 0, "N": 0 };
    const tf = { "T": 0, "F": 0 };
    const jp = { "J": 0, "P": 0 };

    const mbti = { "E": 0, "I": 0, "S": 0, "N": 0, "T": 0, "F": 0, "J": 0, "P": 0 }

    answers.forEach(element => {
        // console.log(keys);
        // console.log(element);
        let key;
        if (element in keys) {
            key = keys[element]
            const letter = key[1];
            const number = key[0];
            // console.log(letter);
            mbti[letter] += number;


        }
        else { console.log(element + "Not present but proceeding"); }


    });

    ei['E'] = mbti['E']
    ei['I'] = mbti['I']

    sn['S'] = mbti['S']
    sn['N'] = mbti['N']

    tf['T'] = mbti['T']
    tf['F'] = mbti['F']

    jp['J'] = mbti['J']
    jp['P'] = mbti['P']

    const first = Object.keys(ei)[choosePersonality(ei)]
    const second = Object.keys(sn)[choosePersonality(sn)]
    const third = Object.keys(tf)[choosePersonality(tf)]
    const fourth = Object.keys(jp)[choosePersonality(jp)]

    const personality = first + second + third + fourth;
    const personalityDetails = personalityData[first] + "\n" +  personalityData[second] + "\n" + personalityData[third]+ "\n" + personalityData[fourth]

    const career = careers[personality];
    res.json({personality, personalityDetails, career});
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

