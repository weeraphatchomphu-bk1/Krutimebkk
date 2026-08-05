import { GameRecord, StudentInfo } from '../types';

const STORAGE_KEY_RECORDS = 'detective_game_records_v1';
const STORAGE_KEY_CURRENT_STUDENT = 'detective_current_student';

export function getStoredRecords(): GameRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECORDS);
    if (raw === null) {
      const initial = getInitialDefaultRecords();
      localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveRecord(record: GameRecord): void {
  try {
    const records = getStoredRecords();
    // Add new record at beginning
    records.unshift(record);
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save record', err);
  }
}

export function clearAllRecords(): void {
  try {
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify([]));
  } catch (err) {
    console.error('Failed to clear records', err);
  }
}

export function resetToDefaultRecords(): GameRecord[] {
  try {
    const initial = getInitialDefaultRecords();
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(initial));
    return initial;
  } catch {
    return [];
  }
}

export function deleteSingleRecord(recordId: string): GameRecord[] {
  try {
    const current = getStoredRecords();
    const updated = current.filter(r => r.id !== recordId);
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(updated));
    return updated;
  } catch {
    return getStoredRecords();
  }
}

export function saveCurrentStudent(student: StudentInfo): void {
  try {
    localStorage.setItem(STORAGE_KEY_CURRENT_STUDENT, JSON.stringify(student));
  } catch {
    // ignore
  }
}

export function getCurrentStudent(): StudentInfo | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT_STUDENT);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Initial mock records so Hall of Fame is populated with cute examples for Kru' Time
function getInitialDefaultRecords(): GameRecord[] {
  const now = new Date();
  return [
    {
      id: 'rec-001',
      student: { name: 'ณัฐกานต์', surname: 'ใจดี', gradeClass: 'ป.3/1', studentNo: '1' },
      score: 300,
      totalQuestions: 30,
      correctCount: 30,
      wrongCount: 0,
      percentage: 100,
      durationSeconds: 320,
      completedAt: new Date(now.getTime() - 3600000 * 2).toISOString(),
      results: [],
      badge: 'gold',
      badgeTitle: '🥇 สุดยอดนักสืบจับใจความ!'
    },
    {
      id: 'rec-002',
      student: { name: 'ปุญญพัฒน์', surname: 'สุขเจริญ', gradeClass: 'ป.3/2', studentNo: '5' },
      score: 290,
      totalQuestions: 30,
      correctCount: 29,
      wrongCount: 1,
      percentage: 97,
      durationSeconds: 385,
      completedAt: new Date(now.getTime() - 3600000 * 5).toISOString(),
      results: [],
      badge: 'gold',
      badgeTitle: '🥇 สุดยอดนักสืบจับใจความ!'
    },
    {
      id: 'rec-003',
      student: { name: 'กัญญาภัทร', surname: 'รุ่งเรือง', gradeClass: 'ป.3/1', studentNo: '12' },
      score: 270,
      totalQuestions: 30,
      correctCount: 27,
      wrongCount: 3,
      percentage: 90,
      durationSeconds: 410,
      completedAt: new Date(now.getTime() - 3600000 * 24).toISOString(),
      results: [],
      badge: 'silver',
      badgeTitle: '🌟 เก่งมาก! อ่านจับใจความได้ดีมาก'
    },
    {
      id: 'rec-004',
      student: { name: 'ธนกฤต', surname: 'ทองคำ', gradeClass: 'ป.3/2', studentNo: '18' },
      score: 250,
      totalQuestions: 30,
      correctCount: 25,
      wrongCount: 5,
      percentage: 83,
      durationSeconds: 450,
      completedAt: new Date(now.getTime() - 3600000 * 48).toISOString(),
      results: [],
      badge: 'silver',
      badgeTitle: '🌟 เก่งมาก! อ่านจับใจความได้ดีมาก'
    },
    {
      id: 'rec-005',
      student: { name: 'ชลธิชา', surname: 'สดใส', gradeClass: 'ป.3/1', studentNo: '8' },
      score: 220,
      totalQuestions: 30,
      correctCount: 22,
      wrongCount: 8,
      percentage: 73,
      durationSeconds: 490,
      completedAt: new Date(now.getTime() - 3600000 * 72).toISOString(),
      results: [],
      badge: 'bronze',
      badgeTitle: '😊 ทำได้ดี! ฝึกอ่านอีกนิดจะเก่งขึ้น'
    }
  ];
}
