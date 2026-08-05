export type QuestionType = 'mcq' | 'typing' | 'drag';

export type QuestionCategory = 'who' | 'what' | 'where' | 'when' | 'how' | 'summary';

export interface StudentInfo {
  name: string;
  surname: string;
  gradeClass: 'ป.3/1' | 'ป.3/2';
  studentNo: string;
  avatarId?: string;
}

export interface Mission {
  id: number;
  title: string;
  story: string;
  question: string;
  category: QuestionCategory;
  categoryLabel: string;
  categoryIcon: string;
  type: QuestionType;
  options?: string[]; // For MCQ and Drag
  correctAnswer: string | string[]; // Single string or array of acceptable answers
  explanation: string;
  illustrationType: string;
  themeColor: string;
}

export interface MissionResult {
  missionId: number;
  category: QuestionCategory;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswerText: string;
  timeTakenSeconds: number;
}

export interface GameRecord {
  id: string;
  student: StudentInfo;
  score: number; // Out of 300 (10 points * 30 questions)
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  percentage: number;
  durationSeconds: number;
  completedAt: string;
  results: MissionResult[];
  badge: 'gold' | 'silver' | 'bronze' | 'participant';
  badgeTitle: string;
}

export type GameScreen = 
  | 'start' 
  | 'register' 
  | 'playing' 
  | 'result' 
  | 'leaderboard' 
  | 'how_to_play' 
  | 'about' 
  | 'teacher';
