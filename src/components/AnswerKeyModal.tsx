import React, { useState } from 'react';
import { X, Search, CheckCircle2, XCircle } from 'lucide-react';
import { ALL_QUESTIONS, OptionKey } from '../data';

interface AnswerKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  userResponses: Record<number, OptionKey>;
  onSelectQuestion: (qId: number) => void;
}

export const AnswerKeyModal: React.FC<AnswerKeyModalProps> = ({
  isOpen,
  onClose,
  userResponses,
  onSelectQuestion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageFilter, setPageFilter] = useState<'ALL' | '47' | '48' | '49'>('ALL');

  if (!isOpen) return null;

  const filtered = ALL_QUESTIONS.filter((q) => {
    if (pageFilter === '47' && q.id > 70) return false;
    if (pageFilter === '48' && (q.id <= 70 || q.id > 400)) return false;
    if (pageFilter === '49' && q.id <= 400) return false;

    if (!searchQuery.trim()) return true;
    const s = searchQuery.trim().toLowerCase();
    return (
      String(q.id).includes(s) ||
      q.en.toLowerCase().includes(s) ||
      q.examYearTag.toLowerCase().includes(s)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl max-w-5xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Official End-of-Sheet Answer Key (Q.1 – Q.548)
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Picked directly from Pages 47, 48 & 49 at the end of the Algebra PDF. Click any cell to jump to that question.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
            aria-label="Close Answer Key"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(['ALL', '47', '48', '49'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setPageFilter(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  pageFilter === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'ALL'
                  ? 'All 548 Answers'
                  : tab === '47'
                  ? 'PDF Page 47 (Q.1–70)'
                  : tab === '48'
                  ? 'PDF Page 48 (Q.71–400)'
                  : 'PDF Page 49 (Q.401–548)'}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find question # (1–548)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900"
            />
          </div>
        </div>

        {/* Grid of 5-column Answer Key Table (matching the 5-column layout on PDF Pages 47-49) */}
        <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-5 gap-2.5 font-mono text-xs tabular-nums">
          {filtered.map((q) => {
            const userAns = userResponses[q.id];
            const isAttempted = Boolean(userAns);
            const isCorrect = userAns === q.answer;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  onSelectQuestion(q.id);
                  onClose();
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border text-left transition-colors ${
                  !isAttempted
                    ? 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-800'
                    : isCorrect
                    ? 'border-emerald-300 bg-emerald-50/70 text-emerald-950 hover:bg-emerald-100/80'
                    : 'border-rose-300 bg-rose-50/70 text-rose-950 hover:bg-rose-100/80'
                }`}
              >
                <span className="font-semibold">
                  {q.id}. <span className="text-sky-700 font-bold">{q.rawAnswerKey}</span>
                  {q.rawAnswerKey !== q.answer ? ` (${q.answer})` : ''}
                </span>
                {isAttempted && (
                  <span>
                    {isCorrect ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
