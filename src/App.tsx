import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Search,
  KeyRound,
  RotateCcw,
  FastForward,
  BookOpen,
  Play,
  Pause,
  Timer,
  Clock,
} from 'lucide-react';
import {
  ALL_QUESTIONS,
  EXAM_CATEGORIES,
  ExamCategory,
  OptionKey,
  QuestionItem,
} from './data';
import { CutQuestionImage } from './components/CutQuestionImage';
import { AnswerKeyModal } from './components/AnswerKeyModal';
import bannerImg from './assets/images/algebra_exam_banner_1790608921763.jpg';

const STORAGE_KEY_RESPONSES = 'e1_algebra_548_responses_v1';
const STORAGE_KEY_CURRENT_ID = 'e1_algebra_548_current_id_v1';
const STORAGE_KEY_CROPS = 'e1_algebra_548_custom_crops_v1';
const STORAGE_KEY_TOTAL_TIME = 'e1_algebra_548_total_seconds_v1';
const STORAGE_KEY_QUESTION_TIMES = 'e1_algebra_548_question_times_v1';

function formatDuration(totalSeconds: number, includeHours = false): string {
  const secs = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  if (includeHours || hours > 0) {
    const hh = String(hours).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
}

export default function App() {
  // Filter state: 'ALL' or one of the 7 Exam Categories
  const [selectedExam, setSelectedExam] = useState<'ALL' | ExamCategory>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'UNATTEMPTED' | 'WRONG' | 'CORRECT'>('ALL');
  const [searchText, setSearchText] = useState('');

  // Current active question ID (strictly 1 to 548)
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT_ID);
      const parsed = saved ? parseInt(saved, 10) : 1;
      return parsed >= 1 && parsed <= 548 ? parsed : 1;
    } catch {
      return 1;
    }
  });

  // User's selected option per question ID
  const [userResponses, setUserResponses] = useState<Record<number, OptionKey>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESPONSES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Custom cropped images if the user cuts from an uploaded screenshot
  const [customCrops, setCustomCrops] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CROPS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // TIMER STATES: Total Session Timer & Per-Question Timer
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [totalSeconds, setTotalSeconds] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TOTAL_TIME);
      return saved ? Math.max(0, parseInt(saved, 10) || 0) : 0;
    } catch {
      return 0;
    }
  });

  // Recorded seconds per question ID (1 to 548)
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUESTION_TIMES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Current active question's live elapsed seconds
  const [currentQuestionSeconds, setCurrentQuestionSeconds] = useState<number>(0);

  // Optional target limit per question in seconds (0 = Stopwatch only, or 30s / 45s / 60s / 90s)
  const [targetPerQuestionSec, setTargetPerQuestionSec] = useState<number>(60);

  // Controls whether options are also shown inside the Cut Question Image
  const [showOptionsInCut, setShowOptionsInCut] = useState<boolean>(true);

  // Auto-advance speed when user selects the CORRECT option
  const [autoNextDelayMs, setAutoNextDelayMs] = useState<number>(650);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState<boolean>(false);
  const [isAnswerKeyOpen, setIsAnswerKeyOpen] = useState<boolean>(false);
  const [jumpInput, setJumpInput] = useState<string>('');

  const autoNextTimerRef = useRef<number | null>(null);

  // Persist user progress & timers
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESPONSES, JSON.stringify(userResponses));
    } catch {
      // ignore storage quota errors
    }
  }, [userResponses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT_ID, String(currentQuestionId));
    } catch {
      // ignore
    }
  }, [currentQuestionId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TOTAL_TIME, String(totalSeconds));
    } catch {
      // ignore
    }
  }, [totalSeconds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUESTION_TIMES, JSON.stringify(questionTimes));
    } catch {
      // ignore
    }
  }, [questionTimes]);

  // Clear pending auto-next timer on unmount
  useEffect(() => {
    return () => {
      if (autoNextTimerRef.current) {
        window.clearTimeout(autoNextTimerRef.current);
      }
    };
  }, []);

  // Strict-order filtered questions
  const filteredQuestions: QuestionItem[] = useMemo(() => {
    return ALL_QUESTIONS.filter((q) => {
      if (selectedExam !== 'ALL' && q.examCategory !== selectedExam) {
        return false;
      }
      if (statusFilter !== 'ALL') {
        const resp = userResponses[q.id];
        if (statusFilter === 'UNATTEMPTED' && resp !== undefined) return false;
        if (statusFilter === 'CORRECT' && resp !== q.answer) return false;
        if (statusFilter === 'WRONG' && (resp === undefined || resp === q.answer)) return false;
      }
      if (searchText.trim()) {
        const query = searchText.trim().toLowerCase();
        const matchId = String(q.id) === query || `#${q.id}` === query;
        const matchText =
          q.en.toLowerCase().includes(query) ||
          q.hi.toLowerCase().includes(query) ||
          q.topicTag.toLowerCase().includes(query) ||
          q.examYearTag.toLowerCase().includes(query);
        return matchId || matchText;
      }
      return true;
    });
  }, [selectedExam, statusFilter, searchText, userResponses]);

  // Ensure currentQuestionId is valid within filteredQuestions when category changes
  const activeQuestion: QuestionItem = useMemo(() => {
    const exact = filteredQuestions.find((q) => q.id === currentQuestionId);
    if (exact) return exact;
    if (filteredQuestions.length > 0) return filteredQuestions[0];
    return ALL_QUESTIONS[currentQuestionId - 1] || ALL_QUESTIONS[0];
  }, [filteredQuestions, currentQuestionId]);

  // Sync currentQuestionSeconds when switching to a different question
  useEffect(() => {
    setCurrentQuestionSeconds(questionTimes[activeQuestion.id] || 0);
  }, [activeQuestion.id]);

  // 1-second interval tick for both Per-Question Timer and Total Session Timer
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = window.setInterval(() => {
      setTotalSeconds((prev) => prev + 1);

      // Only increment the per-question timer if the current question hasn't been answered yet
      // (or keep ticking if user explicitly restarted question timer)
      setCurrentQuestionSeconds((prev) => {
        const nextVal = prev + 1;
        setQuestionTimes((prevMap) => ({
          ...prevMap,
          [activeQuestion.id]: nextVal,
        }));
        return nextVal;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isTimerRunning, activeQuestion.id]);

  const currentIndexInFiltered = useMemo(() => {
    return filteredQuestions.findIndex((q) => q.id === activeQuestion.id);
  }, [filteredQuestions, activeQuestion]);

  // Count per Exam Category (strictly summing to 548)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: ALL_QUESTIONS.length };
    for (const cat of EXAM_CATEGORIES) counts[cat] = 0;
    for (const q of ALL_QUESTIONS) {
      counts[q.examCategory] = (counts[q.examCategory] || 0) + 1;
    }
    return counts;
  }, []);

  // Session stats
  const stats = useMemo(() => {
    let attempted = 0;
    let correct = 0;
    let wrong = 0;
    for (const q of ALL_QUESTIONS) {
      const ans = userResponses[q.id];
      if (ans) {
        attempted++;
        if (ans === q.answer) correct++;
        else wrong++;
      }
    }
    const avgTime = attempted > 0 ? Math.round(totalSeconds / attempted) : 0;
    return {
      total: ALL_QUESTIONS.length,
      attempted,
      correct,
      wrong,
      remaining: ALL_QUESTIONS.length - attempted,
      avgTime,
    };
  }, [userResponses, totalSeconds]);

  const goToNextQuestion = () => {
    if (autoNextTimerRef.current) {
      window.clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
    setIsAutoAdvancing(false);

    if (currentIndexInFiltered >= 0 && currentIndexInFiltered < filteredQuestions.length - 1) {
      setCurrentQuestionId(filteredQuestions[currentIndexInFiltered + 1].id);
    } else if (activeQuestion.id < 548) {
      setCurrentQuestionId(activeQuestion.id + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (autoNextTimerRef.current) {
      window.clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
    setIsAutoAdvancing(false);

    if (currentIndexInFiltered > 0) {
      setCurrentQuestionId(filteredQuestions[currentIndexInFiltered - 1].id);
    } else if (activeQuestion.id > 1) {
      setCurrentQuestionId(activeQuestion.id - 1);
    }
  };

  // Start / Restart only the current question's timer (and ensure timer is running)
  const handleStartCurrentQuestionTimer = () => {
    setCurrentQuestionSeconds(0);
    setQuestionTimes((prev) => ({
      ...prev,
      [activeQuestion.id]: 0,
    }));
    setIsTimerRunning(true);
  };

  const handleResetTimersOnly = () => {
    setIsTimerRunning(false);
    setTotalSeconds(0);
    setCurrentQuestionSeconds(0);
    setQuestionTimes({});
    localStorage.removeItem(STORAGE_KEY_TOTAL_TIME);
    localStorage.removeItem(STORAGE_KEY_QUESTION_TIMES);
  };

  // Core requirement:
  // "as I select correct option next question else show correct answer which is at last of all questions end pick from there"
  const handleSelectOption = (optionKey: OptionKey) => {
    if (autoNextTimerRef.current) {
      window.clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }

    const qId = activeQuestion.id;
    setUserResponses((prev) => ({
      ...prev,
      [qId]: optionKey,
    }));

    const isCorrect = optionKey === activeQuestion.answer;

    if (isCorrect) {
      // Selected option is CORRECT -> Automatically move to the next question!
      setIsAutoAdvancing(true);
      autoNextTimerRef.current = window.setTimeout(() => {
        setIsAutoAdvancing(false);
        if (currentIndexInFiltered >= 0 && currentIndexInFiltered < filteredQuestions.length - 1) {
          setCurrentQuestionId(filteredQuestions[currentIndexInFiltered + 1].id);
        } else if (qId < 548) {
          setCurrentQuestionId(qId + 1);
        }
      }, autoNextDelayMs);
    } else {
      // Selected option is WRONG -> Stay on question and show the Correct Answer from the end-of-PDF Answer Key!
      setIsAutoAdvancing(false);
    }
  };

  // Keyboard shortcuts (A/B/C/D or 1/2/3/4 to answer, ArrowLeft/ArrowRight/Enter to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        document.activeElement instanceof HTMLSelectElement
      ) {
        return;
      }
      const key = e.key.toUpperCase();
      if (key === 'A' || key === '1') {
        e.preventDefault();
        handleSelectOption('A');
      } else if (key === 'B' || key === '2') {
        e.preventDefault();
        handleSelectOption('B');
      } else if (key === 'C' || key === '3') {
        e.preventDefault();
        handleSelectOption('C');
      } else if (key === 'D' || key === '4') {
        e.preventDefault();
        handleSelectOption('D');
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        goToNextQuestion();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevQuestion();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleSaveCustomCrop = (qId: number, dataUrl: string | undefined) => {
    setCustomCrops((prev) => {
      const next = { ...prev };
      if (!dataUrl) {
        delete next[qId];
      } else {
        next[qId] = dataUrl;
      }
      try {
        localStorage.setItem(STORAGE_KEY_CROPS, JSON.stringify(next));
      } catch {
        // ignore quota errors
      }
      return next;
    });
  };

  const handleResetAll = () => {
    if (autoNextTimerRef.current) {
      window.clearTimeout(autoNextTimerRef.current);
    }
    setUserResponses({});
    setCurrentQuestionId(1);
    setIsAutoAdvancing(false);
    setIsTimerRunning(false);
    setTotalSeconds(0);
    setCurrentQuestionSeconds(0);
    setQuestionTimes({});
    localStorage.removeItem(STORAGE_KEY_RESPONSES);
    localStorage.removeItem(STORAGE_KEY_TOTAL_TIME);
    localStorage.removeItem(STORAGE_KEY_QUESTION_TIMES);
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInput, 10);
    if (!isNaN(num) && num >= 1 && num <= 548) {
      setSelectedExam('ALL');
      setStatusFilter('ALL');
      setSearchText('');
      setCurrentQuestionId(num);
      setJumpInput('');
    }
  };

  const selectedOptionForActive = userResponses[activeQuestion.id];
  const isAnswered = selectedOptionForActive !== undefined;
  const isSelectedCorrect = selectedOptionForActive === activeQuestion.answer;

  // Determine if current question time has exceeded the target pace
  const isOverTargetPace =
    targetPerQuestionSec > 0 && currentQuestionSeconds > targetPerQuestionSec;

  // Determine which page of the Answer Key (47, 48, or 49) holds this question's key
  const answerKeySourcePage =
    activeQuestion.id <= 70 ? 47 : activeQuestion.id <= 400 ? 48 : 49;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Top Bar Contract: 1 row, 3 zones (Brand Title — Nav Links — Primary Actions) */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-white border-b border-slate-200">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-slate-900 font-display whitespace-nowrap"
        >
          e1 Algebra PYQ Bank
        </a>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#practice-stage" className="hover:text-slate-900 transition-colors whitespace-nowrap">
            Practice Stage
          </a>
          <a href="#exam-categories" className="hover:text-slate-900 transition-colors whitespace-nowrap">
            Exam Categories
          </a>
          <a href="#question-matrix" className="hover:text-slate-900 transition-colors whitespace-nowrap">
            All 548 Index
          </a>
          <button
            type="button"
            onClick={() => setIsAnswerKeyOpen(true)}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Official Answer Key
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsAnswerKeyOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Answers Key (1–548)</span>
          </button>
          <button
            type="button"
            onClick={handleResetAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>
      </header>

      {/* Main Content Container (1440px desktop presence) */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Compact Header Banner + Session & Timer Bar */}
        <section className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 text-white">
          <img
            src={bannerImg}
            alt="Algebraic geometry coordinate background"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/75 pointer-events-none" />

          <div className="relative z-10 px-6 py-5 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-mono tabular-nums">
                <span>Bhutesh Sir (e1 Coaching Center)</span>
                <span aria-hidden="true">·</span>
                <span>Complete 49-Page Algebra PDF</span>
                <span aria-hidden="true">·</span>
                <span>Strict Order Q.1 to Q.548</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white font-display">
                Interactive Cut-Question Practice & Exam-Wise PYQ Classifier
              </h1>
            </div>

            {/* Dual Timer & Session Metrics Deck */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-xs font-mono tabular-nums border-t xl:border-t-0 pt-3.5 xl:pt-0 border-slate-800">
              {/* Per-Question Timer Readout */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-lg px-3.5 py-2 flex items-center gap-3">
                <Timer
                  className={`w-4 h-4 shrink-0 ${
                    isOverTargetPace
                      ? 'text-amber-400'
                      : isTimerRunning
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }`}
                />
                <div>
                  <span className="text-[11px] text-slate-400 block">
                    Question #{activeQuestion.id} Timer
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`text-base font-bold ${
                        isOverTargetPace ? 'text-amber-300' : 'text-white'
                      }`}
                    >
                      {formatDuration(currentQuestionSeconds)}
                    </span>
                    {targetPerQuestionSec > 0 && (
                      <span className="text-[11px] text-slate-400">
                        / {formatDuration(targetPerQuestionSec)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Total Session Timer Readout */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-lg px-3.5 py-2 flex items-center gap-3">
                <Clock
                  className={`w-4 h-4 shrink-0 ${
                    isTimerRunning ? 'text-sky-400' : 'text-slate-400'
                  }`}
                />
                <div>
                  <span className="text-[11px] text-slate-400 block">
                    Total Timer (Avg: {stats.avgTime}s/Q)
                  </span>
                  <span className="text-base font-bold text-sky-300">
                    {formatDuration(totalSeconds, true)}
                  </span>
                </div>
              </div>

              {/* Start / Pause & Reset Timer Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    isTimerRunning
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                      : 'bg-emerald-600 text-white hover:bg-emerald-500'
                  }`}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pause Timers</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Timers</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleResetTimersOnly}
                  title="Reset Per-Question & Total Timers"
                  className="px-2.5 py-2.5 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="hidden sm:inline text-slate-700" aria-hidden="true">|</span>

              {/* Score Summary */}
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-slate-400 block">● Correct</span>
                  <span className="text-base font-semibold text-emerald-400">{stats.correct}</span>
                </div>
                <span className="text-slate-700" aria-hidden="true">/</span>
                <div>
                  <span className="text-slate-400 block">▲ Wrong</span>
                  <span className="text-base font-semibold text-rose-400">{stats.wrong}</span>
                </div>
                <span className="text-slate-700" aria-hidden="true">/</span>
                <div>
                  <span className="text-slate-400 block">Left</span>
                  <span className="text-base font-semibold text-white">{stats.remaining}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exam Category Filter Bar (Interactive Segmented Controls) */}
        <section id="exam-categories" className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <BookOpen className="w-3.5 h-3.5 text-slate-700" />
              <span className="font-semibold text-slate-900">
                Filter by Exam Appeared (Strict Ascending Question Order Preserved)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-mono">
              {/* Target Time Per Question Selector */}
              <div className="flex items-center gap-1.5">
                <span>Target/Q:</span>
                <select
                  value={targetPerQuestionSec}
                  onChange={(e) => setTargetPerQuestionSec(Number(e.target.value))}
                  className="px-2 py-1 rounded border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none focus:border-slate-900"
                >
                  <option value={0}>No Limit</option>
                  <option value={30}>30s / Q</option>
                  <option value={45}>45s / Q</option>
                  <option value={60}>60s / Q</option>
                  <option value={90}>90s / Q</option>
                  <option value={120}>120s / Q</option>
                </select>
              </div>

              <span aria-hidden="true">·</span>

              <div className="flex items-center gap-1.5">
                <span>Auto-Next on Correct:</span>
                <button
                  type="button"
                  onClick={() =>
                    setAutoNextDelayMs((prev) => (prev === 650 ? 250 : prev === 250 ? 1200 : 650))
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 font-medium transition-colors whitespace-nowrap"
                >
                  <FastForward className="w-3 h-3 text-sky-600" />
                  <span>{autoNextDelayMs}ms</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/75 rounded-xl overflow-x-auto">
            <button
              type="button"
              onClick={() => {
                setSelectedExam('ALL');
                setCurrentQuestionId(1);
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 font-mono tabular-nums ${
                selectedExam === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              All Exams (1–548) [{categoryCounts.ALL}]
            </button>

            {EXAM_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedExam(cat);
                  const firstInCat = ALL_QUESTIONS.find((q) => q.examCategory === cat);
                  if (firstInCat) setCurrentQuestionId(firstInCat.id);
                }}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 font-mono tabular-nums ${
                  selectedExam === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {cat} [{categoryCounts[cat]}]
              </button>
            ))}
          </div>
        </section>

        {/* Two-Zone Sandbox Layout: Left = Cut Question & Interactive Options (68%), Right = Strict-Order Question Deck (32%) */}
        <section
          id="practice-stage"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        >
          {/* LEFT ZONE (8 cols): Cut Question Image + Interactive Options + Answer Key Verification */}
          <div className="lg:col-span-8 space-y-5">
            {/* Navigation & Per-Question Timer Bar above Question */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-xl border border-slate-200">
              {/* Unboxed Static Metadata with Middle-Dot Separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-mono tabular-nums">
                <span className="font-bold text-slate-950 text-sm">
                  Question #{activeQuestion.id} of 548
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-sky-700">
                  {activeQuestion.examCategory}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeQuestion.examYearTag}</span>
                {selectedExam !== 'ALL' && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Category Item {currentIndexInFiltered + 1} of {filteredQuestions.length}
                    </span>
                  </>
                )}
              </div>

              {/* Per-Question Start Timer + Prev / Jump / Next Controls */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Per-Question Timer Control Button */}
                <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 font-mono text-xs tabular-nums">
                  <span
                    className={`px-2.5 py-1 font-semibold ${
                      isOverTargetPace
                        ? 'text-amber-700'
                        : isTimerRunning
                        ? 'text-emerald-700'
                        : 'text-slate-700'
                    }`}
                  >
                    Q.{activeQuestion.id}: {formatDuration(currentQuestionSeconds)}
                    {isOverTargetPace ? ' ▲' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsTimerRunning((prev) => !prev)}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      isTimerRunning
                        ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isTimerRunning ? 'Pause' : 'Start Q Timer'}
                  </button>
                  <button
                    type="button"
                    onClick={handleStartCurrentQuestionTimer}
                    title="Restart timer for this question from 00:00"
                    className="px-2 py-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <form onSubmit={handleJumpSubmit} className="flex items-center">
                  <input
                    type="number"
                    min={1}
                    max={548}
                    value={jumpInput}
                    onChange={(e) => setJumpInput(e.target.value)}
                    placeholder="Go # (1-548)"
                    className="w-28 px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded-l-lg focus:outline-none focus:border-slate-900"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 text-xs font-medium bg-slate-100 border border-l-0 border-slate-200 rounded-r-lg hover:bg-slate-200 text-slate-800 whitespace-nowrap"
                  >
                    Go
                  </button>
                </form>

                <button
                  type="button"
                  onClick={goToPrevQuestion}
                  disabled={currentIndexInFiltered <= 0 && activeQuestion.id <= 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors whitespace-nowrap"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                <button
                  type="button"
                  onClick={goToNextQuestion}
                  disabled={
                    currentIndexInFiltered >= filteredQuestions.length - 1 &&
                    activeQuestion.id >= 548
                  }
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors whitespace-nowrap"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 1. CUT QUESTION IMAGE */}
            <CutQuestionImage
              question={activeQuestion}
              showOptionsInCut={showOptionsInCut}
              onToggleOptionsInCut={() => setShowOptionsInCut((v) => !v)}
              customCropUrl={customCrops[activeQuestion.id]}
              onSaveCustomCrop={handleSaveCustomCrop}
            />

            {/* 2. INTERACTIVE OPTIONS (A, B, C, D) */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-slate-900">
                  Select Your Answer Option (Keys: A, B, C, D or 1, 2, 3, 4)
                </h2>
                <span className="text-xs text-slate-500 font-mono tabular-nums">
                  Time on Q.{activeQuestion.id}: {formatDuration(currentQuestionSeconds)} · Total: {formatDuration(totalSeconds, true)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(['A', 'B', 'C', 'D'] as OptionKey[]).map((optKey) => {
                  const optValue = activeQuestion.options[optKey];
                  const isThisSelected = selectedOptionForActive === optKey;
                  const isThisCorrectOption = activeQuestion.answer === optKey;

                  // Determine visual state when answered
                  let buttonStyle =
                    'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300 text-slate-900';
                  let badgeStyle = 'bg-white border-slate-300 text-slate-700';
                  let statusLabel: React.ReactNode = null;

                  if (isAnswered) {
                    if (isThisSelected && isSelectedCorrect) {
                      buttonStyle =
                        'border-emerald-600 bg-emerald-50/90 text-emerald-950 ring-2 ring-emerald-500/20';
                      badgeStyle = 'bg-emerald-600 border-emerald-600 text-white';
                      statusLabel = (
                        <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-700 whitespace-nowrap">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>● CORRECT</span>
                        </span>
                      );
                    } else if (isThisSelected && !isSelectedCorrect) {
                      buttonStyle =
                        'border-rose-600 bg-rose-50/90 text-rose-950 ring-2 ring-rose-500/20';
                      badgeStyle = 'bg-rose-600 border-rose-600 text-white';
                      statusLabel = (
                        <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-rose-700 whitespace-nowrap">
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>▲ WRONG</span>
                        </span>
                      );
                    } else if (!isSelectedCorrect && isThisCorrectOption) {
                      buttonStyle =
                        'border-emerald-600 bg-emerald-50/70 text-emerald-950';
                      badgeStyle = 'bg-emerald-600 border-emerald-600 text-white';
                      statusLabel = (
                        <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-700 whitespace-nowrap">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>● ANSWER KEY</span>
                        </span>
                      );
                    } else {
                      buttonStyle = 'border-slate-200 bg-white text-slate-500 opacity-75';
                    }
                  }

                  return (
                    <button
                      key={optKey}
                      type="button"
                      onClick={() => handleSelectOption(optKey)}
                      className={`group flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border text-left transition-all cursor-pointer ${buttonStyle}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-8 h-8 rounded-lg border font-mono text-sm font-bold flex items-center justify-center shrink-0 transition-colors ${badgeStyle}`}
                        >
                          {optKey.toLowerCase()})
                        </span>
                        <span className="font-mono text-base font-semibold tracking-tight break-words">
                          {optValue}
                        </span>
                      </div>
                      {statusLabel}
                    </button>
                  );
                })}
              </div>

              {/* 3. FEEDBACK BANNER: Auto-next on Correct OR Reveal Answer Key from End of PDF on Wrong */}
              {isAnswered && (
                <div
                  className={`mt-4 rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-opacity ${
                    isSelectedCorrect
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50/90 border-rose-300 text-slate-900'
                  }`}
                >
                  {isSelectedCorrect ? (
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-emerald-950">
                          ● Correct Answer! Option ({activeQuestion.answer.toLowerCase()}) —{' '}
                          <span className="font-mono">{activeQuestion.options[activeQuestion.answer]}</span>
                        </p>
                        <p className="text-xs text-emerald-800 font-mono mt-0.5">
                          {isAutoAdvancing
                            ? 'Advancing automatically to the next question in sequence...'
                            : `Verified against End-of-Sheet Answer Key (PDF Page ${answerKeySourcePage}: ${activeQuestion.id}. ${activeQuestion.rawAnswerKey}) · Solved in ${formatDuration(currentQuestionSeconds)}`}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-rose-800 text-xs font-mono font-semibold">
                        <XCircle className="w-4 h-4 shrink-0 text-rose-600" />
                        <span>
                          ▲ Your Selection ({selectedOptionForActive.toLowerCase()}:{' '}
                          {activeQuestion.options[selectedOptionForActive]}) is Incorrect.
                        </span>
                      </div>
                      <div className="text-sm font-bold text-slate-950 flex flex-wrap items-center gap-2 pt-0.5">
                        <span>
                          Correct Answer (Picked from End of PDF Answer Key · Page {answerKeySourcePage}):
                        </span>
                        <span className="font-mono text-emerald-800 underline decoration-emerald-500 decoration-2 underline-offset-4">
                          {activeQuestion.id}. {activeQuestion.answer} —{' '}
                          {activeQuestion.options[activeQuestion.answer]}
                        </span>
                        {activeQuestion.rawAnswerKey === '*' && (
                          <span className="text-xs font-mono text-amber-800">
                            (Marked * in PDF key; mathematically Option {activeQuestion.answer})
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={goToNextQuestion}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Next Question (#{Math.min(548, activeQuestion.id + 1)})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT ZONE (4 cols): Strict-Order Question Navigator & Exam Breakdown */}
          <aside
            id="question-matrix"
            className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Strict-Order Question Index
                </h2>
                <p className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                  Showing {filteredQuestions.length} of 548 questions in exact order
                </p>
              </div>
              <span className="text-xs font-mono text-slate-600 tabular-nums">
                Total: {formatDuration(totalSeconds, true)}
              </span>
            </div>

            {/* Search & Status Filter */}
            <div className="space-y-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search question #, formula, or Hindi text..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
                {(['ALL', 'UNATTEMPTED', 'CORRECT', 'WRONG'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`py-1.5 px-2 rounded-md transition-colors whitespace-nowrap truncate ${
                      statusFilter === st
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st === 'ALL'
                      ? 'All'
                      : st === 'UNATTEMPTED'
                      ? 'Unseen'
                      : st === 'CORRECT'
                      ? 'Correct'
                      : 'Wrong'}
                  </button>
                ))}
              </div>
            </div>

            {/* Numbered Grid (Strictly 1..548 in order) */}
            <div className="max-h-[420px] overflow-y-auto pr-1 grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-6 gap-1.5 font-mono text-xs tabular-nums">
              {filteredQuestions.map((q) => {
                const resp = userResponses[q.id];
                const qSec = questionTimes[q.id];
                const isCurr = q.id === activeQuestion.id;
                let cellClass =
                  'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100';

                if (resp !== undefined) {
                  if (resp === q.answer) {
                    cellClass =
                      'border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold';
                  } else {
                    cellClass =
                      'border-rose-400 bg-rose-50 text-rose-900 font-semibold';
                  }
                }
                if (isCurr) {
                  cellClass =
                    'border-slate-900 bg-slate-900 text-white font-bold ring-2 ring-slate-900/20';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      if (autoNextTimerRef.current) {
                        window.clearTimeout(autoNextTimerRef.current);
                      }
                      setIsAutoAdvancing(false);
                      setCurrentQuestionId(q.id);
                    }}
                    title={`Q.${q.id} (${q.examYearTag})${qSec ? ` · Time: ${formatDuration(qSec)}` : ''}`}
                    className={`py-2 rounded-lg border text-center transition-colors cursor-pointer ${cellClass}`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>

            {/* Current Question List Preview with Per-Question Time */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Upcoming in Sequence</span>
                <span className="font-mono">Time / Status</span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {filteredQuestions
                  .slice(
                    Math.max(0, currentIndexInFiltered),
                    Math.max(0, currentIndexInFiltered) + 5
                  )
                  .map((q) => {
                    const resp = userResponses[q.id];
                    const qTime = questionTimes[q.id] || 0;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentQuestionId(q.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-colors flex items-center justify-between gap-2 ${
                          q.id === activeQuestion.id
                            ? 'border-slate-900 bg-slate-900/5 font-semibold text-slate-900'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="truncate">
                          <span className="font-mono font-bold mr-1.5">{q.id}.</span>
                          {q.en}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500 shrink-0">
                          {qTime > 0 ? `${formatDuration(qTime)} · ` : ''}
                          {resp ? (resp === q.answer ? `✓ ${q.answer}` : `✗ Ans:${q.answer}`) : `Pg.${q.page}`}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </aside>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>
            Algebra Complete 548 PYQ Bank (Q.1 – Q.548) · Strict Sequential Order · Categorized by Exam Appeared
          </span>
          <button
            type="button"
            onClick={() => setIsAnswerKeyOpen(true)}
            className="text-slate-700 hover:text-slate-950 underline underline-offset-2 font-mono"
          >
            View End-of-PDF Official Answer Key Table (Pages 47–49)
          </button>
        </div>
      </footer>

      {/* Complete End-of-Book Answer Key Modal */}
      <AnswerKeyModal
        isOpen={isAnswerKeyOpen}
        onClose={() => setIsAnswerKeyOpen(false)}
        userResponses={userResponses}
        onSelectQuestion={(qId) => setCurrentQuestionId(qId)}
      />
    </div>
  );
}
