import React from 'react';
import { GameScreen, StudentInfo } from '../types';
import { soundManager } from '../utils/audio';
import { Volume2, VolumeX, Home, Trophy, UserCheck, GraduationCap } from 'lucide-react';

interface Props {
  currentScreen: GameScreen;
  onNavigate: (screen: GameScreen) => void;
  student: StudentInfo | null;
  score: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentScreen,
  onNavigate,
  student,
  score,
  soundEnabled,
  onToggleSound
}) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 border-b-4 border-amber-500 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
        
        {/* Logo & Main Title */}
        <button 
          onClick={() => {
            soundManager.playClick();
            onNavigate('start');
          }}
          className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md border-2 border-amber-200 group-hover:scale-105 transition-transform">
            <span className="text-xl sm:text-2xl animate-float">🔎</span>
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-extrabold text-amber-950 leading-tight drop-shadow-xs flex items-center gap-1.5">
              นักสืบจับใจความ
              <span className="text-xs sm:text-sm font-semibold bg-amber-900 text-amber-100 px-2 py-0.5 rounded-full">
                By Kru’ Time
              </span>
            </h1>
            <p className="text-[11px] sm:text-xs text-amber-800 font-medium hidden sm:block">
              วิชาภาษาไทย ชั้นประถมศึกษาปีที่ 3
            </p>
          </div>
        </button>

        {/* Center / Right controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Active Student Info Badge (if playing or registered) */}
          {student && (
            <div className="hidden md:flex items-center gap-2 bg-amber-100/90 border-2 border-amber-400 px-3 py-1 rounded-2xl text-xs font-bold text-amber-900 shadow-xs">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>{student.name} ({student.gradeClass})</span>
              <span className="bg-amber-500 text-white px-2 py-0.5 rounded-full text-xs">
                {score} คะแนน
              </span>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'ปิดเสียง' : 'เปิดเสียง'}
            className={`p-2 rounded-2xl border-2 font-bold transition-transform active:scale-95 cursor-pointer ${
              soundEnabled 
                ? 'bg-amber-100 border-amber-400 text-amber-800 hover:bg-amber-200' 
                : 'bg-rose-100 border-rose-300 text-rose-600 hover:bg-rose-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" /> : <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* Leaderboard Button */}
          {currentScreen !== 'leaderboard' && (
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('leaderboard');
              }}
              className="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-400 px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">คลังเกียรติยศ</span>
            </button>
          )}

          {/* Teacher Mode Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('teacher');
            }}
            title="ระบบครูผู้สอน"
            className="flex items-center gap-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border-2 border-indigo-300 px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span className="hidden lg:inline">สำหรับครู</span>
          </button>

          {/* Home Button */}
          {currentScreen !== 'start' && (
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('start');
              }}
              className="p-2 bg-amber-800 hover:bg-amber-900 text-white rounded-2xl border-2 border-amber-950 font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
              title="กลับหน้าหลัก"
            >
              <Home className="w-5 h-5" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
