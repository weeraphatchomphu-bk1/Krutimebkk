import React, { useState, useEffect } from 'react';
import { Mission, MissionResult, StudentInfo } from '../types';
import { MISSIONS } from '../data/missions';
import { soundManager } from '../utils/audio';
import { IllustrationCard } from './IllustrationCard';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  HelpCircle, 
  Send, 
  GripHorizontal, 
  RotateCcw
} from 'lucide-react';

interface Props {
  student: StudentInfo;
  onFinishGame: (results: MissionResult[], totalScore: number, durationSeconds: number) => void;
}

export const GameScreen: React.FC<Props> = ({ student, onFinishGame }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<MissionResult[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  
  // Form input states
  const [typedAnswer, setTypedAnswer] = useState('');
  const [selectedDragOption, setSelectedDragOption] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // Feedback State
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
    userAnswer: string;
    correctAnswerText: string;
    explanation: string;
  } | null>(null);

  // Timer
  const [startTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  const currentMission: Mission = MISSIONS[currentIndex];

  useEffect(() => {
    // Reset inputs when question changes
    setTypedAnswer('');
    setSelectedDragOption(null);
    setDraggedItem(null);
    setFeedback(null);
    setQuestionStartTime(Date.now());
  }, [currentIndex]);

  // Check Answer Handler
  const handleAnswerSubmit = (userAnswer: string) => {
    if (feedback?.show) return; // Prevent double submit

    const cleanUser = userAnswer.trim();
    if (!cleanUser) return;

    let isCorrect = false;
    const correctVal = currentMission.correctAnswer;

    if (Array.isArray(correctVal)) {
      // Check if user answer matches any acceptable synonym or contains key phrase
      isCorrect = correctVal.some(val => 
        cleanUser.toLowerCase().includes(val.toLowerCase()) || 
        val.toLowerCase().includes(cleanUser.toLowerCase())
      );
    } else {
      isCorrect = cleanUser.toLowerCase() === correctVal.toLowerCase();
    }

    const questionTimeTaken = Math.round((Date.now() - questionStartTime) / 1000);

    const newResult: MissionResult = {
      missionId: currentMission.id,
      category: currentMission.category,
      isCorrect,
      userAnswer: cleanUser,
      correctAnswerText: Array.isArray(correctVal) ? correctVal[0] : correctVal,
      timeTakenSeconds: questionTimeTaken
    };

    const newResults = [...results, newResult];
    setResults(newResults);

    if (isCorrect) {
      soundManager.playCorrect();
      setTimeout(() => soundManager.playScore(), 250);
      setCurrentScore(prev => prev + 10);
    } else {
      soundManager.playWrong();
    }

    setFeedback({
      show: true,
      isCorrect,
      userAnswer: cleanUser,
      correctAnswerText: Array.isArray(correctVal) ? correctVal.join(' / ') : correctVal,
      explanation: currentMission.explanation
    });
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentIndex < MISSIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Finished all 30 missions!
      const totalDuration = Math.round((Date.now() - startTime) / 1000);
      soundManager.playVictory();
      onFinishGame(results, currentScore, totalDuration);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 p-3 sm:p-6 flex flex-col items-center">
      
      <div className="w-full max-w-4xl space-y-4">
        
        {/* Top Mission Status Header */}
        <div className="bg-white/95 backdrop-blur-xs rounded-3xl p-3 sm:p-4 shadow-md border-3 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Progress Badge */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <div className="bg-amber-500 text-white font-black text-sm sm:text-base px-4 py-1.5 rounded-2xl shadow-xs flex items-center gap-1.5">
              <span>ภารกิจที่</span>
              <span className="text-xl">{currentMission.id}</span>
              <span>/ 30</span>
            </div>

            {/* Category Tag */}
            <div className="bg-amber-100 text-amber-950 border-2 border-amber-400 font-extrabold text-xs sm:text-sm px-3 py-1.5 rounded-2xl flex items-center gap-1 shadow-xs">
              <span>{currentMission.categoryLabel}</span>
            </div>
          </div>

          {/* Score Counter */}
          <div className="flex items-center gap-2">
            <div className="bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-black text-sm sm:text-base px-4 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
              <span>คะแนน:</span>
              <span className="text-xl text-emerald-700">{currentScore}</span>
              <span className="text-xs text-emerald-600">/ 300</span>
            </div>
          </div>

        </div>

        {/* Progress Bar Line */}
        <div className="w-full bg-amber-200 h-3 rounded-full overflow-hidden border border-amber-300 shadow-inner">
          <div 
            className="bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / MISSIONS.length) * 100}%` }}
          />
        </div>

        {/* Story & Question Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          
          {/* Left Column: Story & Graphic Illustration (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <IllustrationCard 
              type={currentMission.illustrationType} 
              title={currentMission.title}
              themeColor={currentMission.themeColor}
            />

            {/* Story Box */}
            <div className="bg-white/95 backdrop-blur-xs rounded-3xl p-4 sm:p-5 shadow-md border-3 border-amber-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 border-b border-amber-100 pb-2">
                <span className="text-xl">📖</span>
                <h3 className="font-extrabold text-base sm:text-lg">เรื่องสำหรับอ่าน:</h3>
              </div>
              <p className="text-amber-950 font-medium text-base sm:text-lg leading-relaxed text-justify indent-4">
                {currentMission.story}
              </p>
            </div>
          </div>

          {/* Right Column: Question & Answer Interaction (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Question Card */}
            <div className="bg-white rounded-3xl p-5 shadow-lg border-4 border-amber-400 space-y-4 relative overflow-hidden">
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                    คำถามจับใจความ ({currentMission.categoryLabel})
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-amber-950 leading-snug pt-1">
                    {currentMission.question}
                  </h2>
                </div>
              </div>

              {/* Interaction Mode: MCQ */}
              {currentMission.type === 'mcq' && (
                <div className="space-y-2.5 pt-2">
                  {currentMission.options?.map((opt, idx) => {
                    const letters = ['A', 'B', 'C', 'D'];
                    return (
                      <button
                        key={idx}
                        disabled={feedback?.show}
                        onClick={() => {
                          soundManager.playClick();
                          handleAnswerSubmit(opt);
                        }}
                        className={`w-full p-3.5 rounded-2xl font-bold text-left text-base sm:text-lg border-3 transition-all cursor-pointer flex items-center gap-3 ${
                          feedback?.show
                            ? opt === feedback.correctAnswerText
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-102 shadow-md'
                              : opt === feedback.userAnswer
                              ? 'bg-rose-100 border-rose-400 text-rose-950 opacity-80'
                              : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                            : 'bg-amber-50/80 hover:bg-amber-100 border-amber-300 text-amber-950 active:scale-98 hover:shadow-md'
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-xl font-extrabold text-sm flex items-center justify-center border-2 shrink-0 ${
                          feedback?.show && opt === feedback.correctAnswerText
                            ? 'bg-emerald-500 text-white border-emerald-700'
                            : 'bg-amber-300 text-amber-950 border-amber-400'
                        }`}>
                          {letters[idx]}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Interaction Mode: Typing */}
              {currentMission.type === 'typing' && (
                <div className="space-y-3 pt-2">
                  <div className="bg-amber-50 p-3 rounded-2xl border-2 border-amber-200 text-xs font-bold text-amber-800 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>พิมพ์คำตอบที่จับใจความได้จากเรื่องอ่านลงในช่องด้านล่างนี้</span>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAnswerSubmit(typedAnswer);
                    }}
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <input
                      type="text"
                      disabled={feedback?.show}
                      placeholder="[ พิมพ์คำตอบที่นี่... ]"
                      value={typedAnswer}
                      onChange={(e) => setTypedAnswer(e.target.value)}
                      className="flex-1 px-4 py-3 bg-amber-50/90 border-3 border-amber-300 rounded-2xl font-bold text-base sm:text-lg text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={feedback?.show || !typedAnswer.trim()}
                      className="py-3 px-6 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white rounded-2xl font-black text-base border-3 border-amber-700 shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                    >
                      <Send className="w-5 h-5" />
                      <span>ส่งคำตอบ</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Interaction Mode: Drag & Drop */}
              {currentMission.type === 'drag' && (
                <div className="space-y-4 pt-2">
                  <div className="bg-sky-50 p-3 rounded-2xl border-2 border-sky-200 text-xs font-bold text-sky-800 flex items-center gap-2">
                    <GripHorizontal className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>กดเลือกหรือลากการ์ดคำตอบที่ถูกต้องไปวางในช่องคำตอบนักสืบ</span>
                  </div>

                  {/* Drop Target Area */}
                  <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedItem && !feedback?.show) {
                        setSelectedDragOption(draggedItem);
                        handleAnswerSubmit(draggedItem);
                      }
                    }}
                    className={`min-h-[70px] p-3 rounded-2xl border-3 border-dashed flex items-center justify-center text-center transition-all ${
                      selectedDragOption 
                        ? 'bg-amber-100 border-amber-500' 
                        : 'bg-amber-50/60 border-amber-300 hover:border-amber-400'
                    }`}
                  >
                    {selectedDragOption ? (
                      <div className="flex items-center gap-2 font-black text-lg text-amber-950 bg-amber-200 px-4 py-2 rounded-xl border border-amber-400 shadow-xs">
                        <span>🎯 คำตอบที่เลือก:</span>
                        <span className="text-amber-900 underline">{selectedDragOption}</span>
                      </div>
                    ) : (
                      <span className="text-amber-600 font-bold text-sm sm:text-base">
                        📍 วางคำตอบที่ถูกต้องตรงนี้ (หรือคลิกการ์ดด้านล่าง)
                      </span>
                    )}
                  </div>

                  {/* Options Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentMission.options?.map((opt, idx) => (
                      <button
                        key={idx}
                        disabled={feedback?.show}
                        draggable={!feedback?.show}
                        onDragStart={() => setDraggedItem(opt)}
                        onClick={() => {
                          if (!feedback?.show) {
                            soundManager.playClick();
                            setSelectedDragOption(opt);
                            handleAnswerSubmit(opt);
                          }
                        }}
                        className={`p-3 rounded-2xl font-bold text-sm sm:text-base border-2 shadow-xs transition-all cursor-pointer text-left ${
                          selectedDragOption === opt
                            ? 'bg-amber-400 border-amber-600 text-white scale-102'
                            : 'bg-white hover:bg-amber-50 border-amber-300 text-amber-950 active:scale-95'
                        }`}
                      >
                        🖐️ {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Instant Feedback Overlay Modal / Notification Card */}
            {feedback?.show && (
              <div className={`p-5 rounded-3xl border-4 shadow-xl space-y-3 animate-bounce-short ${
                feedback.isCorrect 
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950' 
                  : 'bg-amber-50 border-amber-400 text-amber-950'
              }`}>
                <div className="flex items-start gap-3">
                  {feedback.isCorrect ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-8 h-8 text-rose-500 shrink-0" />
                  )}
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-black">
                      {feedback.isCorrect ? (
                        <span className="text-emerald-700">🎉 เก่งมาก! คำตอบถูกต้อง +10 คะแนน</span>
                      ) : (
                        <span className="text-amber-900">💡 ลองอ่านเรื่องอีกครั้งนะ ค่อย ๆ คิดจากข้อมูลในเรื่อง</span>
                      )}
                    </h3>
                    
                    {!feedback.isCorrect && (
                      <div className="text-sm font-bold text-amber-900 bg-amber-100 p-2.5 rounded-xl border border-amber-300">
                        <span className="text-amber-950 underline">เฉลยที่ถูกต้อง:</span> {feedback.correctAnswerText}
                      </div>
                    )}

                    <p className="text-xs sm:text-sm font-medium opacity-90">
                      ℹ️ {feedback.explanation}
                    </p>
                  </div>
                </div>

                {/* Next Question Action */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-2xl font-black text-base sm:text-lg border-3 border-amber-700 shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{currentIndex < MISSIONS.length - 1 ? 'ไปข้อถัดไป' : 'ดูสรุปผลการแข่งขัน'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
