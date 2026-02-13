export const codingQuestions = [
    { question: "What is the output of: console.log([] + []);", options: ['""', '"undefined"', '"0"', '"NaN"'], answer: '""', hint: "Arrays are coerced to strings before concatenation.", difficulty: 1 },
    { question: "What does 'use strict' prevent in JavaScript?", options: ["Using undeclared variables", "Using functions", "Using loops", "Using arrays"], answer: "Using undeclared variables", hint: "It enforces cleaner code by catching silent errors.", difficulty: 1 },
    { question: "Which HTTP status code means 'Too Many Requests'?", options: ["403", "408", "429", "503"], answer: "429", hint: "It's a 4xx client error related to rate limiting.", difficulty: 1 },
    { question: "What is the time complexity of Array.prototype.indexOf()?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: "O(n)", hint: "It scans elements one by one in the worst case.", difficulty: 2 },
    { question: "What does the 'z-index' property require to work in CSS?", options: ["display: block", "position: static", "A non-static position", "float: left"], answer: "A non-static position", hint: "Static positioning ignores z-index.", difficulty: 2 },
    { question: "What is the output of: console.log(0.1 + 0.2 === 0.3);", options: ["true", "false", "undefined", "TypeError"], answer: "false", hint: "Floating-point precision is tricky in JavaScript!", difficulty: 3 },
    { question: "Why did the coder break up with the keyboard? Because it had too many keys and was always pressing the wrong buttons!", options: ["Funny", "Confusing", "True", "False"], answer: "Funny", hint: "It's a joke! 😄", difficulty: 1 }
];

export const mathsQuestions = [
    { question: "What is the sum of all integers from 1 to 100?", options: ["4950", "5050", "5150", "5500"], answer: "5050", hint: "Use Gauss's formula: n(n+1)/2.", difficulty: 1 },
    { question: "What comes next: 2, 6, 12, 20, 30, ...?", options: ["40", "42", "44", "48"], answer: "42", hint: "Differences increase by 2 each time.", difficulty: 1 },
    { question: "What is the GCD of 252 and 105?", options: ["7", "14", "21", "42"], answer: "21", hint: "Use the Euclidean algorithm.", difficulty: 2 },
    { question: "Solve: 3x² - 12x + 9 = 0", options: ["x = 1, 3", "x = 2, 3", "x = -1, -3", "x = 1, -3"], answer: "x = 1, 3", hint: "Factor out 3 first, then factor.", difficulty: 2 },
    { question: "What is log₂(256)?", options: ["6", "7", "8", "9"], answer: "8", hint: "2 raised to what power gives 256?", difficulty: 2 },
    { question: "If a matrix A is 3×4 and B is 4×2, what is the size of AB?", options: ["3×2", "4×4", "3×4", "2×3"], answer: "3×2", hint: "Rows of A × Columns of B.", difficulty: 3 },
    { question: "How many diagonals does a decagon (10-sided polygon) have?", options: ["25", "30", "35", "40"], answer: "35", hint: "Formula: n(n-3)/2.", difficulty: 3 }
];

export const chemistryQuestions = [
    { question: "What is the hybridization of the central atom in SF₆?", options: ["sp³", "sp³d", "sp³d²", "sp²"], answer: "sp³d²", hint: "Sulfur has 6 bonding pairs and no lone pairs." },
    { question: "Which element has the highest electronegativity?", options: ["Oxygen", "Fluorine", "Chlorine", "Nitrogen"], answer: "Fluorine", hint: "It's in the top-right corner of the periodic table (excluding noble gases)." },
    { question: "What is the oxidation state of Mn in KMnO₄?", options: ["+4", "+5", "+6", "+7"], answer: "+7", hint: "K is +1, each O is -2. Solve for Mn." },
    { question: "Which type of bond is formed between NH₃ and BF₃?", options: ["Ionic bond", "Coordinate/dative bond", "Metallic bond", "Van der Waals"], answer: "Coordinate/dative bond", hint: "NH₃ donates its lone pair to the empty orbital of B." },
    { question: "What is the IUPAC name for CH₃CH(OH)CH₃?", options: ["1-propanol", "2-propanol", "methanol", "butanol"], answer: "2-propanol", hint: "The OH group is on the second carbon of a 3-carbon chain." },
    { question: "How many moles of CO₂ are produced when 2 moles of C₂H₆ undergo complete combustion?", options: ["2", "3", "4", "6"], answer: "4", hint: "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O." },
    { question: "Why did the chemist break up with the physicist? Because there was no chemistry!", options: ["Funny", "Confusing", "True", "False"], answer: "Funny", hint: "It's a chemistry pun! 😄" }
];

export const reasoningQuestions = [
    { question: "A clock shows 3:15. What is the angle between the hour and minute hands?", options: ["0°", "7.5°", "15°", "22.5°"], answer: "7.5°", hint: "At 3:15, the hour hand has moved slightly past the 3." },
    { question: "If A=1, B=2, C=3... What is the value of FACE?", options: ["12", "15", "18", "20"], answer: "15", hint: "Add the positions: F(6) + A(1) + C(3) + E(5)." },
    { question: "In a race of 5 people, A finishes before B but after C. D finishes before E but after B. Who finishes last?", options: ["A", "B", "D", "E"], answer: "E", hint: "Order: C, A, B, D, E." },
    { question: "If all Zips are Zaps, and some Zaps are Zops, which must be true?", options: ["All Zips are Zops", "Some Zips are Zops", "No Zips are Zops", "None of these must be true"], answer: "None of these must be true", hint: "\"Some Zaps are Zops\" doesn't guarantee the Zap-Zops overlap with Zips." },
    { question: "Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?", options: ["7", "10", "12", "13"], answer: "10", hint: "Pattern is +3, -2, +3, -2..." },
    { question: "A farmer has 17 sheep. All but 9 die. How many are left?", options: ["0", "8", "9", "17"], answer: "9", hint: "Read carefully: 'all but 9' means 9 survive." },
    { question: "Why did the logic puzzle go to therapy? Because it had too many unresolved issues!", options: ["Funny", "Confusing", "True", "False"], answer: "Funny", hint: "It's a logic joke! 🤓" }
];

export const aptitudeQuestions = [
    { question: "A shopkeeper marks a product 40% above cost and then gives a 20% discount. What is the profit %?", options: ["8%", "10%", "12%", "20%"], answer: "12%", hint: "If cost = 100, marked = 140, selling = 140 × 0.8 = 112." },
    { question: "Two pipes fill a tank in 12 and 18 hours. A drain empties it in 36 hours. How long to fill with all open?", options: ["8 hrs", "9 hrs", "10 hrs", "12 hrs"], answer: "9 hrs", hint: "Combined rate = 1/12 + 1/18 - 1/36 per hour." },
    { question: "A sum doubles in 5 years at simple interest. What is the rate?", options: ["10%", "15%", "20%", "25%"], answer: "20%", hint: "Interest = Principal, so P×R×5/100 = P. Solve for R." },
    { question: "Train A (120m) crosses Train B (130m) moving in opposite directions at 50 and 40 km/h. Time taken?", options: ["8 sec", "10 sec", "12 sec", "15 sec"], answer: "10 sec", hint: "Total distance = 250m, relative speed = 90 km/h = 25 m/s." },
    { question: "In how many ways can 5 people be seated in a row?", options: ["25", "60", "100", "120"], answer: "120", hint: "It's 5! (5 factorial) = 5 × 4 × 3 × 2 × 1." },
    { question: "A boat goes 24 km upstream in 6 hrs and 24 km downstream in 4 hrs. Speed of the current?", options: ["0.5 km/h", "1 km/h", "1.5 km/h", "2 km/h"], answer: "1 km/h", hint: "Upstream speed = 4, downstream speed = 6. Current = (6-4)/2." },
    { question: "Why did the bicycle fall over? Because it was two-tired!", options: ["Funny", "Confusing", "True", "False"], answer: "Funny", hint: "It's a pun! 🚲" }
];

export const advancedMathsQuestions = [
    { question: "What is the derivative of ln(sin(x))?", options: ["cos(x)/sin(x)", "1/sin(x)", "tan(x)", "cot(x)"], answer: "cot(x)", hint: "Use chain rule: d/dx[ln(u)] = u'/u, where u = sin(x)." },
    { question: "Evaluate: ∫₀^π sin(x) dx", options: ["0", "1", "2", "π"], answer: "2", hint: "Antiderivative is -cos(x). Evaluate from 0 to π." },
    { question: "What is the determinant of [[3,1],[5,2]]?", options: ["-1", "0", "1", "11"], answer: "1", hint: "det = ad - bc = 3×2 - 1×5." },
    { question: "For f(x) = x³ - 3x, how many local extrema exist?", options: ["0", "1", "2", "3"], answer: "2", hint: "f'(x) = 3x² - 3 = 0 gives x = ±1, one max and one min." },
    { question: "What is the sum of the infinite geometric series: 1 + 1/2 + 1/4 + 1/8 + ...?", options: ["1", "1.5", "2", "∞"], answer: "2", hint: "Sum = a/(1-r) where a=1, r=1/2." },
    { question: "If z = 3 + 4i, what is |z|?", options: ["3", "4", "5", "7"], answer: "5", hint: "|z| = √(a² + b²) = √(9 + 16)." },
    { question: "What is the Taylor series coefficient of x³ in eˣ?", options: ["1/2", "1/3", "1/6", "1/4"], answer: "1/6", hint: "The coefficient of xⁿ in eˣ is 1/n!. Here n=3, so 1/3! = 1/6." }
];

export const bloodRelationsQuestions = [
    { question: "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?", options: ["His own", "His son", "His father", "His nephew"], answer: "His son", hint: "'My father's son' with no siblings means the speaker himself. So 'that man's father is ME'." },
    { question: "A is B's sister. C is B's mother. D is C's father. E is D's mother. Then, how is A related to D?", options: ["Grandfather", "Grandmother", "Daughter", "Granddaughter"], answer: "Granddaughter", hint: "A is female (sister). D is her mother's father." },
    { question: "Q's mother is the sister of P and daughter of M. S is the daughter of P and sister of T. How is M related to T?", options: ["Grandmother/Grandfather", "Father", "Uncle", "Brother"], answer: "Grandmother/Grandfather", hint: "M is the parent of P. P is the parent of T. So M is T's grandparent." },
    { question: "Looking at a portrait of a man, Harsh said, 'His mother is the wife of my father's son. Brothers and sisters I have none.' Whose portrait was it?", options: ["His son", "His nephew", "His cousin", "His uncle"], answer: "His son", hint: "Since he has no siblings, 'his father's son' is himself. So the portrait's mother is his wife." },
    { question: "A girl introduced a boy as the son of the daughter of the father of her uncle. The boy is the girl's:", options: ["Brother", "Uncle", "Nephew", "Son"], answer: "Brother", hint: "Father of uncle = Grandfather. Daughter of grandfather = Mother (or aunt). Son of mother = Brother." },
    { question: "If X is the brother of the son of Y's son, how is X related to Y?", options: ["Son", "Brother", "Cousin", "Grandson"], answer: "Grandson", hint: "Son of Y's son is Y's grandson. X is his brother, so X is also Y's grandson." },
    { question: "P is the brother of Q and R. S is R's mother. T is P's father. Which of the following statements cannot be definitely true?", options: ["T is Q's father", "S is P's mother", "P is S's son", "Q is T's son"], answer: "Q is T's son", hint: "We know P is a brother (male), but we don't know Q's gender. Q could be T's daughter." }
];

export const logicalThinkingQuestions = [
    { question: "You see a house with two doors. One leads to certain death and the other to freedom. There are two guards: one always tells the truth, and one always lies. You can ask only one question. What do you ask?", options: ["Which door leads to freedom?", "Which door would the other guard say leads to freedom?", "Are you the truth teller?", "Is the left door safe?"], answer: "Which door would the other guard say leads to freedom?", hint: "Both guards would point to the death door with this question. So choose the OTHER door." },
    { question: "Some months have 30 days, some have 31. How many have 28?", options: ["1", "4", "6", "12"], answer: "12", hint: "Every month has at least 28 days!" },
    { question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", options: ["A ghost", "An echo", "A cloud", "A shadow"], answer: "An echo", hint: "It reflects sound back to you." },
    { question: "The more of this there is, the less you see. What is it?", options: ["Fog", "Darkness", "Light", "Clouds"], answer: "Darkness", hint: "Light helps you see; its absence prevents it." },
    { question: "What has keys but cannot open locks?", options: ["A piano", "A map", "A book", "A cryptographic hash"], answer: "A piano", hint: "It makes music." },
    { question: "Which word becomes shorter when you add two letters to it?", options: ["Short", "Small", "Brief", "Tiny"], answer: "Short", hint: "Add 'er' to 'Short'." },
    { question: "What can travel around the world while staying in a corner?", options: ["A stamp", "A thought", "A plane", "The moon"], answer: "A stamp", hint: "It goes on an envelope." }
];

export const puzzleQuestions = [
    { question: "If 1=3, 2=3, 3=5, 4=4, 5=4, then 6=?", options: ["3", "4", "5", "6"], answer: "3", hint: "Count the number of letters in the English word (e.g., ONE=3, SIX=3)." },
    { question: "What number replaces the question mark? 2, 3, 5, 9, 17, ?", options: ["31", "33", "34", "35"], answer: "33", hint: "Differences are powers of 2: +1, +2, +4, +8. Next is +16. 17+16=33." },
    { question: "Find the odd one out: 3, 5, 7, 12, 17, 19", options: ["3", "12", "17", "19"], answer: "12", hint: "All others are prime numbers. 12 is composite." },
    { question: "If RED is 27 and BLUE is 40, what is GREEN?", options: ["45", "49", "55", "60"], answer: "49", hint: "Sum of letter positions: R(18)+E(5)+D(4)=27. G(7)+R(18)+E(5)+E(5)+N(14) = 49." },
    { question: "Solve: 8 ÷ 2(2 + 2) = ?", options: ["1", "16", "8", "4"], answer: "1", hint: "BODMAS: Parentheses first (4), then Division/Multiplication L to R: 8/8 = 1" },
    { question: "Unscramble: E O D C", options: ["DOPE", "CODE", "COED", "DECO"], answer: "CODE", hint: "It's what you write to build software." },
    { question: "What is 1000 + 40 + 1000 + 30 + 1000 + 20 + 1000 + 10?", options: ["5000", "4100", "4090", "6000"], answer: "4100", hint: "Sum is 4000 + 100 = 4100. Don't be tricked into saying 5000!" }
];

export const patternRecognitionQuestions = [
    {
        question: "Which symbol comes next in the sequence? ◯, △, □, ◯, △, ...",
        options: ["◯", "△", "□", "⬯"],
        answer: "□",
        hint: "It's a repeating sequence of circle, triangle, square.",
        difficulty: 1
    },
    {
        question: "In a 3x3 pattern, if the first row is [A, B, C] and the second is [B, C, A], what is the third row?",
        options: ["[C, A, B]", "[A, B, C]", "[B, C, A]", "[C, B, A]"],
        answer: "[C, A, B]",
        hint: "The elements are shifting left by one position in each row.",
        difficulty: 2
    },
    {
        question: "Identify the missing part: A image has a symmetry where the left side is a mirror of the right. If the left side shows '◢', what does the right side show?",
        options: ["◣", "◥", "◢", "◤"],
        answer: "◣",
        hint: "Think about mirror reflection across a vertical axis.",
        difficulty: 1
    },
    {
        question: "Logic Pattern: 2, 4, 8, 16, ? (Visualized as doubling dots)",
        options: ["24", "30", "32", "64"],
        answer: "32",
        hint: "Each step doubles the previous number.",
        difficulty: 1
    },
    {
        question: "Which pattern is the odd one out? (Grid 1: 3x3 dots, Grid 2: 4x4 dots, Grid 3: 5x5 dots, Grid 4: 3x4 dots)",
        options: ["Grid 1", "Grid 2", "Grid 3", "Grid 4"],
        answer: "Grid 4",
        hint: "Look for square grids versus rectangular grids.",
        difficulty: 2
    },
    {
        question: "Observe the pattern below. Which shape completes the 2x2 grid?",
        svg: `<svg viewBox="0 0 200 100" width="200" height="100">
                <rect x="10" y="10" width="40" height="40" fill="none" stroke="cyan" stroke-width="2"/>
                <circle cx="110" cy="30" r="20" fill="none" stroke="magenta" stroke-width="2"/>
                <rect x="10" y="60" width="40" height="40" fill="cyan" stroke="cyan" stroke-width="2"/>
                <text x="100" y="85" fill="white" font-family="Arial" font-size="24">?</text>
              </svg>`,
        options: ["Empty Circle", "Filled Circle", "Empty Square", "Filled Square"],
        answer: "Filled Circle",
        hint: "The bottom row is a filled version of the top row.",
        difficulty: 3
    }
];

export const categories = [
    { name: "Coding", icon: "💻", questions: codingQuestions },
    { name: "Maths", icon: "🔢", questions: mathsQuestions },
    { name: "Chemistry", icon: "⚗️", questions: chemistryQuestions },
    { name: "Reasoning", icon: "🧠", questions: reasoningQuestions },
    { name: "Patterns", icon: "🧩", questions: patternRecognitionQuestions },
    { name: "Aptitude", icon: "📊", questions: aptitudeQuestions },
    { name: "Adv. Maths", icon: "∫", questions: advancedMathsQuestions },
    { name: "Blood Rel.", icon: "👪", questions: bloodRelationsQuestions },
    { name: "Logic", icon: "💡", questions: logicalThinkingQuestions },
    { name: "Puzzles", icon: "🧩", questions: puzzleQuestions }
];

export const rooms = [
    { name: 'Forest', emoji: '🌲', gradient: ['#0d4d1a', '#1a8c3b'] },
    { name: 'Cave', emoji: '🦇', gradient: ['#1a1a2e', '#3d3d5c'] },
    { name: 'Castle', emoji: '🏰', gradient: ['#4a2511', '#8b5e3c'] },
    { name: 'Mountain', emoji: '⛰️', gradient: ['#2c3e50', '#4a6b82'] },
    { name: 'Desert', emoji: '🏜️', gradient: ['#c2842f', '#e8b86d'] },
    { name: 'Volcano', emoji: '🌋', gradient: ['#5c0a0a', '#d4380d'] },
    { name: 'Swamp', emoji: '🐊', gradient: ['#0a3d0a', '#1e6e1e'] },
    { name: 'Ruins', emoji: '🏛️', gradient: ['#3d3d3d', '#6b6b6b'] },
    { name: 'Ocean', emoji: '🌊', gradient: ['#0a1a3d', '#1e4d8c'] },
    { name: 'Sky', emoji: '☁️', gradient: ['#4a90c2', '#87ceeb'] }
];

export const achievementDefinitions = [
    { id: 'first_correct', name: 'First Blood', icon: '🗡️', description: 'Answer your first question correctly', threshold: 1 },
    { id: 'level_2', name: 'Forest Explorer', icon: '🌲', description: 'Reach Level 2', threshold: 6 },
    { id: 'level_3', name: 'Cave Dweller', icon: '🦇', description: 'Reach Level 3', threshold: 12 },
    { id: 'level_4', name: 'Castle Conqueror', icon: '🏰', description: 'Reach Level 4', threshold: 18 },
    { id: 'level_5', name: 'Mountain Climber', icon: '⛰️', description: 'Reach Level 5', threshold: 24 },
    { id: 'level_6', name: 'Desert Survivor', icon: '🏜️', description: 'Reach Level 6', threshold: 30 },
    { id: 'level_7', name: 'Volcano Master', icon: '🌋', description: 'Reach Level 7', threshold: 36 },
    { id: 'quest_complete', name: 'Dragon Slayer', icon: '🐉', description: 'Complete the entire quest', threshold: 42 },
];
