import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { categories, rooms, achievementDefinitions } from '../data/questions';
import { getMotivationalQuotes } from '../data/quotes';
import { useTimer } from '../hooks/useTimer';
import { useSound } from '../hooks/useSound';
import HUD from './HUD';
import QuestionCard from './QuestionCard';
import AchievementsModal from './AchievementsModal';
import GameOverOverlay from './GameOverOverlay';
import VictoryOverlay from './VictoryOverlay';
import './GameScreen.css';

const ADVICE_MESSAGES = [
    "Focus! Do not let your guard down!",
    "Patience is key. Think before you strike!",
    "A warrior learns more from defeat than victory!",
    "Calm your mind. The answer is within reach.",
    "Do not rush! Haste leads to errors.",
    "Observe carefully. Every detail matters.",
    "Failure is just a stepping stone to mastery!",
    "Breathe. Focus. Strike again!"
];

const PRINCESS_GIFTS = [
    { name: "Golden Rose", emoji: "🌹" },
    { name: "Diamond Tiara", emoji: "👑" },
    { name: "Crystal Necklace", emoji: "💎" },
    { name: "Magical Harp", emoji: "🎵" },
    { name: "Enchanted Ring", emoji: "💍" },
    { name: "Phoenix Feather", emoji: "🪶" }
];

const generateQuestions = () => {
    // Flatten all questions from all categories into one big pool
    const allQuestions = categories.flatMap(cat => cat.questions);

    // Shuffle the entire pool
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);

    // Take the first 35 questions
    const gameQuestions = shuffled.slice(0, 35);

    // Sort by difficulty (1 -> 2 -> 3)
    gameQuestions.sort((a, b) => {
        const da = a.difficulty || 2;
        const db = b.difficulty || 2;
        return da - db;
    });

    return gameQuestions;
};

export default function GameScreen({ userName, warningCount, onGameOver, enterFullscreen }) {
    // Core game state
    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [gameStatus, setGameStatus] = useState('playing'); // playing | gameOver | victory

    // Trigger onGameOver when game ends to exit fullscreen
    useEffect(() => {
        if (gameStatus !== 'playing' && onGameOver) {
            onGameOver();
        }
    }, [gameStatus, onGameOver]);

    // Question state
    const [levelQuestions, setLevelQuestions] = useState(() => generateQuestions());
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerResult, setAnswerResult] = useState(null); // null | 'correct' | 'wrong'
    const [resultMessage, setResultMessage] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [hintText, setHintText] = useState('');

    // Power-ups and achievements
    const [powerUps, setPowerUps] = useState([]);
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);
    const [collectedGifts, setCollectedGifts] = useState([]); // Gifts collected for the princess
    const [hasShield, setHasShield] = useState(false); // Shield of Knowledge
    const [keysCount, setKeysCount] = useState(0); // Subway Surfers style Revive Keys
    const [isCritical, setIsCritical] = useState(false); // Visual for critical hit
    const [showAchievements, setShowAchievements] = useState(false);
    const [newAchievement, setNewAchievement] = useState(null);

    // Limits
    const [hasUsedRevive, setHasUsedRevive] = useState(false); // Track if revive has been used
    const [hasUsedSkip, setHasUsedSkip] = useState(false); // Track if skip has been used
    const [hasSkippedThisGame, setHasSkippedThisGame] = useState(false); // Flag for UI/Sound

    // Animation state
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [dragonAttack, setDragonAttack] = useState(false);
    const [screenShake, setScreenShake] = useState(false);
    const [enterAnim, setEnterAnim] = useState(true);
    const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
    const [battleState, setBattleState] = useState('idle'); // idle, warriorAttack, warriorDefend, dragonAttack, dragonSpecial, dragonDie
    const [jiraiyaState, setJiraiyaState] = useState('idle'); // idle, talking, advice, scold
    const [jiraiyaMessage, setJiraiyaMessage] = useState(null);
    const [fullScreenQuote, setFullScreenQuote] = useState(null);
    // Pause Timer
    const [pauseTimeLeft, setPauseTimeLeft] = useState(20);
    const pauseTimerRef = useRef(null);

    // Gift Shower State
    const [giftShowerItems, setGiftShowerItems] = useState([]);

    // Sound
    const { soundEnabled, toggleSound, playSound, startMusic, stopMusic } = useSound();

    const [showRules, setShowRules] = useState(true);

    // Start music on mount - Blocked by showRules
    useEffect(() => {
        if (soundEnabled && !showRules) {
            startMusic();
        }
        return () => stopMusic();
    }, [soundEnabled, startMusic, stopMusic, showRules]);

    // Handle Enter key to start game
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (showRules && e.key === 'Enter') {
                setShowRules(false);
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [showRules]);

    // Prevent duplicate timeout handling
    const timeoutHandled = useRef(false);
    const startTimerRef = useRef(() => { });
    // Transition Timeout Ref to prevent state updates after restart
    const transitionTimeoutRef = useRef(null);

    // Timer logic
    const baseTime = useMemo(() => 18 + (currentLevel - 1) * 2, [currentLevel]);

    const handleTimeout = useCallback(() => {
        if (timeoutHandled.current) return;
        timeoutHandled.current = true;

        setScreenShake(true);
        setDragonAttack(true);
        playSound('wrong');

        if (hasShield) {
            setHasShield(false);
            setResultMessage('🛡️ Shield of Knowledge absorbed the attack!');
            playSound('powerup');
            setTimeout(() => {
                setDragonAttack(false);
                setScreenShake(false);
                setResultMessage('');
                setSelectedAnswer(null);
                setAnswerResult(null);
                setShowHint(false);
                startTimerRef.current(baseTime);
                timeoutHandled.current = false;
            }, 2000);
            return;
        }

        // Timer to zero is now an immediate Game Over
        setLives(0);
        setBattleState('dragonSpecial');
        setResultMessage('⏳ TIMES UP! The dragon caught you!');

        setTimeout(() => {
            setBattleState('warriorDie');
            setTimeout(() => {
                playSound('gameOver');
                setGameStatus('gameOver');
            }, 1500);
        }, 2000);
    }, [playSound, hasShield, baseTime]);

    const { timeLeft, startTimer, stopTimer, addTime, subtractTime } = useTimer(baseTime, handleTimeout, isPaused);

    useEffect(() => {
        startTimerRef.current = startTimer;
    }, [startTimer]);

    // Current question & room
    const currentQuestion = levelQuestions[currentQuestionIndex % levelQuestions.length] || levelQuestions[0];
    const currentRoom = rooms[currentRoomIndex % rooms.length];

    // Dynamically compute background color/gradient
    const bgStyle = useMemo(() => {
        if (!currentRoom) return { background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' };
        return { background: `linear-gradient(135deg, ${currentRoom.gradient[0]} 0%, ${currentRoom.gradient[1]} 100%)` };
    }, [currentRoom]);

    // Check achievements
    const checkAchievements = useCallback((totalCorrect) => {
        achievementDefinitions.forEach(ach => {
            if (totalCorrect >= ach.threshold) {
                setUnlockedAchievements(prev => {
                    if (!prev.includes(ach.id)) {
                        setNewAchievement(ach);
                        setTimeout(() => setNewAchievement(null), 3000);
                        return [...prev, ach.id];
                    }
                    return prev;
                });
            }
        });
    }, []);

    // Initialize
    useEffect(() => {
        if (levelQuestions.length > 0 && !showRules) {
            startTimer(baseTime);
            timeoutHandled.current = false;
        }
        setTimeout(() => setEnterAnim(false), 600);
    }, [levelQuestions.length, startTimer, baseTime, showRules]);

    // Helper to proceed to next question safely
    const proceedToQuestion = useCallback((nextIndex) => {
        setCurrentQuestionIndex(nextIndex);
        setSelectedAnswer(null);
        setAnswerResult(null);
        setResultMessage('');
        setShowHint(false);
        setIsTransitioning(false);
        const newLevel = Math.floor(nextIndex / 5) + 1;
        const newTime = 18 + (newLevel - 1) * 2;
        startTimerRef.current(newTime);
        timeoutHandled.current = false;
    }, []);

    // Gift Modal State
    const [giftModalOpen, setGiftModalOpen] = useState(false);
    const [pendingGift, setPendingGift] = useState(null);
    const [isGiftOpen, setIsGiftOpen] = useState(false); // Controls animation state

    // Handle answer selection
    const handleSelectAnswer = useCallback((option) => {
        if (selectedAnswer || isPaused || gameStatus !== 'playing') return;

        stopTimer();
        setSelectedAnswer(option);

        const correct = option.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim();

        if (correct) {
            setAnswerResult('correct');
            playSound('correct');

            // Battle Animation: Defend then Attack
            setBattleState('warriorDefend');
            setTimeout(() => {
                setBattleState('warriorAttack');
                setTimeout(() => setBattleState('idle'), 900);
            }, 400);

            // Critical hit check
            const resolvedMaxTime = baseTime;
            const isCrit = timeLeft >= (resolvedMaxTime - 4);
            if (isCrit) {
                setIsCritical(true);
                setTimeout(() => setIsCritical(false), 1500);
            }

            const points = timeLeft * 10 * currentLevel * (isCrit ? 2 : 1);
            setScore(prev => prev + points);
            setResultMessage(isCrit ? `🔥 CRITICAL HIT! +${points} points!` : `✨ +${points} points!`);

            const newStreak = consecutiveCorrect + 1;
            setConsecutiveCorrect(newStreak);

            // Grant shield on 3-streak
            if (newStreak > 0 && newStreak % 3 === 0 && !hasShield) {
                setHasShield(true);
                setJiraiyaState('advice');
                setJiraiyaMessage("You have earned the Shield of Knowledge!");
                setTimeout(() => {
                    setJiraiyaMessage(null);
                    setJiraiyaState('idle');
                }, 3000);
            }

            // Grant Skip Power-up on 5-streak (Max 1)
            // Logic: Award SKIP ONLY if they don't have one and haven't used one yet (one per game).
            if (newStreak > 0 && newStreak % 5 === 0) {
                if (!powerUps.includes('skipQuestion') && !hasSkippedThisGame) {
                    setPowerUps(prev => [...prev, 'skipQuestion']);
                    setJiraiyaState('advice');
                    setJiraiyaMessage("Outstanding! You have earned a ONE-TIME Skip!");
                    playSound('powerup');
                    setTimeout(() => {
                        setJiraiyaMessage(null);
                        setJiraiyaState('idle');
                    }, 3000);
                }
            }

            // Grant Key on 4-streak (Max 1)
            // Logic: Award a key ONLY if they don't have one and haven't used one yet (one per game).
            if (newStreak > 0 && newStreak % 4 === 0) {
                if (keysCount < 1 && !hasUsedRevive) {
                    setKeysCount(1);
                    if (newStreak % 5 !== 0) {
                        setJiraiyaState('advice');
                        setJiraiyaMessage("Incredible! You earned a Magic Key 🔑 (Single Use)");
                        playSound('powerup');
                        setTimeout(() => {
                            setJiraiyaMessage(null);
                            setJiraiyaState('idle');
                        }, 3000);
                    }
                }
            }

            const totalCorrect = currentQuestionIndex + 1;
            checkAchievements(totalCorrect);

            // Power-up chance
            if (Math.random() < 0.2) {
                const powerUp = 'freeHint';
                setPowerUps(prev => [...prev, powerUp]);
                playSound('powerup');
            }

            // Check for motivational quote
            const showQuote = newStreak > 0 && newStreak % 3 === 0;
            const transitionDelay = showQuote ? 5000 : 1200;

            if (showQuote) {
                const quotes = getMotivationalQuotes(userName);
                const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

                // Trigger full screen quote overlay
                setFullScreenQuote(randomQuote);
                setJiraiyaState('talking');

                setTimeout(() => {
                    setFullScreenQuote(null);
                    setJiraiyaState('idle');
                }, 4000);
            }

            // Move to next question after delay
            setTimeout(() => {
                setIsTransitioning(true);
                transitionTimeoutRef.current = setTimeout(() => {
                    const nextIndex = currentQuestionIndex + 1;

                    if (nextIndex >= 35) {
                        checkAchievements(35);
                        playSound('levelUp');
                        setBattleState('dragonDie');
                        setTimeout(() => setGameStatus('victory'), 2000);
                        return;
                    }

                    if (nextIndex % 5 === 0 && nextIndex < 35) {
                        const newLevel = Math.floor(nextIndex / 5) + 1;
                        setCurrentLevel(newLevel);

                        playSound('levelUp');

                        // Gift Logic
                        const giftIndex = newLevel - 2;
                        if (giftIndex >= 0 && giftIndex < PRINCESS_GIFTS.length) {
                            const gift = PRINCESS_GIFTS[giftIndex];
                            setPendingGift(gift);
                            setGiftModalOpen(true);
                            setIsPaused(true);
                            return;
                        }
                        setCurrentRoomIndex(prev => prev + 1);
                    }

                    proceedToQuestion(nextIndex);
                }, 400);
            }, transitionDelay);
        } else {
            setAnswerResult('wrong');
            playSound('wrong');
            setScreenShake(true);
            setDragonAttack(true);

            setBattleState('dragonAttack');
            setTimeout(() => setBattleState('idle'), 800);

            setConsecutiveCorrect(0);
            setResultMessage('❌ Wrong! The dragon attacks!');

            // Master Jiraiya Scolds/Advises
            setJiraiyaState('scold');
            const randomAdvice = ADVICE_MESSAGES[Math.floor(Math.random() * ADVICE_MESSAGES.length)];
            setJiraiyaMessage(randomAdvice);
            setTimeout(() => {
                setJiraiyaMessage(null);
                setJiraiyaState('idle');
            }, 3500);

            setLives(prev => {
                if (hasShield) {
                    setHasShield(false);
                    setResultMessage('🛡️ Shield of Knowledge absorbed the attack!');
                    setTimeout(() => {
                        setDragonAttack(false);
                        setScreenShake(false);
                        setSelectedAnswer(null);
                        setAnswerResult(null);
                        setResultMessage('');
                        setShowHint(false);
                        startTimerRef.current(baseTime);
                        timeoutHandled.current = false;
                    }, 2000);
                    return prev;
                }

                const newLives = prev - 1;
                if (newLives <= 0) {
                    setBattleState('dragonSpecial');
                    setTimeout(() => {
                        setBattleState('warriorDie');
                        setTimeout(() => {
                            playSound('gameOver');
                            setGameStatus('gameOver');
                        }, 1500);
                    }, 2000);
                } else {
                    setTimeout(() => {
                        setDragonAttack(false);
                        setScreenShake(false);
                        setSelectedAnswer(null);
                        setAnswerResult(null);
                        setResultMessage('');
                        setShowHint(false);
                        startTimerRef.current(baseTime);
                        timeoutHandled.current = false;
                    }, 2000);
                }
                return newLives;
            });
        }
    }, [selectedAnswer, isPaused, gameStatus, currentQuestion, timeLeft, currentLevel, currentQuestionIndex, playSound, checkAchievements, startTimer, stopTimer, baseTime, consecutiveCorrect, userName, hasShield, showRules, proceedToQuestion, keysCount, hasUsedRevive, hasSkippedThisGame, powerUps]);

    // Use hint
    const handleHint = useCallback(() => {
        if (timeLeft <= 5 || !currentQuestion || showHint) return;

        // Check if we have free hint powerup
        const freeHintIdx = powerUps.indexOf('freeHint');
        const hasFreeHint = freeHintIdx !== -1;

        if (!hasFreeHint) {
            subtractTime(5);
        } else {
            // Remove one free hint
            setPowerUps(prev => {
                const newUps = [...prev];
                newUps.splice(freeHintIdx, 1);
                return newUps;
            });
        }

        playSound('hint');
        const hint = currentQuestion.hint || `The answer starts with '${currentQuestion.answer.charAt(0)}'`;

        // Master Jiraiya gives the hint
        setJiraiyaState('advice');
        setJiraiyaMessage(`Listen closely... ${hint}`);
        setTimeout(() => {
            setJiraiyaMessage(null);
            setJiraiyaState('idle');
        }, 6000);
    }, [timeLeft, currentQuestion, showHint, subtractTime, playSound, powerUps]);

    // Use power-up - REFACTORED to exclude extraTime
    const handleUsePowerUp = useCallback((index) => {
        const pu = powerUps[index];
    }, [powerUps]);

    // Handle Open Gift
    const handleOpenGift = useCallback(() => {
        setIsGiftOpen(true);
        playSound('powerup');
        try {
            const confetti = (window.confetti || (() => { }));
            confetti({
                particleCount: 100, // Reduced from 150 for perf
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FF4500', '#FFFFFF'],
                shapes: ['star', 'circle'],
                scalar: 1.2
            });
        } catch (e) {
            console.error("Confetti error", e);
        }
    }, [playSound]);

    // Collect Gift and Continue
    const handleCollectGift = useCallback(() => {
        if (pendingGift) {
            setCollectedGifts(prev => [...prev, pendingGift]);

            // Trigger Gift Shower - REDUCED COUNT FOR LAG FIX
            const newItems = Array.from({ length: 15 }).map((_, i) => ({ // Reduced from 30
                id: Date.now() + i,
                emoji: pendingGift.emoji,
                left: Math.random() * 100, // 0-100vw
                duration: 2 + Math.random() * 2, // 2-4s (Faster)
                delay: Math.random() * 0.3
            }));
            setGiftShowerItems(newItems);

            // Clear shower after 4s
            setTimeout(() => setGiftShowerItems([]), 4000);

            setJiraiyaState('advice');
            setJiraiyaMessage(`You found a ${pendingGift.name}! The Princess will be pleased.`);
            setTimeout(() => {
                setJiraiyaMessage(null);
                setJiraiyaState('idle');
            }, 4000);
        }

        setGiftModalOpen(false);
        setPendingGift(null);
        setIsGiftOpen(false);
        setIsPaused(false);

        setCurrentRoomIndex(prev => prev + 1);

        // PROCEED TO NEXT QUESTION
        const nextIndex = currentQuestionIndex + 1;
        proceedToQuestion(nextIndex);

    }, [pendingGift, currentQuestionIndex, proceedToQuestion]);

    // Revive with key - REVISED & RESTRICTED
    const handleRevive = useCallback(() => {
        if (keysCount <= 0 || hasUsedRevive) {
            return;
        }

        setKeysCount(prev => prev - 1);
        setHasUsedRevive(true); // Mark as used
        setLives(3);
        setBattleState('idle');
        setGameStatus('playing');
        setDragonAttack(false);
        setScreenShake(false);
        setSelectedAnswer(null);
        setAnswerResult(null);
        setResultMessage('🔑 Revived with Magic Key!');

        // Important: Reset timer
        startTimerRef.current(baseTime);
        timeoutHandled.current = false;
        playSound('powerup');

        // Force resume if paused
        setIsPaused(false);

    }, [keysCount, baseTime, playSound, hasUsedRevive]);

    // Pause Timer Logic
    useEffect(() => {
        if (isPaused && !giftModalOpen) {
            pauseTimerRef.current = setInterval(() => {
                setPauseTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(pauseTimerRef.current);
                        setIsPaused(false);
                        return 20;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (pauseTimerRef.current) clearInterval(pauseTimerRef.current);
            if (!giftModalOpen) setPauseTimeLeft(20);
        }
        return () => {
            if (pauseTimerRef.current) clearInterval(pauseTimerRef.current);
        };
    }, [isPaused, giftModalOpen]);

    // Pause toggle
    const handleTogglePause = useCallback(() => {
        if (giftModalOpen) return;
        setIsPaused(prev => !prev);
    }, [giftModalOpen]);

    // Skip Question Handler
    const handleSkipQuestion = useCallback(() => {
        if (!powerUps.includes('skipQuestion')) return;
        if (hasSkippedThisGame) return; // Strict Limit

        const idx = powerUps.indexOf('skipQuestion');
        const newUps = [...powerUps];
        newUps.splice(idx, 1);
        setPowerUps(newUps);

        setHasSkippedThisGame(true); // Mark skip as used

        playSound('powerup');
        setJiraiyaState('advice');
        setJiraiyaMessage("Strategically skipped! Remember, only ONE skip per game! 🐸");
        setTimeout(() => {
            setJiraiyaMessage(null);
            setJiraiyaState('idle');
        }, 3000);

        setIsTransitioning(true);
        transitionTimeoutRef.current = setTimeout(() => {
            const nextIndex = currentQuestionIndex + 1;

            if (nextIndex >= 35) {
                checkAchievements(35);
                playSound('levelUp');
                setBattleState('dragonDie');
                setTimeout(() => setGameStatus('victory'), 2000);
                return;
            }

            if (nextIndex % 5 === 0 && nextIndex < 35) {
                const newLevel = Math.floor(nextIndex / 5) + 1;
                setCurrentLevel(newLevel);
                playSound('levelUp');

                // Gift Logic
                const giftIndex = newLevel - 2;
                if (giftIndex >= 0 && giftIndex < PRINCESS_GIFTS.length) {
                    const gift = PRINCESS_GIFTS[giftIndex];
                    setPendingGift(gift);
                    setGiftModalOpen(true);
                    setIsPaused(true);
                    return;
                }
                setCurrentRoomIndex(prev => prev + 1);
            }

            proceedToQuestion(nextIndex);
        }, 400);

    }, [powerUps, currentQuestionIndex, checkAchievements, playSound, proceedToQuestion, hasSkippedThisGame]);

    // Restart game
    const handleRestart = useCallback(() => {
        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }
        if (pauseTimerRef.current) {
            clearInterval(pauseTimerRef.current);
        }

        setPauseTimeLeft(20);
        setCurrentLevel(1);
        setCurrentQuestionIndex(0);
        setScore(0);
        setLives(3);
        setConsecutiveCorrect(0);
        setBattleState('idle');
        setCurrentRoomIndex(0);
        setIsPaused(false);
        setGameStatus('playing');
        setSelectedAnswer(null);
        setAnswerResult(null);
        setResultMessage('');
        setShowHint(false);
        setPowerUps([]);
        setCollectedGifts([]);
        setHasShield(false);
        setKeysCount(0);
        setDragonAttack(false);
        setScreenShake(false);
        setIsTransitioning(false);
        setShowRules(true);
        setHasUsedRevive(false);
        setHasSkippedThisGame(false); // Reset Skip usage

        timeoutHandled.current = false;

        const questions = generateQuestions();
        setLevelQuestions(questions);

        stopMusic();

        // Re-enter fullscreen on restart
        if (enterFullscreen) {
            setTimeout(() => enterFullscreen(), 100);
        }

    }, [stopMusic, enterFullscreen]);

    const progress = (currentQuestionIndex / 35) * 100;

    return (
        <div
            className={`game-screen ${screenShake ? 'screen-shake' : ''} ${enterAnim ? 'game-enter' : ''}`}
            style={bgStyle}
        >
            <div className="game-ambient">
                <div className="ambient-orb orb-1" />
                <div className="ambient-orb orb-2" />
                <div className="ambient-orb orb-3" />
            </div>

            {/* Gift Shower Canvas/Overlay */}
            <div className="gift-shower-overlay">
                {giftShowerItems.map(item => (
                    <div
                        key={item.id}
                        className="falling-gift"
                        style={{
                            left: `${item.left}%`,
                            animationDuration: `${item.duration}s`,
                            animationDelay: `${item.delay}s`
                        }}
                    >
                        {item.emoji}
                    </div>
                ))}
            </div>

            <div className="game-progress-bar">
                <div className="game-progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <HUD
                level={currentLevel}
                score={score}
                lives={lives}
                room={currentRoom}
                timeLeft={timeLeft}
                maxTime={baseTime}
                isPaused={isPaused}
                pauseTimeLeft={pauseTimeLeft}
                soundEnabled={soundEnabled}
                powerUps={powerUps}
                hasShield={hasShield}
                keysCount={keysCount}
                warningCount={warningCount}
                onTogglePause={handleTogglePause}
                onToggleSound={toggleSound}
                onShowAchievements={() => setShowAchievements(true)}
                onUsePowerUp={handleUsePowerUp}
                onSkip={handleSkipQuestion}
            />

            <div className="battle-arena">
                <div className={`fighter warrior ${battleState === 'warriorAttack' ? 'attacking' : ''} ${battleState === 'warriorDefend' ? 'defending' : ''} ${battleState === 'dragonAttack' || battleState === 'dragonSpecial' ? 'hit' : ''} ${battleState === 'warriorDie' ? 'dying' : ''}`}>
                    {hasShield && <div className="warrior-shield-aura"></div>}
                    <div className="fighter-main">
                        <span className="weapon shield">🛡️</span>
                        <span className="hero-face">🦸‍♂️</span>
                        <span className="weapon sword">⚔️</span>
                    </div>
                    <div className="fighter-label">{userName || 'Warrior'}</div>
                    {isCritical && <div className="critical-label">CRITICAL!</div>}
                </div>

                <div className={`fighter dragon ${battleState === 'dragonAttack' ? 'attacking' : ''} ${battleState === 'dragonSpecial' ? 'special-attacking' : ''} ${battleState === 'warriorAttack' ? 'hit' : ''} ${battleState === 'dragonDie' ? 'dying' : ''}`}>
                    <div className="fighter-emoji">🐉 🔥</div>
                    <div className="fighter-label">Nagshakthi</div>
                </div>

                {battleState === 'warriorAttack' && <div className="effect sword-projectile">⚔️</div>}
                {battleState === 'warriorAttack' && <div className="effect slash-trail"></div>}
                {battleState === 'warriorAttack' && <div className="effect impact-sparks">💥</div>}
                {battleState === 'warriorDefend' && <div className="effect shield-effect">🛡️</div>}
                {battleState === 'dragonAttack' && <div className="effect fire-breath">🔥🔥🔥</div>}
                {battleState === 'dragonSpecial' && (
                    <div className="effect special-attack-sequence">
                        <div className="charge-aura"></div>
                        <div className="mega-beam"></div>
                        <div className="impact-explosion">💀</div>
                    </div>
                )}
            </div>

            {/* Master Jiraiya Helper - UPDATED WITH SAGE TOKEN */}
            <div className={`master-jiraiya-container ${jiraiyaState !== 'idle' ? 'active' : ''}`} onClick={handleHint}>
                <div className={`jiraiya-bubble ${jiraiyaMessage ? 'visible' : ''}`}>
                    {jiraiyaMessage || "Tap me for a hint!"}
                </div>
                <div className={`jiraiya-image ${jiraiyaState}`}>
                    <span className="sage-icon">🧙‍♂️</span>
                    <span className="toad-icon">🐸</span>
                </div>
            </div>

            <div className="game-central">
                {currentQuestion && !showRules && (
                    <QuestionCard
                        question={currentQuestion}
                        selectedAnswer={selectedAnswer}
                        answerResult={answerResult}
                        onSelectAnswer={handleSelectAnswer}
                        isPaused={isPaused}
                        isTransitioning={isTransitioning}
                        showHint={showHint}
                        hintText={hintText}
                        onHint={handleHint}
                        resultMessage={resultMessage}
                        questionNumber={currentQuestionIndex + 1}
                        totalQuestions={35}
                        room={currentRoom}
                    />
                )}
            </div>

            {/* Rules Overlay - UPDATED WITH SAGE */}
            {showRules && (
                <div className="rules-overlay">
                    <div className="rules-content">
                        <h2>📜 The Legend of the 7 Kingdoms</h2>
                        <div className="rules-sage">
                            <span className="sage-emoji-combo">🧙‍♂️🐸</span>
                            <div className="sage-text">
                                <p>Greetings, warrior! I am <strong>Master Jiraiya</strong> (The Toad Sage).</p>
                                <p>The evil dragon <strong>Nagshakthi</strong> has kidnapped the Princess!</p>
                                <p>You must answer <span className="highlight">35 Questions</span> correctly to defeat him.</p>
                            </div>
                        </div>

                        <div className="rules-list">
                            <div className="rule-item">⏱️ <strong>Time is life!</strong> Answer quickly to deal CRITICAL damage.</div>
                            <div className="rule-item">🔑 <strong>ONE Magic Key</strong> can be earned to Revive ONCE per game!</div>
                            <div className="rule-item">⏭️ <strong>ONE Skip</strong> can be earned. Use it wisely!</div>
                            <div className="rule-item">🛡️ <strong>Shield of Knowledge</strong> protects you after 3 correct answers.</div>
                            <div className="rule-item">💡 <strong>Tap Me</strong> (Sage & Toad) for hints!</div>
                        </div>

                        <button className="start-btn" onClick={() => setShowRules(false)}>
                            Enter the Arena (Press Enter) ⚔️
                        </button>
                    </div>
                </div>
            )}

            <div className="game-footer">
                {resultMessage && <div className="result-message">{resultMessage}</div>}
            </div>

            {giftModalOpen && pendingGift && (
                <div className="gift-modal-overlay">
                    <div className={`gift-modal-content ${isGiftOpen ? 'open' : ''}`}>
                        <h2>Level Up!</h2>
                        <div className="gift-box-container" onClick={!isGiftOpen ? handleOpenGift : undefined}>
                            <div className={`gift-box ${isGiftOpen ? 'open' : ''}`}>
                                <div className="gift-lid"></div>
                                <div className="gift-body"></div>
                            </div>
                            {isGiftOpen && (
                                <div className="gift-reveal">
                                    <div className="gift-emoji">{pendingGift.emoji}</div>
                                    <div className="gift-name">{pendingGift.name}</div>
                                    <div className="gift-sparkles">✨</div>
                                </div>
                            )}
                        </div>
                        {!isGiftOpen ? (
                            <p className="gift-instruction">Tap the box to open!</p>
                        ) : (
                            <button className="collect-btn" onClick={handleCollectGift}>
                                Collect & Continue
                            </button>
                        )}
                    </div>
                </div>
            )}

            {showAchievements && (
                <AchievementsModal
                    unlocked={unlockedAchievements}
                    onClose={() => setShowAchievements(false)}
                />
            )}

            {newAchievement && (
                <div className="achievement-popup">
                    <div className="ach-icon">{newAchievement.icon}</div>
                    <div className="ach-info">
                        <div className="ach-title">Achievement Unlocked!</div>
                        <div className="ach-name">{newAchievement.title}</div>
                    </div>
                </div>
            )}

            {gameStatus === 'gameOver' && (
                <GameOverOverlay
                    score={score}
                    level={currentLevel}
                    questionsAnswered={currentQuestionIndex}
                    keysCount={keysCount}
                    gifts={collectedGifts}
                    onRevive={handleRevive}
                    onRestart={handleRestart}
                />
            )}

            {gameStatus === 'victory' && (
                <VictoryOverlay
                    score={score}
                    onRestart={handleRestart}
                    gifts={collectedGifts}
                />
            )}
        </div>
    );
}
