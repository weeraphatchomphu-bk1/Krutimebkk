import React from 'react';
import { GameScreen } from '../types';
import { soundManager } from '../utils/audio';
import { Info, ArrowLeft, Heart, Sparkles, GraduationCap, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (screen: GameScreen) => void;
}

export const AboutScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 p-4 sm:p-6 flex flex-col items-center">
      
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 relative space-y-6">
        
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
              <Info className="w-8 h-8 text-purple-600" />
              <span>ℹ️ เกี่ยวกับเกม “นักสืบจับใจความ By Kru’ Time”</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-amber-800 pt-0.5">
              สื่อการเรียนรู้นวัตกรรมภาษาไทยระดับชั้นประถมศึกษาปีที่ 3
            </p>
          </div>
        </div>

        {/* Content Box */}
        <div className="space-y-4 text-amber-950 font-medium leading-relaxed">
          
          <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-200 space-y-2">
            <h3 className="font-extrabold text-purple-950 text-base flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              <span>วัตถุประสงค์การเรียนรู้</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-900 text-justify">
              เกมการศึกษาชุด <strong>“นักสืบจับใจความ By Kru’ Time”</strong> พัฒนาขึ้นเพื่อส่งเสริมทักษะการอ่านจับใจความสำคัญของนักเรียนชั้นประถมศึกษาปีที่ 3 ตามหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน กลุ่มสาระการเรียนรู้ภาษาไทย มุ่งเน้นให้นักเรียนฝึกคิดวิเคราะห์และตอบคำถามครอบคลุมหลัก <strong>5W1H (ใคร, ทำอะไร, ที่ไหน, เมื่อไหร่, อย่างไร และสรุปความรู้)</strong>
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 space-y-2">
            <h3 className="font-extrabold text-amber-950 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>จุดเด่นของนวัตกรรม</span>
            </h3>
            <ul className="text-xs sm:text-sm text-amber-900 space-y-1.5 list-disc list-inside">
              <li><strong>30 ภารกิจจับใจความ</strong> มีบทอ่านและภาพประกอบหลากหลายบริบทใกล้ตัวเด็ก</li>
              <li><strong>สลับ 3 รูปแบบการตอบ</strong> (เลือกตอบ, พิมพ์ตอบ, ลากคำตอบ) เพื่อความตื่นเต้นไม่น่าเบื่อ</li>
              <li><strong>ระบบคลังเกียรติยศ (Hall of Fame)</strong> จัดอันดับและบันทึกคะแนนอัตโนมัติ</li>
              <li><strong>รองรับการเชื่อมต่อ Google Sheets</strong> ช่วยให้คุณครูติดตามและส่งออกคะแนนได้อย่างสะดวก</li>
              <li><strong>การออกแบบ Cute Educational UI</strong> ฟอนต์ Mali อ่านง่าย สีสันสดใส เสียงเอฟเฟกต์ไพเราะ</li>
            </ul>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-300 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
            <div className="text-xs sm:text-sm text-emerald-950">
              <span className="font-extrabold block">พัฒนาโดย: Kru’ Time (ครูไทม์)</span>
              <span>กลุ่มสาระการเรียนรู้ภาษาไทย ระดับชั้นประถมศึกษาปีที่ 3</span>
            </div>
          </div>

        </div>

        {/* Action button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('start');
            }}
            className="py-3 px-8 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black text-base border-3 border-amber-700 shadow-md cursor-pointer active:scale-95 transition-all"
          >
            🏠 กลับหน้าหลัก
          </button>
        </div>

      </div>

    </div>
  );
};
