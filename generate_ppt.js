import pptxgen from 'pptxgenjs';
import fs from 'fs';

const pres = new pptxgen();

// Layout and Design
pres.layout = 'LAYOUT_16x9';

// --- SLIDE 1: Title ---
let slide = pres.addSlide();
slide.addText("Fantasy Quest: Aptitude Adventure", { x: 0.5, y: 1.5, w: '90%', h: 1.5, fontSize: 48, bold: true, color: '0A0A1A', align: 'center' });
slide.addText("A Gamified Learning Experience", { x: 0.5, y: 3.5, w: '90%', h: 0.8, fontSize: 24, align: 'center', color: '333333' });
slide.addText("Presented by: Game Development Team", { x: 0.5, y: 5.0, w: '90%', h: 0.5, fontSize: 18, align: 'center', color: '555555' });
slide.background = { color: 'F0F4F8' }; // Light background

// --- SLIDE 2: Table of Contents ---
slide = pres.addSlide();
slide.addText("Presentation Overview", { x: 0.5, y: 0.5, w: 5, fontSize: 32, bold: true, color: '0056b3' });
slide.addText([
    { text: "1. Game Concept & Vision\n", options: { fontSize: 16 } },
    { text: "2. The Storyline\n", options: { fontSize: 16 } },
    { text: "3. Characters & Lore\n", options: { fontSize: 16 } },
    { text: "4. Core Game Mechanics\n", options: { fontSize: 16 } },
    { text: "5. Features & Power-ups\n", options: { fontSize: 16 } },
    { text: "6. Technical Architecture\n", options: { fontSize: 16 } },
    { text: "7. Design & UI/UX\n", options: { fontSize: 16 } },
    { text: "8. Future Roadmap\n", options: { fontSize: 16 } },
], { x: 1, y: 1.5, w: 8, h: 4, bullet: true, color: '333333' });

// --- SLIDE 3: Game Concept ---
slide = pres.addSlide();
slide.addText("Game Concept", { x: 0.5, y: 0.5, w: 5, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("What is Fantasy Quest?", { x: 0.5, y: 1.2, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Genre: Educational RPG / Trivia", options: { breakLine: true } },
    { text: "Platform: Web Browser (Responsive)", options: { breakLine: true } },
    { text: "Objective: Combine learning with engaging gameplay mechanics to make studying fun.", options: { breakLine: true } },
    { text: "Target Audience: Students preparing for aptitude tests, coding interviews, and general knowledge enthusiasts.", options: { breakLine: true } }
], { x: 0.5, y: 2.0, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 4: The Story Setting ---
slide = pres.addSlide();
slide.addText("The Story: The Legend of Garuddwar", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '8B0000' });
slide.addText("A Kingdom in Peril", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText("The peaceful village of Garuddwar has been attacked by the ancient dragon Nagshakthi. The beast has kidnapped the Princess and taken her to its lair deep within the Sky Kingdom.", { x: 0.5, y: 2.2, w: 9, fontSize: 18, color: '444444' });

// --- SLIDE 5: The Weapon ---
slide = pres.addSlide();
slide.addText("The Weapon of Choice", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("Knowledge is Power", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Swords and arrows cannot pierce the dragon's hide.", options: { breakLine: true } },
    { text: "Only correct answers to aptitude questions can weaken Nagshakthi.", options: { breakLine: true } },
    { text: "The Hero must prove their intellect across 7 distinct levels to defeat the beast.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 6: Characters - The Hero ---
slide = pres.addSlide();
slide.addText("Characters: The Hero", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("The Player Avatar", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Represents the user embarking on a quest for knowledge.", options: { breakLine: true } },
    { text: "Equipped with the Sword of Intellect and Shield of Wisdom.", options: { breakLine: true } },
    { text: "Can customize their name at the start of the journey.", options: { breakLine: true } },
    { text: "Gains power and confidence with every correct answer.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 7: Characters - The Villain ---
slide = pres.addSlide();
slide.addText("Characters: Nagshakthi", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '8B0000' });
slide.addText("The Dragon Boss", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Nagshakthi is a formidable foe that guards each level.", options: { breakLine: true } },
    { text: "Attacks the player when they answer incorrectly.", options: { breakLine: true } },
    { text: "Has powerful 'Fire Breath' and 'Special Beam' attacks.", options: { breakLine: true } },
    { text: "Its health is directly tied to the remaining questions in the level.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 8: Characters - The Mentor ---
slide = pres.addSlide();
slide.addText("Characters: Master Roshi", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: 'FFA500' });
slide.addText("The Wise Guide", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "A legendary sage who offers guidance to the hero.", options: { breakLine: true } },
    { text: "Provides hints when the player is stuck.", options: { breakLine: true } },
    { text: "Offers motivational quotes during streaks.", options: { breakLine: true } },
    { text: "Scolds the player gently for careless mistakes, encouraging focus.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 9: Core Gameplay Mechanics ---
slide = pres.addSlide();
slide.addText("Core Gameplay Mechanics", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("Turn-Based Quiz Combat", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Question Phase: Player is presented with an aptitude question.", options: { breakLine: true } },
    { text: "Action Phase: Answering correctly deals damage to the dragon (progression).", options: { breakLine: true } },
    { text: "Reaction Phase: Answering incorrectly causes the dragon to attack (lose a life).", options: { breakLine: true } },
    { text: "Timer Phase: Players have a limited time (base 15s) to answer.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 10: The Timer System ---
slide = pres.addSlide();
slide.addText("The Timer System", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("Adding Urgency", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Base Time: Starts at 15 seconds per question.", options: { breakLine: true } },
    { text: "Scaling Difficulty: Time increases slightly with higher levels to account for complexity.", options: { breakLine: true } },
    { text: "Timeout Penalty: If time runs out, it's an immediate 'Game Over' (high stakes).", options: { breakLine: true } },
    { text: "Visual Cues: Timer ring turns red when critical (< 5s).", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 11: Lives & Health ---
slide = pres.addSlide();
slide.addText("Lives & Health System", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: 'DC143C' });
slide.addText("Survival Mechanics", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "The Hero starts with 3 Hearts (Lives).", options: { breakLine: true } },
    { text: "Wrong answers deduct 1 Heart.", options: { breakLine: true } },
    { text: "Losing all hearts results in a 'Game Over'.", options: { breakLine: true } },
    { text: "Players must balance speed with accuracy to preserve health.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 12: Unique Features - Power-ups ---
slide = pres.addSlide();
slide.addText("Unique Features: Power-ups", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: 'FFD700' });
slide.addText("Strategic Advantages", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Random Drops: Power-ups (Extra Time, Free Hint) drop randomly (30% chance) on correct answers.", options: { breakLine: true } },
    { text: "Extra Time (+5s): Adds 5 seconds to the current timer.", options: { breakLine: true } },
    { text: "Free Hint: Reveals a hint without the usual penalty.", options: { breakLine: true } },
    { text: "Inventory: Power-ups are stored in the HUD for later use.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 13: Unique Features - Streaks ---
slide = pres.addSlide();
slide.addText("Unique Features: Streak System", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("Rewarding Consistency", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Consecutive Correct Answers build a streak.", options: { breakLine: true } },
    { text: "3-Streak Reward: Grants the 'Shield of Knowledge' (blocks one attack).", options: { breakLine: true } },
    { text: "4-Streak Reward: Grants a 'Magic Key' (Subway Surfers style extra life).", options: { breakLine: true } },
    { text: "Critical Hits: Answering very quickly deals double damage/points.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 14: Level Progression ---
slide = pres.addSlide();
slide.addText("Level Progression", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '228B22' });
slide.addText("Journey Through Realms", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "The game features 7 distinct levels/rooms.", options: { breakLine: true } },
    { text: "Environments: Forest -> Cave -> Castle -> Mountain -> Desert -> Ocean -> Sky.", options: { breakLine: true } },
    { text: "Dynamic Backgrounds: The background changes with each level to reflect the journey.", options: { breakLine: true } },
    { text: "Princess Gifts: Completing levels awards gifts (Golden Rose, Diamond Tiara) to collect.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 15: Technical Stack ---
slide = pres.addSlide();
slide.addText("Technical Stack", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("Modern Web Technologies", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Frontend Framework: React 19 (Component-based UI)", options: { breakLine: true } },
    { text: "Build Tool: Vite (Fast HMR and bundling)", options: { breakLine: true } },
    { text: "Language: JavaScript (ES6+)", options: { breakLine: true } },
    { text: "Styling: Vanilla CSS3 (Variables, Animations, Flexbox/Grid)", options: { breakLine: true } },
    { text: "Audio: Web Audio API (Synthesized sound effects in pure JS)", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 16: Project Structure ---
slide = pres.addSlide();
slide.addText("Project Structure", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("Organized & Scalable", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "src/components: Reusable UI blocks (GameScreen, HUD, QuestionCard).", options: { breakLine: true } },
    { text: "src/hooks: Custom logic extraction (useTimer, useSound).", options: { breakLine: true } },
    { text: "src/data: Static content (questions.js, quotes.js).", options: { breakLine: true } },
    { text: "src/assets: Images and media resources.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 17: Key Component - GameScreen ---
slide = pres.addSlide();
slide.addText("Key Component: GameScreen", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("The Brain of the Operation", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Manages global game state (Score, Level, Lives, Status).", options: { breakLine: true } },
    { text: "Handles game loop logic (Question Generation -> Answer Check -> Transition).", options: { breakLine: true } },
    { text: "Coordinates animations and sound effects.", options: { breakLine: true } },
    { text: "Orchestrates sub-components like HUD and Battle Arena.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 18: Key Component - HUD ---
slide = pres.addSlide();
slide.addText("Key Component: HUD", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("Heads-Up Display", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Provides real-time feedback to the player.", options: { breakLine: true } },
    { text: "Visualizes the Timer (SVG Ring Animation).", options: { breakLine: true } },
    { text: "Displays Score, Level, and Current Room.", options: { breakLine: true } },
    { text: "Shows Power-up inventory and Control buttons (Pause, Mute).", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 19: Key Component - QuestionCard ---
slide = pres.addSlide();
slide.addText("Key Component: QuestionCard", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("The Interaction Layer", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Renders the current question and options.", options: { breakLine: true } },
    { text: "Handles user clicks and selection states.", options: { breakLine: true } },
    { text: "Displays feedback (Correct/Incorrect animations).", options: { breakLine: true } },
    { text: "Includes the Hint UI bubble.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 20: Custom Hook - useTimer ---
slide = pres.addSlide();
slide.addText("Custom Hook: useTimer", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '800080' });
slide.addText("Time Management Logic", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Encapsulates all timer-related logic (Start, Stop, Pause, Reset).", options: { breakLine: true } },
    { text: "Uses `setInterval` and `useRef` to maintain accurate time tracking.", options: { breakLine: true } },
    { text: "Handles callback execution on timeout.", options: { breakLine: true } },
    { text: "Promotes code reusability and separation of concerns.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 21: Audio System (useSound) ---
slide = pres.addSlide();
slide.addText("The Audio System", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '800080' });
slide.addText("Web Audio API Synthesis", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Instead of loading heavy MP3 files, we synthesize sounds in real-time.", options: { breakLine: true } },
    { text: "Oscillators generate waves (Sine, Square, Sawtooth) for effects.", options: { breakLine: true } },
    { text: "Effects include: Correct (Chime), Wrong (Buzz), Victory (Fanfare), and ambient music.", options: { breakLine: true } },
    { text: "Benefits: Zero load time, tiny bundle size, dynamic pitch control.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 22: Data Management ---
slide = pres.addSlide();
slide.addText("Data: Questions & Logic", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("The Knowledge Base", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "questions.js: Central repository of categorized questions (Coding, Maths, Logic).", options: { breakLine: true } },
    { text: "Randomization: Questions are shuffled and served dynamically.", options: { breakLine: true } },
    { text: "Difficulty Tiers: Questions have difficulty ratings (1-3) to scale challenge.", options: { breakLine: true } },
    { text: "Scalable: Easy to add new categories or questions without code changes.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 23: UI/UX & Design ---
slide = pres.addSlide();
slide.addText("UI/UX & Design Philosophy", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: 'FF69B4' });
slide.addText("Immersive & Premium", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Glassmorphism: Translucent UI elements for a modern feel.", options: { breakLine: true } },
    { text: "Animations: CSS keyframes for entrances, attacks, and particle effects.", options: { breakLine: true } },
    { text: "Responsive Design: Adapts to different screen sizes.", options: { breakLine: true } },
    { text: "Visual Feedback: Screen shake on damage, confetti on victory.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 24: Conclusion & Future ---
slide = pres.addSlide();
slide.addText("Conclusion & Future Roadmap", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("What's Next?", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });
slide.addText([
    { text: "Leaderboards: Global high scores.", options: { breakLine: true } },
    { text: "Multiplayer Mode: 1v1 Battles.", options: { breakLine: true } },
    { text: "More Content: New question packs and storylines.", options: { breakLine: true } },
    { text: "Mobile App: React Native port.", options: { breakLine: true } }
], { x: 0.5, y: 2.2, w: 9, h: 3, bullet: true, fontSize: 18, color: '444444' });

// --- SLIDE 25: Gameplay Flow ---
slide = pres.addSlide();
slide.addText("Gameplay Flow Diagram", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: '0056b3' });
slide.addText("How the Game Works", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });

// Create flow shapes
slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 2.5, w: 2, h: 1, fill: { color: 'E1F5FE' }, line: { color: '03A9F4' } });
slide.addText("Start Game\n(Select Name)", { x: 0.5, y: 2.5, w: 2, h: 1, align: 'center', fontSize: 14 });

slide.addShape(pres.ShapeType.rightArrow, { x: 2.6, y: 2.9, w: 0.8, h: 0.2, fill: { color: 'CCCCCC' } });

slide.addShape(pres.ShapeType.rect, { x: 3.5, y: 2.5, w: 2, h: 1, fill: { color: 'FFF3E0' }, line: { color: 'FF9800' } });
slide.addText("Level 1\n(Forest Room)", { x: 3.5, y: 2.5, w: 2, h: 1, align: 'center', fontSize: 14 });

slide.addShape(pres.ShapeType.rightArrow, { x: 5.6, y: 2.9, w: 0.8, h: 0.2, fill: { color: 'CCCCCC' } });

slide.addShape(pres.ShapeType.rect, { x: 6.5, y: 2.5, w: 2, h: 1, fill: { color: 'E8F5E9' }, line: { color: '4CAF50' } });
slide.addText("Battle Logic\n(Q -> A -> R)", { x: 6.5, y: 2.5, w: 2, h: 1, align: 'center', fontSize: 14 });

slide.addShape(pres.ShapeType.downArrow, { x: 7.4, y: 3.6, w: 0.2, h: 0.8, fill: { color: 'CCCCCC' } });

slide.addShape(pres.ShapeType.rect, { x: 6.5, y: 4.5, w: 2, h: 1, fill: { color: 'FFEBEE' }, line: { color: 'F44336' } });
slide.addText("Outcome:\nWin / Game Over", { x: 6.5, y: 4.5, w: 2, h: 1, align: 'center', fontSize: 14 });

// --- SLIDE 26: Visual Gallery (Placeholders) ---
slide = pres.addSlide();
slide.addText("Visual Gallery", { x: 0.5, y: 0.5, w: 9, fontSize: 32, bold: true, color: 'FF69B4' });
slide.addText("Screenshots from Fantasy Quest", { x: 0.5, y: 1.5, fontSize: 24, bold: true, color: '333333' });

// Placeholder Frames where users can paste screenshots
slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 2.5, w: 4, h: 2.5, fill: { color: 'F5F5F5' }, line: { color: 'AAAAAA', dashType: 'dash' } });
slide.addText("[PLACEHOLDER: Intro Screen]\nPaste screenshot here", { x: 0.5, y: 2.5, w: 4, h: 2.5, align: 'center', color: 'AAAAAA' });

slide.addShape(pres.ShapeType.rect, { x: 5.0, y: 2.5, w: 4, h: 2.5, fill: { color: 'F5F5F5' }, line: { color: 'AAAAAA', dashType: 'dash' } }); // Adjusted x-position
slide.addText("[PLACEHOLDER: Battle Screen]\nPaste screenshot here", { x: 5.0, y: 2.5, w: 4, h: 2.5, align: 'center', color: 'AAAAAA' }); // Adjusted x-position

// --- SLIDE 27: Thank You ---
slide = pres.addSlide();
slide.addText("Thank You!", { x: 0.5, y: 2.0, w: '90%', fontSize: 48, bold: true, color: '0056b3', align: 'center' });
slide.addText("Any Questions?", { x: 0.5, y: 3.5, w: '90%', fontSize: 24, align: 'center', color: '333333' });
slide.background = { color: 'E6E6FA' };


// Write File
pres.writeFile({ fileName: "Fantasy_Quest_Presentation.pptx" })
    .then(fileName => {
        console.log(`Created file: ${fileName}`);
    })
    .catch(err => {
        console.error(err);
    });
