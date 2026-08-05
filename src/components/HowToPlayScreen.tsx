import React from 'react';
import { GameScreen } from '../types';
import { soundManager } from '../utils/audio';
import { BookOpen, ArrowLeft, CheckCircle2, User, Target, MapPin, Clock, Wrench, Lightbulb } from 'lucide-react';

interface Props {
  onNavigate: (screen: GameScreen) => void;
}

export const HowToPlayScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 p-4 sm:p-6 flex flex-col items-center">
      
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 relative space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-amber-200 pb-4">
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('start');
            }}
            className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-2xl border-2 border-amber-300 transition-colors cursor-pointer"
            title="กลับหน้าหลัก"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-amber-950 flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-sky-500" />
              <span>📖 วิธีเล่นเกม “นักสืบจับใจความ”</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-amber-800 pt-0.5">
              คู่มือแนะนำขั้นตอนการเล่นและการค้นหาคำตอบสำหรับนักเรียน ป.3
            </p>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 space-y-1">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-black text-base flex items-center justify-center mb-2">
              1
            </div>
            <h3 className="font-extrabold text-amber-950 text-base">1️⃣ อ่านภาพให้ละเอียด</h3>
            <p className="text-xs font-bold text-amber-800">
              สังเกตภาพประกอบของภารกิจ เพื่อช่วยให้เห็นภาพรวมของเรื่องที่อ่าน
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 space-y-1">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-black text-base flex items-center justify-center mb-2">
              2
            </div>
            <h3 className="font-extrabold text-amber-950 text-base">2️⃣ อ่านเนื้อเรื่องให้ครบ</h3>
            <p className="text-xs font-bold text-amber-800">
              อ่านบทอ่านสั้น ๆ 3–6 ประโยคอย่างตั้งใจและจับจุดสำคัญ
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 space-y-1">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-black text-base flex items-center justify-center mb-2">
              3
            </div>
            <h3 className="font-extrabold text-amber-950 text-base">3️⃣ อ่านคำถาม</h3>
            <p className="text-xs font-bold text-amber-800">
              ดูว่าคำถามถามถึง ใคร ทำอะไร ที่ไหน เมื่อไหร่ หรืออย่างไร
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 space-y-1">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-black text-base flex items-center justify-center mb-2">
              4
            </div>
            <h3 className="font-extrabold text-amber-950 text-base">4️⃣ ค้นหาคำตอบจากเรื่อง</h3>
            <p className="text-xs font-bold text-amber-800">
              ใช้ทักษะนักสืบ ย้อนกลับไปค้นหาคำตอบจริงในบทอ่าน
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 space-y-1">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-black text-base flex items-center justify-center mb-2">
              5
            </div>
            <h3 className="font-extrabold text-amber-950 text-base">5️⃣ เลือก / พิมพ์ / ลากคำตอบ</h3>
            <p className="text-xs font-bold text-amber-800">
              ตอบคำถามผ่านปุ่มเลือกตอบ ช่องพิมพ์คำตอบ หรือลากการ์ดมาวาง
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 space-y-1">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-black text-base flex items-center justify-center mb-2">
              6
            </div>
            <h3 className="font-extrabold text-amber-950 text-base">6️⃣ สะสมคะแนนให้มากที่สุด</h3>
            <p className="text-xs font-bold text-amber-800">
              ตอบถูกได้ข้อละ 10 คะแนน สะสมครบ 30 ข้อเพื่อรับถ้วยรางวัลเกียรติยศ
            </p>
          </div>

        </div>

        {/* 5W1H Explanation Guide */}
        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-5 rounded-3xl border-3 border-amber-300 space-y-3">
          <h3 className="font-black text-amber-950 text-lg flex items-center gap-2">
            <span>🎯</span>
            <span>หลักการจับใจความ 5W1H ในเกม</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-2xl border border-amber-200 flex items-start gap-2.5">
              <User className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-sm text-emerald-950 block">👤 ใคร (Who)</span>
                <span className="text-xs font-bold text-amber-900">ค้นหาบุคคล ตัวละคร หรือผู้กระทำในเรื่อง</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-amber-200 flex items-start gap-2.5">
              <Target className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-sm text-amber-950 block">🎯 ทำอะไร (What)</span>
                <span className="text-xs font-bold text-amber-900">ค้นหาการกระทำ หรือเหตุการณ์ที่เกิดขึ้น</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-amber-200 flex items-start gap-2.5">
              <MapPin className="w-6 h-6 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-sm text-sky-950 block">📍 ที่ไหน (Where)</span>
                <span className="text-xs font-bold text-amber-900">ค้นหาสถานที่ หรือบริเวณที่เกิดเหตุการณ์</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-amber-200 flex items-start gap-2.5">
              <Clock className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-sm text-purple-950 block">🕐 เมื่อไหร่ (When)</span>
                <span className="text-xs font-bold text-amber-900">ค้นหาช่วงเวลา วัน หรือเวลาที่เกิดเรื่อง</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-amber-200 flex items-start gap-2.5">
              <Wrench className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-sm text-rose-950 block">🛠️ อย่างไร (How)</span>
                <span className="text-xs font-bold text-amber-900">ค้นหาวิธีการ ขั้นตอน หรือลักษณะอาการ</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-amber-200 flex items-start gap-2.5">
              <Lightbulb className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-sm text-amber-950 block">💡 สรุปความรู้</span>
                <span className="text-xs font-bold text-amber-900">ค้นหาข้อคิด สาระสำคัญ หรือประเด็นหลักของเรื่อง</span>
              </div>
            </div>
          </div>
        </div>

        {/* Start button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('register');
            }}
            className="py-3 px-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg border-3 border-emerald-700 shadow-md cursor-pointer active:scale-95 transition-all"
          >
            🚀 พร้อมแล้ว! เริ่มภารกิจ
          </button>
        </div>

      </div>

    </div>
  );
};
