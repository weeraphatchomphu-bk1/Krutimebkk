import React, { useState, useEffect } from 'react';
import { GameScreen as ScreenType, StudentInfo, MissionResult } from './types';
import { soundManager } from './utils/audio';
import { saveCurrentStudent, getCurrentStudent } from './utils/storage';
import { Navbar } from './components/Navbar';
import { StartScreen } from './components/StartScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { HowToPlayScreen } from './components/HowToPlayScreen';
import { AboutScreen } from './components/AboutScreen';
import { TeacherScreen } from './components/TeacherScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('start');
  const [student, setStudent] = useState<StudentInfo | null>(() => getCurrentStudent());
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => soundManager.isEnabled());

  // Game session results
  const [gameResults, setGameResults] = useState<MissionResult[]>([]);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    soundManager.setSoundEnabled(nextState);
    setSoundEnabled(nextState);
    soundManager.playClick();
  };

  const handleStartGameWithStudent = (studentData: StudentInfo) => {
    setStudent(studentData);
    saveCurrentStudent(studentData);
    setCurrentScreen('playing');
  };

  const handleFinishGame = (results: MissionResult[], score: number, duration: number) => {
    setGameResults(results);
    setTotalScore(score);
    setDurationSeconds(duration);
    setCurrentScreen('result');
  };

  const handlePlayAgain = () => {
    setCurrentScreen('playing');
  };

  return (
    <div className="min-h-screen bg-amber-50 text-slate-800 flex flex-col font-['Mali',sans-serif]">
      {/* Navbar header */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        student={student}
        score={totalScore}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentScreen === 'start' && (
          <StartScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'register' && (
          <RegisterScreen 
            onStartGame={handleStartGameWithStudent} 
            onNavigate={setCurrentScreen}
            initialStudent={student}
          />
        )}

        {currentScreen === 'playing' && student && (
          <GameScreen 
            student={student} 
            onFinishGame={handleFinishGame} 
          />
        )}

        {currentScreen === 'result' && student && (
          <ResultScreen
            student={student}
            results={gameResults}
            totalScore={totalScore}
            durationSeconds={durationSeconds}
            onNavigate={setCurrentScreen}
            onPlayAgain={handlePlayAgain}
          />
        )}

        {currentScreen === 'leaderboard' && (
          <LeaderboardScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'how_to_play' && (
          <HowToPlayScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'about' && (
          <AboutScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'teacher' && (
          <TeacherScreen onNavigate={setCurrentScreen} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-amber-100 border-t-2 border-amber-300 py-3 text-center text-xs text-amber-900 font-bold">
        <span>🔎 นักสืบจับใจความ By Kru’ Time • วิชาภาษาไทย ป.3</span>
      </footer>
    </div>
  );
}
