import React, { useState } from 'react';
import { GameScreen, StudentInfo } from '../types';
import { soundManager } from '../utils/audio';
import { UserCheck, Sparkles, ArrowLeft, Rocket } from 'lucide-react';

interface Props {
  onStartGame: (student: StudentInfo) => void;
  onNavigate: (screen: GameScreen) => void;
  initialStudent?: StudentInfo | null;
}

const AVATARS = [
  { id: 'boy_detective', emoji: '🕵️‍♂️', label: 'นักสืบชาย' },
  { id: 'girl_detective', emoji: '🕵️‍♀️', label: 'นักสืบหญิง' },
  { id: 'cat_detective', emoji: '😺', label: 'นักสืบแมว' },
  { id: 'bear_detective', emoji: '🐻', label: 'นักสืบหมี' },
];

export const RegisterScreen: React.FC<Props> = ({ onStartGame, onNavigate, initialStudent }) => {
  const [name, setName] = useState(initialStudent?.name || '');
  const [surname, setSurname] = useState(initialStudent?.surname || '');
  const [gradeClass, setGradeClass] = useState<'ป.3/1' | 'ป.3/2'>(initialStudent?.gradeClass || 'ป.3/1');
  const [studentNo, setStudentNo] = useState(initialStudent?.studentNo || '');
  const [avatarId, setAvatarId] = useState(initialStudent?.avatarId || 'boy_detective');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('กรุณากรอกชื่อนักเรียนค่ะ');
      return;
    }
    if (!surname.trim()) {
      setErrorMsg('กรุณากรอกนามสกุลนักเรียนค่ะ');
      return;
    }
    if (!studentNo.trim()) {
      setErrorMsg('กรุณากรอกเลขที่นักเรียนค่ะ');
      return;
    }

    setErrorMsg('');
    soundManager.playCorrect();

    onStartGame({
      name: name.trim(),
      surname: surname.trim(),
      gradeClass,
      studentNo: studentNo.trim(),
      avatarId
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200">
      
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 relative">
        
        {/* Back Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate('start');
          }}
          className="absolute top-4 left-4 p-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-2xl border-2 border-amber-300 transition-colors cursor-pointer"
          title="ย้อนกลับ"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="text-center mb-6 pt-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-400 rounded-2xl border-3 border-amber-600 mb-2 shadow-md">
            <UserCheck className="w-8 h-8 text-amber-950" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
            👩‍🎓 ลงทะเบียนนักสืบ
          </h2>
          <p className="text-sm font-bold text-amber-800 mt-1">
            กรอกข้อมูลนักเรียนเพื่อเริ่มภารกิจจับใจความ
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-100 border-2 border-rose-400 text-rose-800 rounded-2xl text-sm font-bold text-center animate-shake">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-bold text-amber-900 uppercase mb-2">
              เลือกตัวละครนักสืบของคุณ
            </label>
            <div className="grid grid-cols-4 gap-2">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av.id}
                  onClick={() => {
                    soundManager.playClick();
                    setAvatarId(av.id);
                  }}
                  className={`p-2.5 rounded-2xl border-3 flex flex-col items-center justify-center transition-all cursor-pointer ${
                    avatarId === av.id
                      ? 'bg-amber-200 border-amber-500 scale-105 shadow-md'
                      : 'bg-amber-50 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <span className="text-3xl mb-1">{av.emoji}</span>
                  <span className="text-[11px] font-bold text-amber-900 truncate w-full text-center">
                    {av.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Name & Surname inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-amber-950 mb-1">
                ชื่อ <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="เช่น มะลิ"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-amber-50/80 border-2 border-amber-300 rounded-2xl font-bold text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-amber-950 mb-1">
                นามสกุล <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="เช่น ใจดี"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full px-4 py-2.5 bg-amber-50/80 border-2 border-amber-300 rounded-2xl font-bold text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                required
              />
            </div>
          </div>

          {/* Class & Student No */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-amber-950 mb-1">
                ระดับชั้น <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setGradeClass('ป.3/1');
                  }}
                  className={`py-2.5 px-3 rounded-2xl font-bold text-sm border-2 transition-all cursor-pointer ${
                    gradeClass === 'ป.3/1'
                      ? 'bg-amber-500 text-white border-amber-700 shadow-md scale-102'
                      : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                  }`}
                >
                  ป.3/1
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setGradeClass('ป.3/2');
                  }}
                  className={`py-2.5 px-3 rounded-2xl font-bold text-sm border-2 transition-all cursor-pointer ${
                    gradeClass === 'ป.3/2'
                      ? 'bg-amber-500 text-white border-amber-700 shadow-md scale-102'
                      : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                  }`}
                >
                  ป.3/2
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-amber-950 mb-1">
                เลขที่ <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="99"
                placeholder="เช่น 15"
                value={studentNo}
                onChange={(e) => setStudentNo(e.target.value)}
                className="w-full px-4 py-2.5 bg-amber-50/80 border-2 border-amber-300 rounded-2xl font-bold text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                required
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-3xl font-extrabold text-xl shadow-lg border-4 border-emerald-300 flex items-center justify-center gap-3 active:scale-98 transition-all cursor-pointer group"
            >
              <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <span>🚀 เริ่มภารกิจ</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
