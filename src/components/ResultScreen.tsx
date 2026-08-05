import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { GameRecord, GameScreen, StudentInfo, MissionResult } from '../types';
import { soundManager } from '../utils/audio';
import { saveRecord } from '../utils/storage';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  Sparkles, 
  Award, 
  CheckCircle, 
  XCircle, 
  Percent, 
  FileSpreadsheet, 
  Share2, 
  Clock,
  BarChart3
} from 'lucide-react';

interface Props {
  student: StudentInfo;
  results: MissionResult[];
  totalScore: number;
  durationSeconds: number;
  onNavigate: (screen: GameScreen) => void;
  onPlayAgain: () => void;
}

export const ResultScreen: React.FC<Props> = ({
  student,
  results,
  totalScore,
  durationSeconds,
  onNavigate,
  onPlayAgain
}) => {
  const [recordSaved, setRecordSaved] = useState(false);
  const [sheetsSynced, setSheetsSynced] = useState(false);

  const totalQuestions = results.length || 30;
  const correctCount = results.filter(r => r.isCorrect).length;
  const wrongCount = totalQuestions - correctCount;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Determine Badge Title & Tier
  let badgeTitle = '📚 “ไม่เป็นไร ลองอ่านเรื่องอย่างละเอียดอีกครั้งนะ”';
  let badgeType: 'gold' | 'silver' | 'bronze' | 'participant' = 'participant';
  let badgeEmoji = '🥉';

  if (totalScore >= 250) {
    badgeTitle = '🏆 “สุดยอดนักสืบจับใจความ!”';
    badgeType = 'gold';
    badgeEmoji = '🥇';
  } else if (totalScore >= 180) {
    badgeTitle = '🌟 “เก่งมาก! อ่านจับใจความได้ดีมาก”';
    badgeType = 'silver';
    badgeEmoji = '🥈';
  } else if (totalScore >= 100) {
    badgeTitle = '😊 “ทำได้ดี! ฝึกอ่านอีกนิดจะเก่งขึ้น”';
    badgeType = 'bronze';
    badgeEmoji = '🥉';
  }

  // Trigger Confetti effect on load & Save record
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    if (!recordSaved) {
      const record: GameRecord = {
        id: `rec-${Date.now()}`,
        student,
        score: totalScore,
        totalQuestions,
        correctCount,
        wrongCount,
        percentage,
        durationSeconds,
        completedAt: new Date().toISOString(),
        results,
        badge: badgeType,
        badgeTitle
      };
      saveRecord(record);
      setRecordSaved(true);
    }
  }, [recordSaved, student, totalScore, totalQuestions, correctCount, wrongCount, percentage, durationSeconds, results, badgeType, badgeTitle]);

  // 5W1H breakdown
  const categoryStats = ['who', 'what', 'where', 'when', 'how', 'summary'].map(cat => {
    const catResults = results.filter(r => r.category === cat);
    const catCorrect = catResults.filter(r => r.isCorrect).length;
    const catTotal = catResults.length || 5;
    const catLabelMap: Record<string, string> = {
      who: '👤 ใคร',
      what: '🎯 ทำอะไร',
      where: '📍 ที่ไหน',
      when: '🕐 เมื่อไหร่',
      how: '🛠️ อย่างไร',
      summary: '💡 สรุปความรู้'
    };
    return {
      cat,
      label: catLabelMap[cat] || cat,
      correct: catCorrect,
      total: catTotal,
      percent: Math.round((catCorrect / catTotal) * 100)
    };
  });

  const handleExportGoogleSheets = () => {
    soundManager.playClick();
    
    // Copy CSV row format suitable for pasting into Google Sheets
    const header = "วันที่,ชื่อ,นามสกุล,ชั้น,เลขที่,คะแนน (300),ตอบถูก,ตอบผิด,เปอร์เซ็นต์ (%),เวลาที่ใช้ (วินาที)";
    const dateStr = new Date().toLocaleString('th-TH');
    const row = `"${dateStr}","${student.name}","${student.surname}","${student.gradeClass}","${student.studentNo}",${totalScore},${correctCount},${wrongCount},${percentage}%,${durationSeconds}`;
    
    navigator.clipboard.writeText(`${header}\n${row}`);
    setSheetsSynced(true);
    alert('📋 คัดลอกข้อมูลคะแนนสำหรับ Google Sheets เรียบร้อยแล้วค่ะ! ท่านสามารถนำไปวาง (Paste) ใน Google Sheets ได้ทันที');
  };

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins} นาที ${remSecs} วินาที`;
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 p-4 sm:p-6 flex flex-col items-center justify-center">
      
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 relative text-center my-4 space-y-6">
        
        {/* Banner */}
        <div className="relative">
          <div className="inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-amber-950 px-6 py-2 rounded-full border-3 border-amber-600 shadow-md">
            <h1 className="text-2xl sm:text-4xl font-black flex items-center gap-2">
              <span>🎉</span>
              <span>ภารกิจสำเร็จ!</span>
              <span>🎉</span>
            </h1>
          </div>
          <p className="text-amber-800 font-bold text-sm sm:text-base pt-2">
            เกมนักสืบจับใจความ By Kru’ Time
          </p>
        </div>

        {/* Badge Banner */}
        <div className="bg-amber-100/90 border-3 border-amber-400 p-4 rounded-3xl space-y-2 shadow-xs">
          <span className="text-5xl block animate-bounce">{badgeEmoji}</span>
          <h2 className="text-xl sm:text-2xl font-black text-amber-950">
            {badgeTitle}
          </h2>
          <div className="text-xs sm:text-sm font-bold text-amber-800">
            เกียรติบัตรนักสืบจับใจความ ระดับชั้น ป.3
          </div>
        </div>

        {/* Student Profile & Main Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          
          {/* Profile Card */}
          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 space-y-1.5 text-sm font-bold text-amber-950">
            <div className="text-xs font-extrabold text-amber-700 uppercase tracking-wider pb-1 border-b border-amber-200">
              👤 ข้อมูลนักเรียน
            </div>
            <div><span className="text-amber-700">ชื่อ:</span> {student.name}</div>
            <div><span className="text-amber-700">นามสกุล:</span> {student.surname}</div>
            <div><span className="text-amber-700">ระดับชั้น:</span> {student.gradeClass}</div>
            <div><span className="text-amber-700">เลขที่:</span> {student.studentNo}</div>
          </div>

          {/* Score Summary Box */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-100 p-4 rounded-2xl border-2 border-emerald-300 flex flex-col items-center justify-center text-center space-y-1">
            <div className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
              ⭐ คะแนนรวมที่ได้
            </div>
            <div className="text-4xl sm:text-5xl font-black text-emerald-700 tracking-tight">
              {totalScore}
            </div>
            <div className="text-xs font-extrabold text-emerald-900 bg-emerald-200/80 px-3 py-1 rounded-full">
              เต็ม 300 คะแนน
            </div>
          </div>

        </div>

        {/* Detailed Statistics Grid */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-emerald-50 p-3 rounded-2xl border-2 border-emerald-300">
            <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
            <div className="text-xs font-bold text-emerald-800">ตอบถูก</div>
            <div className="text-xl font-black text-emerald-950">{correctCount} ข้อ</div>
          </div>

          <div className="bg-rose-50 p-3 rounded-2xl border-2 border-rose-300">
            <XCircle className="w-6 h-6 text-rose-500 mx-auto mb-1" />
            <div className="text-xs font-bold text-rose-800">ตอบผิด</div>
            <div className="text-xl font-black text-rose-950">{wrongCount} ข้อ</div>
          </div>

          <div className="bg-sky-50 p-3 rounded-2xl border-2 border-sky-300">
            <Percent className="w-6 h-6 text-sky-600 mx-auto mb-1" />
            <div className="text-xs font-bold text-sky-800">คิดเป็น</div>
            <div className="text-xl font-black text-sky-950">{percentage}%</div>
          </div>
        </div>

        {/* 5W1H Category Breakdown Analysis */}
        <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 text-left space-y-2">
          <div className="text-xs font-bold text-amber-900 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <BarChart3 className="w-4 h-4 text-amber-600" />
              วิเคราะห์ทักษะการจับใจความ 5W1H
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              เวลาที่ใช้: {formatDuration(durationSeconds)}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categoryStats.map((c, i) => (
              <div key={i} className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs">
                <div className="font-bold text-amber-950">{c.label}</div>
                <div className="flex items-center justify-between text-amber-800 font-bold mt-1">
                  <span>{c.correct}/{c.total} ข้อ</span>
                  <span className={c.percent >= 80 ? 'text-emerald-600 font-extrabold' : 'text-amber-700'}>
                    {c.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onPlayAgain();
              }}
              className="py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-base border-3 border-emerald-700 shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>🔄 เล่นอีกครั้ง</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('leaderboard');
              }}
              className="py-3.5 px-4 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-2xl font-black text-base border-3 border-amber-600 shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Trophy className="w-5 h-5 text-amber-800" />
              <span>🏆 ดูคลังเกียรติยศ</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleExportGoogleSheets}
              className={`py-3 px-4 rounded-2xl font-bold text-sm border-2 shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer ${
                sheetsSynced 
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-900' 
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>{sheetsSynced ? '✅ คัดลอกลง Sheets แล้ว' : '📊 บันทึกลง Google Sheets'}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('start');
              }}
              className="py-3 px-4 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-2xl font-bold text-sm border-2 border-amber-300 shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4 text-amber-700" />
              <span>🏠 กลับหน้าหลัก</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
