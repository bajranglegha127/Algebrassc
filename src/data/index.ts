import {
  EXAM_CATEGORIES,
  ExamCategory,
  getExamMetadata,
  getTopicTag,
  OFFICIAL_ANSWER_KEY,
  OptionKey,
  QuestionItem,
  resolveOptionKey,
} from './answerKey';
import { QUESTIONS_PART_1, RawQuestion } from './questionsPart1';
import { QUESTIONS_PART_2 } from './questionsPart2';
import { QUESTIONS_PART_3 } from './questionsPart3';
import { QUESTIONS_PART_4 } from './questionsPart4';

const ALL_RAW: RawQuestion[] = [
  ...QUESTIONS_PART_1,
  ...QUESTIONS_PART_2,
  ...QUESTIONS_PART_3,
  ...QUESTIONS_PART_4,
].sort((a, b) => a.id - b.id);

export const ALL_QUESTIONS: QuestionItem[] = ALL_RAW.map((q) => {
  const examMeta = getExamMetadata(q.id);
  const answer = resolveOptionKey(q.id);
  const rawKey = OFFICIAL_ANSWER_KEY[q.id] ?? answer;

  return {
    id: q.id,
    page: q.page,
    col: q.col,
    en: q.en,
    hi: q.hi,
    options: {
      A: q.options[0],
      B: q.options[1],
      C: q.options[2],
      D: q.options[3],
    },
    answer,
    rawAnswerKey: rawKey,
    examCategory: examMeta.category,
    examYearTag: examMeta.yearTag,
    topicTag: getTopicTag(q.id),
  };
});

export { EXAM_CATEGORIES, OFFICIAL_ANSWER_KEY };
export type { ExamCategory, OptionKey, QuestionItem };
