import React, { useState } from 'react';
import { GameRecord, GameScreen } from '../types';
import { getStoredRecords, clearAllRecords, resetToDefaultRecords, deleteSingleRecord } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { MISSIONS } from '../data/missions';
import { 
  GraduationCap, 
  ArrowLeft, 
  FileSpreadsheet, 
  Search, 
  Filter, 
  Users, 
  BarChart2, 
  CheckCircle, 
  Trash2, 
  ChevronRight,
  Award,
  RefreshCw,
  AlertTriangle,
  X,
  Check
} from 'lucide-react';

interface Props {
  onNavigate: (screen: GameScreen) => void;
}

export const TeacherScreen: React.FC<Props> = ({ onNavigate }) => {
  const [records, setRecords] = useState<GameRecord[]>(() => getStoredRecords());
  const [classFilter, setClassFilter] = useState<'all' | 'ป.3/1' | 'ป.3/2'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<GameRecord | null>(null);
  const [showManageModal, setShowManageModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredRecords = records.filter(rec => {
    const matchesClass = classFilter === 'all' || rec.student.gradeClass === classFilter;
    const fullName = `${rec.student.name} ${rec.student.surname} ${rec.student.studentNo}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase().trim());
    return matchesClass && matchesSearch;
  });

  // Calculate Class Analytics
  const totalStudents = filteredRecords.length;
  const avgScore = totalStudents > 0 
    ? Math.round(filteredRecords.reduce((acc, r) => acc + r.score, 0) / totalStudents) 
    : 0;
  const highestScore = totalStudents > 0 
    ? Math.max(...filteredRecords.map(r => r.score)) 
    : 0;
  const passCount = filteredRecords.filter(r => r.score >= 180).length;
  const passPercent = totalStudents > 0 ? Math.round((passCount / totalStudents) * 100) : 0;

  // 5W1H Class Accuracy Diagnostics
  const categoryStats = ['who', 'what', 'where', 'when', 'how', 'summary'].map(cat => {
    let catTotalAttempts = 0;
    let catCorrectAttempts = 0;

    filteredRecords.forEach(rec => {
      rec.results.forEach(res => {
        if (res.category === cat) {
          catTotalAttempts++;
          if (res.isCorrect) catCorrectAttempts++;
        }
      });
    });

    const labelMap: Record<string, string> = {
      who: '👤 ใคร (Who)',
      what: '🎯 ทำอะไร (What)',
      where: '📍 ที่ไหน (Where)',
      when: '🕐 เมื่อไหร่ (When)',
      how: '🛠️ อย่างไร (How)',
      summary: '💡 สรุปความรู้ (Overall)'
    };

    const percent = catTotalAttempts > 0 ? Math.round((catCorrectAttempts / catTotalAttempts) * 100) : 0;

    return {
      cat,
      label: labelMap[cat] || cat,
      correct: catCorrectAttempts,
      total: catTotalAttempts,
      percent
    };
  });

  const handleExportCSV = () => {
    soundManager.playClick();
    if (filteredRecords.length === 0) {
      alert('ยังไม่มีข้อมูลนักเรียน');
      return;
    }

    const header = "ลำดับ,วัน-เวลา,ชื่อ,นามสกุล,ชั้น,เลขที่,คะแนนเต็ม300,ตอบถูก,ตอบผิด,คิดเป็น%,เวลาที่ใช้(วินาที)";
    const rows = filteredRecords.map((r, i) => {
      const dateStr = new Date(r.completedAt).toLocaleString('th-TH');
      return `${i + 1},"${dateStr}","${r.student.name}","${r.student.surname}","${r.student.gradeClass}","${r.student.studentNo}",${r.score},${r.correctCount},${r.wrongCount},${r.percentage}%,${r.durationSeconds}`;
    });

    const csvContent = [header, ...rows].join('\n');
    navigator.clipboard.writeText(csvContent);
    triggerToast('📋 คัดลอกข้อมูลสำหรับ Google Sheets เรียบร้อยแล้ว');
  };

  const handleClearAll = () => {
    soundManager.playClick();
    clearAllRecords();
    setRecords([]);
    setSelectedRecord(null);
    setShowManageModal(false);
    triggerToast('🗑️ ล้างข้อมูลนักเรียนทั้งหมดเรียบร้อยแล้ว (0 รายการ)');
  };

  const handleResetSample = () => {
    soundManager.playClick();
    const defaultData = resetToDefaultRecords();
    setRecords(defaultData);
    setSelectedRecord(null);
    setShowManageModal(false);
    triggerToast('🔄 คืนค่าข้อมูลตัวอย่างของ Kru’ Time เรียบร้อยแล้ว');
  };

  const handleDeleteStudent = (e: React.MouseEvent, recordId: string, studentName: string) => {
    e.stopPropagation();
    soundManager.playClick();
    if (confirm(`คุณครูต้องการลบข้อมูลคะแนนของ "${studentName}" ใช่หรือไม่?`)) {
      const updated = deleteSingleRecord(recordId);
      setRecords(updated);
      if (selectedRecord?.id === recordId) {
        setSelectedRecord(null);
      }
      triggerToast(`🗑️ ลบข้อมูลของ ${studentName} เรียบร้อยแล้ว`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 p-4 sm:p-6 flex flex-col items-center relative">
      
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-amber-400 font-bold text-sm flex items-center gap-2 animate-bounce-short">
          <Check className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="w-full max-w-6xl bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-xl border-4 border-amber-300 relative space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-amber-200 pb-4">
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('start');
            }}
            className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-2xl border-2 border-amber-300 transition-colors cursor-pointer self-start sm:self-auto"
            title="กลับหน้าหลัก"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-black text-indigo-950 flex items-center justify-center sm:justify-start gap-2">
              <GraduationCap className="w-8 h-8 text-indigo-600" />
              <span>👨‍🏫 ระบบครูผู้สอน (Kru’ Time Dashboard)</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-indigo-800 pt-0.5">
              ระบบสรุปผลคะแนนการอ่านจับใจความและวิเคราะห์ทักษะนักเรียน ป.3
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                soundManager.playClick();
                setShowManageModal(true);
              }}
              className="py-2.5 px-3 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-2xl font-bold text-xs sm:text-sm border-2 border-rose-300 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>ล้าง/รีเซ็ตข้อมูล</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs sm:text-sm border-2 border-emerald-800 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>ส่งออก Google Sheets</span>
            </button>
          </div>
        </div>

        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          
          <div className="bg-indigo-50 p-4 rounded-2xl border-2 border-indigo-200 flex items-center gap-3">
            <div className="p-3 bg-indigo-500 text-white rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-800">นักเรียนทดสอบแล้ว</div>
              <div className="text-2xl font-black text-indigo-950">{totalStudents} คน</div>
            </div>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 flex items-center gap-3">
            <div className="p-3 bg-emerald-500 text-white rounded-xl">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-800">คะแนนเฉลี่ยชั้นเรียน</div>
              <div className="text-2xl font-black text-emerald-950">{avgScore} / 300</div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 flex items-center gap-3">
            <div className="p-3 bg-amber-500 text-white rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-800">คะแนนสูงสุด</div>
              <div className="text-2xl font-black text-amber-950">{highestScore} คะแนน</div>
            </div>
          </div>

          <div className="bg-sky-50 p-4 rounded-2xl border-2 border-sky-200 flex items-center gap-3">
            <div className="p-3 bg-sky-500 text-white rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-sky-800">อัตราผ่านเกณฑ์ (≥60%)</div>
              <div className="text-2xl font-black text-sky-950">{passPercent}%</div>
            </div>
          </div>

        </div>

        {/* 5W1H Category Diagnostic Bar chart representation */}
        <div className="bg-indigo-950 text-white p-5 rounded-3xl shadow-md space-y-3">
          <h3 className="font-extrabold text-base sm:text-lg flex items-center gap-2 text-yellow-300">
            <span>📊</span>
            <span>วิเคราะห์ความเข้าใจจำแนกตามทักษะ 5W1H (ภาพรวมทั้งห้อง)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {categoryStats.map((c, i) => (
              <div key={i} className="bg-indigo-900/80 p-3 rounded-2xl border border-indigo-700 space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-indigo-200">{c.label}</span>
                  <span className="text-yellow-300 font-extrabold">{c.percent}% ถูกต้อง</span>
                </div>
                <div className="w-full bg-indigo-950 h-2.5 rounded-full overflow-hidden border border-indigo-700">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${c.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-amber-50 p-3 rounded-2xl border-2 border-amber-300">
          
          <div className="sm:col-span-5 flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-xs font-bold text-amber-900 shrink-0">กรองห้อง:</span>
            <div className="grid grid-cols-3 gap-1 flex-1">
              {(['all', 'ป.3/1', 'ป.3/2'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => {
                    soundManager.playClick();
                    setClassFilter(c);
                  }}
                  className={`py-1 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    classFilter === c
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white hover:bg-indigo-100 text-amber-900 border border-amber-200'
                  }`}
                >
                  {c === 'all' ? 'ทุกห้อง' : c}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-7 relative">
            <Search className="w-4 h-4 text-amber-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="ค้นหาชื่อ นามสกุล หรือเลขที่นักเรียน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-amber-300 rounded-xl text-xs sm:text-sm font-bold text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>

        {/* Student List Table & Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Main Table */}
          <div className={`${selectedRecord ? 'lg:col-span-7' : 'lg:col-span-12'} overflow-x-auto rounded-2xl border-2 border-amber-300 shadow-xs bg-white`}>
            <table className="w-full text-left border-collapse min-w-[550px]">
              <thead>
                <tr className="bg-amber-200 text-amber-950 text-xs font-black uppercase border-b-2 border-amber-300">
                  <th className="p-3 text-center">ห้อง</th>
                  <th className="p-3 text-center">เลขที่</th>
                  <th className="p-3">ชื่อ - นามสกุล</th>
                  <th className="p-3 text-center">คะแนน</th>
                  <th className="p-3 text-center">เวลา</th>
                  <th className="p-3 text-center">ตรวจ/จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100 text-sm font-bold text-amber-950">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((r) => (
                    <tr 
                      key={r.id} 
                      className={`hover:bg-amber-50 transition-colors cursor-pointer ${
                        selectedRecord?.id === r.id ? 'bg-indigo-50 font-black' : ''
                      }`}
                      onClick={() => setSelectedRecord(r)}
                    >
                      <td className="p-3 text-center text-xs">
                        <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md border border-amber-300">
                          {r.student.gradeClass}
                        </span>
                      </td>
                      <td className="p-3 text-center font-bold text-amber-800">
                        {r.student.studentNo}
                      </td>
                      <td className="p-3 font-bold">
                        {r.student.name} {r.student.surname}
                      </td>
                      <td className="p-3 text-center font-black text-emerald-700">
                        {r.score}
                      </td>
                      <td className="p-3 text-center text-xs text-slate-600">
                        {r.durationSeconds}s
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedRecord(r)}
                            className="p-1 px-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg border border-indigo-300 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>ดูผล</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteStudent(e, r.id, `${r.student.name} ${r.student.surname}`)}
                            title="ลบเฉพาะรายการนี้"
                            className="p-1 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-lg border border-rose-300 text-xs font-bold cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-amber-700 font-bold">
                      ไม่พบข้อมูลนักเรียน
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Detailed Inspection Drawer for selected student */}
          {selectedRecord && (
            <div className="lg:col-span-5 bg-white p-4 rounded-2xl border-3 border-indigo-300 shadow-md space-y-4 max-h-[500px] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                <div>
                  <h3 className="font-extrabold text-indigo-950 text-base">
                    📝 รายละเอียดการทำข้อสอบ
                  </h3>
                  <p className="text-xs font-bold text-indigo-800">
                    {selectedRecord.student.name} {selectedRecord.student.surname} ({selectedRecord.student.gradeClass} เลขที่ {selectedRecord.student.studentNo})
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-xs text-rose-600 hover:underline font-bold cursor-pointer"
                >
                  ปิด
                </button>
              </div>

              {/* Student Results List */}
              <div className="space-y-2">
                {selectedRecord.results.map((res, idx) => {
                  const m = MISSIONS.find(m => m.id === res.missionId);
                  return (
                    <div 
                      key={idx}
                      className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                        res.isCorrect 
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                          : 'bg-rose-50 border-rose-300 text-rose-950'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>ข้อที่ {res.missionId}: {m?.title} ({m?.categoryLabel})</span>
                        {res.isCorrect ? (
                          <span className="text-emerald-700 font-black">✔️ ถูกต้อง (+10)</span>
                        ) : (
                          <span className="text-rose-600 font-black">❌ ผิด</span>
                        )}
                      </div>
                      <div className="text-[11px] opacity-90">
                        <span>ตอบ: <span className="font-bold underline">{res.userAnswer}</span></span>
                        {!res.isCorrect && (
                          <span className="block text-rose-700">เฉลย: {res.correctAnswerText}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

        {/* Clear Data Trigger Link */}
        <div className="flex justify-between items-center pt-2 text-xs font-bold text-slate-500 border-t border-amber-200">
          <span>รวมนักเรียนทั้งสิ้น {records.length} รายการ</span>
          <button
            onClick={() => {
              soundManager.playClick();
              setShowManageModal(true);
            }}
            className="text-rose-600 hover:text-rose-800 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>จัดการ / ล้างระบบบันทึกคะแนนครู</span>
          </button>
        </div>

      </div>

      {/* Clear Data Modal Dialog */}
      {showManageModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-amber-300 space-y-5 animate-scale-up">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 text-amber-950">
                <div className="p-3 bg-amber-100 rounded-2xl border-2 border-amber-300 text-amber-800">
                  <AlertTriangle className="w-7 h-7 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-black text-xl text-amber-950">
                    จัดการข้อมูลบันทึกคะแนน
                  </h3>
                  <p className="text-xs font-bold text-amber-800">
                    คุณครูต้องการดำเนินการอย่างไรกับระบบคะแนน?
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowManageModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              
              {/* Reset Sample Data Button */}
              <button
                onClick={handleResetSample}
                className="w-full p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-950 text-left font-bold transition-all cursor-pointer flex items-start gap-3 group"
              >
                <div className="p-2 bg-amber-500 text-white rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-amber-950">
                    🔄 คืนค่าข้อมูลตัวอย่าง (Reset Sample Data)
                  </div>
                  <div className="text-xs font-semibold text-amber-800 pt-0.5">
                    โหลดข้อมูลนักเรียนตัวอย่าง 5 รายการเดิมสำหรับทดลองใช้
                  </div>
                </div>
              </button>

              {/* Clear All Records Button */}
              <button
                onClick={handleClearAll}
                className="w-full p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-300 text-rose-950 text-left font-bold transition-all cursor-pointer flex items-start gap-3 group"
              >
                <div className="p-2 bg-rose-600 text-white rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-rose-950">
                    🗑️ ล้างข้อมูลนักเรียนทั้งหมด (Clear All)
                  </div>
                  <div className="text-xs font-semibold text-rose-800 pt-0.5">
                    ลบประวัติคะแนนของนักเรียนทุกคนออกเป็น 0 คน
                  </div>
                </div>
              </button>

            </div>

            {/* Cancel Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowManageModal(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm border border-slate-300 cursor-pointer"
              >
                ยกเลิก
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
