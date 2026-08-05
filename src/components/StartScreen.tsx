import React from 'react';
import { GameScreen } from '../types';
import { soundManager } from '../utils/audio';
import { Play, Trophy, BookOpen, Info, Search, Sparkles, GraduationCap } from 'lucide-react';

interface Props {
  onNavigate: (screen: GameScreen) => void;
}

export const StartScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200">
      
      {/* Background Decorative Animated Floating Elements */}
      <div className="absolute top-10 left-10 text-amber-300 opacity-60 animate-float pointer-events-none">
        <Search className="w-16 h-16" />
      </div>
      <div className="absolute top-20 right-12 text-yellow-400 opacity-60 animate-float-reverse pointer-events-none">
        <Sparkles className="w-14 h-14" />
      </div>
      <div className="absolute bottom-16 left-16 text-emerald-400 opacity-50 animate-float pointer-events-none">
        <BookOpen className="w-16 h-16" />
      </div>
      <div className="absolute bottom-20 right-20 text-sky-400 opacity-50 animate-float-reverse pointer-events-none">
        <Trophy className="w-16 h-16" />
      </div>

      {/* Main Card Wrapper */}
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-amber-300 flex flex-col items-center text-center relative z-10 my-4">
        
        {/* Detective Character Illustration Header */}
        <div className="relative mb-6">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 border-4 border-amber-500 shadow-lg flex items-center justify-center relative group">
            <span className="text-6xl sm:text-7xl animate-float">🔎</span>
            <div className="absolute -bottom-2 -right-2 bg-amber-600 text-white p-2 rounded-full border-2 border-white shadow-md animate-bounce">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <div className="absolute -top-3 -left-3 bg-yellow-300 text-amber-900 font-bold text-xs px-3 py-1 rounded-full border-2 border-amber-500 shadow-xs rotate-[-12deg]">
            ป.3 ภาษาไทย
          </div>
        </div>

        {/* Title & Slogan */}
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-amber-950 tracking-wide drop-shadow-xs">
            🔎 นักสืบจับใจความ
          </h1>
          <div className="inline-block bg-amber-100 border-2 border-amber-300 px-4 py-1 rounded-full">
            <h2 className="text-lg sm:text-2xl font-bold text-amber-900">
              By Kru’ Time
            </h2>
          </div>
          <p className="text-base sm:text-xl font-bold text-emerald-700 pt-2 flex items-center justify-center gap-2">
            <span>✨</span>
            <span>“อ่านให้ดี คิดให้ไว แล้วตามหาคำตอบ!”</span>
            <span>✨</span>
          </p>
        </div>

        {/* Main Action Buttons Grid */}
        <div className="w-full max-w-md space-y-3 sm:space-y-4">
          
          {/* Start Game Button (Primary Large Action) */}
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('register');
            }}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-3xl font-extrabold text-xl sm:text-2xl shadow-lg border-4 border-emerald-300 flex items-center justify-center gap-3 active:scale-98 transition-all cursor-pointer group animate-pulse-glow"
          >
            <Play className="w-8 h-8 fill-current group-hover:scale-110 transition-transform" />
            <span>▶️ เริ่มภารกิจนักสืบ</span>
          </button>

          {/* Secondary Buttons Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('leaderboard');
              }}
              className="py-3 px-4 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-2xl font-bold text-base sm:text-lg border-3 border-amber-400 shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Trophy className="w-5 h-5 text-amber-600" />
              <span>🏆 คลังเกียรติยศ</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('how_to_play');
              }}
              className="py-3 px-4 bg-sky-100 hover:bg-sky-200 text-sky-950 rounded-2xl font-bold text-base sm:text-lg border-3 border-sky-300 shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-sky-600" />
              <span>📖 วิธีเล่น</span>
            </button>
          </div>

          {/* Secondary Buttons Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('about');
              }}
              className="py-3 px-4 bg-purple-100 hover:bg-purple-200 text-purple-950 rounded-2xl font-bold text-base border-3 border-purple-300 shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Info className="w-5 h-5 text-purple-600" />
              <span>ℹ️ เกี่ยวกับเกม</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('teacher');
              }}
              className="py-3 px-4 bg-indigo-100 hover:bg-indigo-200 text-indigo-950 rounded-2xl font-bold text-base border-3 border-indigo-300 shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span>👨‍🏫 สำหรับคุณครู</span>
            </button>
          </div>

        </div>

        {/* Footer info tag */}
        <div className="mt-8 text-xs text-amber-800 font-semibold bg-amber-100/80 px-4 py-1.5 rounded-full border border-amber-300">
          🎯 30 ภารกิจจับใจความ (ใคร ทำอะไร ที่ไหน เมื่อไหร่ อย่างไร สรุปความรู้)
        </div>

      </div>
    </div>
  );
};
