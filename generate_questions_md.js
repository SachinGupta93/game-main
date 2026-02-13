
import fs from 'fs';
import {
    codingQuestions,
    mathsQuestions,
    chemistryQuestions,
    reasoningQuestions,
    aptitudeQuestions,
    advancedMathsQuestions,
    bloodRelationsQuestions,
    logicalThinkingQuestions,
    puzzleQuestions
} from './src/data/questions.js';

const allCategories = [
    { name: "Coding", questions: codingQuestions },
    { name: "Maths", questions: mathsQuestions },
    { name: "Chemistry", questions: chemistryQuestions },
    { name: "Reasoning", questions: reasoningQuestions },
    { name: "Aptitude", questions: aptitudeQuestions },
    { name: "Advanced Maths", questions: advancedMathsQuestions },
    { name: "Blood Relations", questions: bloodRelationsQuestions },
    { name: "Logical Thinking", questions: logicalThinkingQuestions },
    { name: "Puzzles", questions: puzzleQuestions }
];

let output = "# Fantasy Quest: All Questions and Answers\n\n";

allCategories.forEach(category => {
    output += `## ${category.name}\n\n`;
    category.questions.forEach((q, index) => {
        output += `**${index + 1}. ${q.question}**\n`;
        q.options.forEach((opt, i) => {
            output += `- ${String.fromCharCode(65 + i)}) ${opt}\n`;
        });
        output += `\n> **Correct Answer:** ${q.answer}\n`;
        if (q.hint) output += `> *Hint:* ${q.hint}\n`;
        output += `\n---\n\n`;
    });
});

fs.writeFileSync('ALL_QUESTIONS_AND_ANSWERS.md', output);
console.log("File generated successfully.");
