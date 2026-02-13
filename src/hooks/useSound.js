import { useCallback, useRef, useState } from 'react';

export function useSound() {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const audioContextRef = useRef(null);

    const getAudioContext = useCallback(() => {
        if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContextRef.current;
    }, []);

    const playSound = useCallback((type) => {
        if (!soundEnabled) return;
        try {
            const audioContext = getAudioContext();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            switch (type) {
                case 'correct':
                    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.08);
                    oscillator.frequency.exponentialRampToValueAtTime(1046.5, audioContext.currentTime + 0.15);
                    gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.2);
                    break;
                case 'wrong':
                    oscillator.type = 'sawtooth';
                    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.3);
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.4);
                    break;
                case 'levelUp':
                    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(659.25, audioContext.currentTime + 0.1);
                    oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.2);
                    oscillator.frequency.exponentialRampToValueAtTime(1046.5, audioContext.currentTime + 0.3);
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.4);
                    break;
                case 'gameOver':
                    oscillator.type = 'sawtooth';
                    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.8);
                    gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.8);
                    break;
                case 'tick':
                    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.05);
                    break;
                case 'powerup':
                    oscillator.type = 'triangle';
                    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.15);
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.2);
                    break;
                case 'hint':
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.1);
                    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.15);
                    break;
                default:
                    break;
            }
        } catch {
            // Silently fail if audio context unavailable
        }
    }, [soundEnabled, getAudioContext]);

    const musicNodesRef = useRef([]);
    const musicSchedulerRef = useRef(null);
    const musicGainRef = useRef(null);

    const toggleSound = useCallback(() => {
        setSoundEnabled(prev => !prev);
    }, []);

    const stopMusic = useCallback(() => {
        if (musicSchedulerRef.current) {
            clearTimeout(musicSchedulerRef.current);
            musicSchedulerRef.current = null;
        }
        musicNodesRef.current.forEach(node => {
            try { node.stop(); } catch { /* ignore */ }
            try { node.disconnect(); } catch { /* ignore */ }
        });
        musicNodesRef.current = [];
    }, []);

    const playNote = (ctx, freq, time, duration, vol = 0.1, type = 'triangle') => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.frequency.value = freq;
        osc.type = type;

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(vol, time + 0.05);
        gain.gain.linearRampToValueAtTime(0, time + duration - 0.05);

        osc.connect(gain);
        gain.connect(musicGainRef.current);

        osc.start(time);
        osc.stop(time + duration);

        osc.onended = () => {
            // Remove from active nodes list to prevent memory leak
            musicNodesRef.current = musicNodesRef.current.filter(n => n !== osc);
        };

        musicNodesRef.current.push(osc);
    };

    const startMusic = useCallback(() => {
        if (!soundEnabled) return;
        const ctx = getAudioContext();

        // Resume context if suspended (browser policy)
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        stopMusic();

        // Master music volume
        if (!musicGainRef.current) {
            musicGainRef.current = ctx.createGain();
            musicGainRef.current.gain.value = 0.25; // Slightly lower background
            musicGainRef.current.connect(ctx.destination);
        }

        let nextNoteTime = ctx.currentTime;
        const tempo = 130; // Faster tempo for adventure
        const secondsPerBeat = 60.0 / tempo;

        // "Epic" Adventure Theme
        // Key: C Minor (Heroic/Dramatic)
        // Structure: 8 bars loop

        const sequenceLength = 32; // 8 bars * 4 beats/bar (using 16th note resolution later if needed)
        let step = 0;

        const schedule = () => {
            // Schedule ahead
            while (nextNoteTime < ctx.currentTime + 0.5) {
                // Determine beat in bar (0-3)
                const beat = step % 4;
                const bar = Math.floor(step / 4) % 8;

                // --- DRUMS/PERCUSSION (Noise) ---
                // Kick on 1 and 3
                if (beat === 0 || beat === 2) {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.frequency.setValueAtTime(100, nextNoteTime);
                    osc.frequency.exponentialRampToValueAtTime(0.01, nextNoteTime + 0.1);
                    gain.gain.setValueAtTime(0.3, nextNoteTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, nextNoteTime + 0.1);
                    osc.connect(gain);
                    gain.connect(musicGainRef.current);
                    osc.start(nextNoteTime);
                    osc.stop(nextNoteTime + 0.1);
                    musicNodesRef.current.push(osc);
                }

                // --- BASS LINE (Cello/Low Brass) ---
                // Driving rhythmic bass
                if (beat === 0 || beat === 2.5) { // Syncopation
                    let freq = 65.41; // C2
                    if (bar === 4 || bar === 5) freq = 58.27; // Bb1
                    if (bar === 6) freq = 48.99; // G1
                    if (bar === 7) freq = 58.27; // Bb1

                    playNote(ctx, freq, nextNoteTime, secondsPerBeat * 0.8, 0.25, 'sawtooth');
                }

                // --- MELODY (Horns/Trumpets) ---
                // Simple heroic motif
                // Bar 0: C - G - C
                if (bar === 0) {
                    if (beat === 0) playNote(ctx, 261.63, nextNoteTime, secondsPerBeat * 1.5, 0.2, 'sawtooth'); // C4
                    if (beat === 2) playNote(ctx, 392.00, nextNoteTime, secondsPerBeat * 0.5, 0.2, 'sawtooth'); // G4
                    if (beat === 3) playNote(ctx, 261.63, nextNoteTime, secondsPerBeat * 0.5, 0.2, 'sawtooth'); // C4
                }
                // Bar 1: Eb - D - C
                if (bar === 1) {
                    if (beat === 0) playNote(ctx, 311.13, nextNoteTime, secondsPerBeat * 2, 0.2, 'sawtooth'); // Eb4
                    if (beat === 2) playNote(ctx, 293.66, nextNoteTime, secondsPerBeat, 0.2, 'sawtooth'); // D4
                    if (beat === 3) playNote(ctx, 261.63, nextNoteTime, secondsPerBeat, 0.2, 'sawtooth'); // C4
                }
                // Bar 2: G - F - Eb
                if (bar === 2) {
                    if (beat === 0) playNote(ctx, 392.00, nextNoteTime, secondsPerBeat * 2, 0.25, 'sawtooth'); // G4
                    if (beat === 2) playNote(ctx, 349.23, nextNoteTime, secondsPerBeat, 0.2, 'sawtooth'); // F4
                    if (beat === 3) playNote(ctx, 311.13, nextNoteTime, secondsPerBeat, 0.2, 'sawtooth'); // Eb4
                }
                // Bar 3: D (Held)
                if (bar === 3) {
                    if (beat === 0) playNote(ctx, 293.66, nextNoteTime, secondsPerBeat * 3, 0.2, 'sawtooth'); // D4
                }

                // High Arpeggios (Harp/Strings) - Constant motion
                if (step % 1 === 0) { // Every beat
                    const arpBase = bar < 4 ? 523.25 : 466.16; // C5 or Bb4
                    const offset = (step % 2) === 0 ? 0 : 1.5; // Alternating interval
                    // playNote(ctx, arpBase * (1 + offset * 0.2), nextNoteTime, 0.1, 0.05, 'triangle'); // Subtle background
                }

                nextNoteTime += secondsPerBeat;
                step = (step + 1) % sequenceLength;
            }
            musicSchedulerRef.current = setTimeout(schedule, 100);
        };

        schedule();
    }, [soundEnabled, getAudioContext, stopMusic]);

    return { soundEnabled, toggleSound, playSound, startMusic, stopMusic };
}
