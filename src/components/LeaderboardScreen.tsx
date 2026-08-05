import React, { useState } from 'react';
import { GameRecord, GameScreen } from '../types';
import { getStoredRecords, clearAllRecords, resetToDefaultRecords } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { 
  Trophy, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  ArrowLeft, 
  Trash2, 
  RefreshCw,
  AlertTriangle,
  X,
  Check
} from 'lucide-react';

interface Props {
  onNavigate: (screen: GameScreen) => void;
}

export const LeaderboardScreen: React.FC<Props> = ({ onNavigate }) => {
  const [records, setRecords] = useState<GameRecord[]>(() => getStoredRecords());
  const [classFilter, setClassFilter] = useState<'all' | 'ป.3/1' | 'ป.3/2'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sorting logic: Score desc -> duration asc
  const sortedRecords = [...records].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.durationSeconds - b.durationSeconds;
  });

  // Filtering
  const filteredRecords = sortedRecords.filter(rec => {
    const matchesClass = classFilter === 'all' || rec.student.gradeClass === classFilter;
    const fullName = `${rec.student.name} ${rec.student.surname}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase().trim());
    return matchesClass && matchesSearch;
  });

  const handleClearAll = () => {
    soundManager.playClick();
    clearAllRecords();
    setRecords([]);
    setShowManageModal(false);
    triggerToast('🗑️ ล้างข้อมูลคลังเกียรติยศเรียบร้อยแล้ว');
  };

  const handleResetSample = () => {
    soundManager.playClick();
    const defaultData = resetToDefaultRecords();
    setRecords(defaultData);
    setShowManageModal(false);
    triggerToast('🔄 คืนค่าข้อมูลตัวอย่างคลังเกียรติยศเรียบร้อยแล้ว');
  };

  const handleExportCSV = () => {
    soundManager.playClick();
    const header = "อันดับ,ชื่อ,นามสกุล,ชั้น,เลขที่,คะแนน (300),ตอบถูก,ตอบผิด,เปอร์เซ็นต์ (%),วันที่บันทึก";
    const rows = filteredRecords.map((rec, index) => {
      const dateStr = new Date(rec.completedAt).toLocaleString('th-TH');
      return `${index + 1},"${rec.student.name}","${rec.student.surname}","${rec.student.gradeClass}","${rec.student.studentNo}",${rec.score},${rec.correctCount},${rec.wrongCount},${rec.percentage}%,${dateStr}`;
    });

    const csvContent = [header, ...rows].join('\n');
    navigator.clipboard.writeText(csvContent);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 3000);
    triggerToast('📋 คัดลอกตารางคะแนนสำหรับ Google Sheets เรียบร้อยแล้ว');
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="text-2xl animate-bounce">🥇</span>;
    if (rank === 2) return <span className="text-2xl">🥈</span>;
    if (rank === 3) return <span className="text-2xl">🥉</span>;
    return <span className="text-xs font-bold text-slate-500">{rank}</span>;
  };

  const getBadgeTitleText = (score: number) => {
    if (score >= 250) return '🥇 นักสืบยอดเยี่ยม';
    if (score >= 180) return '🥈 นักสืบเก่งมาก';
    if (score >= 100) return '🥉 นักสืบคนเก่ง';
    return '📚 นักสืบฝึกหัด';
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

      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-xl border-4 border-amber-300 relative space-y-6">
        
        {/* Top Header */}
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
            <h1 className="text-2xl sm:text-3xl font-black text-amber-950 flex items-center justify-center sm:justify-start gap-2">
              <Trophy className="w-8 h-8 text-amber-500" />
              <span>🏆 คลังเกียรติยศ นักอ่านจับใจความ</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-amber-800 pt-0.5">
              อันดับคะแนนการจับใจความสำคัญของนักเรียน ป.3 By Kru’ Time
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                soundManager.playClick();
                setShowManageModal(true);
              }}
              className="py-2 px-3 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-2xl font-bold text-xs sm:text-sm border-2 border-rose-300 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>ล้าง/รีเซ็ตข้อมูล</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex-1 sm:flex-none py-2 px-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-xs sm:text-sm border-2 border-emerald-700 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{copiedStatus ? 'คัดลอกแล้ว!' : 'ส่งออก Google Sheets'}</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-amber-50 p-3 rounded-2xl border-2 border-amber-300">
          
          {/* Class Filter */}
          <div className="sm:col-span-5 flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-xs font-bold text-amber-900 shrink-0">ห้องเรียน:</span>
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
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-white hover:bg-amber-100 text-amber-900 border border-amber-200'
                  }`}
                >
                  {c === 'all' ? 'ทั้งหมด' : c}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="sm:col-span-7 relative">
            <Search className="w-4 h-4 text-amber-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="ค้นหาชื่อนักเรียน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-amber-300 rounded-xl text-xs sm:text-sm font-bold text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>

        {/* Table View */}
        <div className="overflow-x-auto rounded-2xl border-2 border-amber-300 shadow-xs bg-white">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300 text-amber-950 text-xs font-black uppercase border-b-2 border-amber-400">
                <th className="p-3 text-center w-16">อันดับ</th>
                <th className="p-3">ชื่อ - นามสกุล</th>
                <th className="p-3 text-center">ระดับชั้น</th>
                <th className="p-3 text-center">เลขที่</th>
                <th className="p-3 text-center">คะแนน (300)</th>
                <th className="p-3 text-center">ผลการประเมิน</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 text-sm font-bold text-amber-950">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((rec, idx) => {
                  const isTop3 = idx < 3;
                  return (
                    <tr 
                      key={rec.id}
                      className={`hover:bg-amber-50 transition-colors ${
                        isTop3 ? 'bg-amber-50/60 font-black' : ''
                      }`}
                    >
                      <td className="p-3 text-center font-black">
                        {getRankBadge(idx + 1)}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span>{rec.student.name} {rec.student.surname}</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-1 rounded-full border border-amber-300">
                          {rec.student.gradeClass}
                        </span>
                      </td>
                      <td className="p-3 text-center font-extrabold text-amber-800">
                        {rec.student.studentNo}
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-base font-black text-emerald-700 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-2xl">
                          {rec.score}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-xl border border-amber-300">
                          {getBadgeTitleText(rec.score)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-amber-700 font-bold">
                    ยังไม่มีข้อมูลนักเรียนในคลังเกียรติยศ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Clear Data Option for Teachers */}
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
            <span>จัดการ / ล้างข้อมูลตารางคะแนน</span>
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
                    จัดการข้อมูลตารางคะแนน
                  </h3>
                  <p className="text-xs font-bold text-amber-800">
                    คุณครูต้องการดำเนินการอย่างไรกับคลังเกียรติยศ?
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
