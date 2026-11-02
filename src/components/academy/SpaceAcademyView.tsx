// ============================================================
// SPACE EXPLORER — SPACE ACADEMY & 4-OPTION INTERACTIVE QUIZ
// ============================================================

import React, { useState } from 'react';
import { ACADEMY_LESSONS } from '@/data/academyData';
import { SpaceAcademyLesson, QuizQuestion } from '@/types/cosmos';
import { AuthManager } from '@/systems/auth/AuthManager';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const SpaceAcademyView: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<SpaceAcademyLesson>(ACADEMY_LESSONS[0]);
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const auth = AuthManager.getInstance();
  const student = auth.getCurrentStudent();

  const quiz = selectedLesson.quiz;
  const currentQuestion: QuizQuestion | undefined = quiz?.questions[currentQuestionIdx];

  const handleStartQuiz = () => {
    setIsTakingQuiz(true);
    setCurrentQuestionIdx(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  const handleSelectOption = (optionId: string) => {
    if (!isAnswerSubmitted) {
      setSelectedOptionId(optionId);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || !currentQuestion) return;
    setIsAnswerSubmitted(true);

    if (selectedOptionId === currentQuestion.correctOptionId) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!quiz) return;
    if (currentQuestionIdx + 1 < quiz.questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz finished
      const total = quiz.questions.length;
      const finalScore = selectedOptionId === currentQuestion?.correctOptionId ? score : score; // already incremented
      const accuracy = Math.round((finalScore / total) * 100);

      setIsQuizCompleted(true);

      // Save to student profile
      auth.recordLessonCompleted(selectedLesson.id);
      auth.recordQuizAttempt({
        quizId: quiz.id,
        quizTitle: quiz.title,
        date: new Date().toISOString().split('T')[0],
        score: finalScore,
        totalQuestions: total,
        accuracyPercentage: accuracy
      });

      if (accuracy === 100) {
        try {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col font-sans text-cosmos-text p-6 overflow-hidden">
      {/* Top Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <span className="text-xs font-mono tracking-widest text-cosmos-cyan uppercase">ASTRONOMY CURRICULUM</span>
          <h2 className="text-2xl font-black text-white flex items-center space-x-2">
            <GraduationCap className="w-7 h-7 text-cosmos-blue" />
            <span>Space Academy</span>
          </h2>
        </div>

        {/* Student Academy Progress Chip */}
        <div className="flex items-center space-x-3 bg-cosmos-subdark/80 px-4 py-2 rounded-xl border border-cosmos-border text-xs font-mono">
          <div>
            <span className="text-cosmos-muted block text-[10px]">LESSONS COMPLETED</span>
            <span className="text-cosmos-cyan font-bold">
              {student?.completedLessons.length || 0} / {ACADEMY_LESSONS.length}
            </span>
          </div>
          <div className="w-px h-6 bg-cosmos-border" />
          <div>
            <span className="text-cosmos-muted block text-[10px]">QUIZZES TAKEN</span>
            <span className="text-cosmos-gold font-bold">{student?.quizHistory.length || 0}</span>
          </div>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Left Column: Lesson Directory */}
        <div className="lg:col-span-4 overflow-y-auto space-y-3 pr-2">
          {ACADEMY_LESSONS.map(lesson => {
            const isSelected = selectedLesson.id === lesson.id;
            const isCompleted = student?.completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  setSelectedLesson(lesson);
                  setIsTakingQuiz(false);
                }}
                className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cosmos-card border-cosmos-blue shadow-cosmos-glow'
                    : 'bg-cosmos-subdark/70 border-cosmos-border/60 hover:bg-cosmos-card/60'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cosmos-cyan">
                    {lesson.category}
                  </span>
                  {isCompleted && (
                    <span className="flex items-center space-x-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-white text-sm mb-2">{lesson.title}</h4>

                <div className="flex items-center justify-between text-xs font-mono text-cosmos-muted pt-2 border-t border-cosmos-border/40">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{lesson.durationMinutes} min</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    lesson.difficulty === 'Beginner' ? 'bg-emerald-950/60 text-emerald-300' :
                    lesson.difficulty === 'Intermediate' ? 'bg-amber-950/60 text-amber-300' :
                    'bg-purple-950/60 text-purple-300'
                  }`}>
                    {lesson.difficulty}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Lesson View OR Interactive Quiz */}
        <div className="lg:col-span-8 glass-panel rounded-2xl border border-cosmos-border p-6 flex flex-col overflow-y-auto shadow-2xl">
          {!isTakingQuiz ? (
            /* Lesson Reading Mode */
            <div className="space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-cosmos-border">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cosmos-cyan">
                    {selectedLesson.category} • {selectedLesson.difficulty}
                  </span>
                  <h3 className="text-2xl font-black text-white">{selectedLesson.title}</h3>
                </div>

                {selectedLesson.quiz && (
                  <button
                    onClick={handleStartQuiz}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cosmos-blue to-cosmos-violet hover:from-blue-600 hover:to-purple-600 text-white text-xs font-bold tracking-wide flex items-center space-x-2 transition shadow-cosmos-glow shrink-0"
                  >
                    <Award className="w-4 h-4" />
                    <span>START MODULE QUIZ</span>
                  </button>
                )}
              </div>

              {/* Objectives */}
              <div className="p-4 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 space-y-2">
                <h4 className="text-xs font-semibold text-cosmos-cyan uppercase tracking-wider">
                  LEARNING OBJECTIVES
                </h4>
                <div className="space-y-1.5">
                  {selectedLesson.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-cosmos-text">
                      <ChevronRight className="w-3.5 h-3.5 text-cosmos-blue shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Paragraphs */}
              <div className="space-y-4">
                {selectedLesson.content.map((p, idx) => (
                  <p key={idx} className="text-sm text-cosmos-text leading-relaxed font-sans">
                    {p}
                  </p>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="space-y-2.5 pt-4 border-t border-cosmos-border/50">
                <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>KEY SCIENTIFIC TAKEAWAYS</span>
                </h4>
                <div className="space-y-2">
                  {selectedLesson.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Start Quiz CTA */}
              {selectedLesson.quiz && (
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleStartQuiz}
                    className="px-6 py-2.5 rounded-xl bg-cosmos-blue hover:bg-blue-600 text-white text-xs font-bold transition shadow-cosmos-glow flex items-center space-x-2"
                  >
                    <span>TEST KNOWLEDGE WITH QUIZ</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : !isQuizCompleted && currentQuestion ? (
            /* Interactive 4-Option Multiple Choice Quiz */
            <div className="space-y-6">
              {/* Quiz Header & Progress Indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-cosmos-border">
                <div>
                  <span className="text-[10px] font-mono text-cosmos-cyan uppercase tracking-wider">
                    MODULE QUIZ • QUESTION {currentQuestionIdx + 1} OF {quiz?.questions.length}
                  </span>
                  <h3 className="text-lg font-bold text-white">{quiz?.title}</h3>
                </div>

                <button
                  onClick={() => setIsTakingQuiz(false)}
                  className="text-xs text-cosmos-muted hover:text-white transition"
                >
                  Exit Quiz
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-cosmos-subdark rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cosmos-blue to-cosmos-cyan transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx + 1) / (quiz?.questions.length || 1)) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="p-4 rounded-xl bg-cosmos-subdark/90 border border-cosmos-border/80">
                <h4 className="text-base font-semibold text-white leading-relaxed">
                  {currentQuestion.question}
                </h4>
              </div>

              {/* Four Multiple-Choice Options */}
              <div className="space-y-3">
                {currentQuestion.options.map(option => {
                  const isSelected = selectedOptionId === option.id;
                  const isCorrect = option.id === currentQuestion.correctOptionId;

                  let style = 'bg-cosmos-subdark/60 border-cosmos-border/70 hover:bg-cosmos-card/80 text-cosmos-text';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      style = 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200 shadow-sm';
                    } else if (isSelected && !isCorrect) {
                      style = 'bg-red-950/70 border-red-500/80 text-red-200';
                    } else {
                      style = 'bg-cosmos-subdark/40 border-cosmos-border/30 opacity-50';
                    }
                  } else if (isSelected) {
                    style = 'bg-cosmos-blue/20 border-cosmos-blue text-white shadow-cosmos-glow';
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between ${style}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-lg bg-cosmos-card/80 border border-cosmos-border font-mono text-[11px] font-bold flex items-center justify-center shrink-0 uppercase">
                          {option.id}
                        </span>
                        <span>{option.text}</span>
                      </div>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Scientific Feedback & Explanation */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-cosmos-card border border-cosmos-border space-y-2 animate-fadeIn">
                  <div className="flex items-center space-x-2 text-xs font-semibold">
                    {selectedOptionId === currentQuestion.correctOptionId ? (
                      <span className="text-emerald-400 flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Correct! Outstanding astrophysics intuition.</span>
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center space-x-1">
                        <XCircle className="w-4 h-4" />
                        <span>Incorrect. Examine the scientific explanation below:</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-cosmos-muted leading-relaxed font-sans">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons: Submit / Next */}
              <div className="flex justify-end pt-2">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOptionId}
                    className="px-6 py-2.5 rounded-xl bg-cosmos-blue hover:bg-blue-600 disabled:opacity-40 text-white text-xs font-bold transition shadow-cosmos-glow"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cosmos-blue to-cosmos-cyan hover:opacity-90 text-white text-xs font-bold transition shadow-cosmos-glow flex items-center space-x-1.5"
                  >
                    <span>
                      {currentQuestionIdx + 1 < (quiz?.questions.length || 0) ? 'Next Question' : 'View Final Score'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completion Results Screen */
            <div className="text-center py-8 space-y-6 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cosmos-blue to-cosmos-violet flex items-center justify-center mx-auto shadow-cosmos-glow">
                <Award className="w-10 h-10 text-white" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cosmos-cyan">
                  ASSESSMENT COMPLETED
                </span>
                <h3 className="text-2xl font-black text-white mt-1">{quiz?.title}</h3>
                <p className="text-xs text-cosmos-muted mt-1">
                  Results successfully saved to student record: <strong className="text-white">{student?.name}</strong>
                </p>
              </div>

              {/* Score Metric Card */}
              <div className="p-6 rounded-2xl bg-cosmos-subdark/90 border border-cosmos-border grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-cosmos-muted block font-mono">FINAL SCORE</span>
                  <span className="text-3xl font-black text-white font-mono">
                    {score} / {quiz?.questions.length}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-cosmos-muted block font-mono">ACCURACY</span>
                  <span className={`text-3xl font-black font-mono ${
                    Math.round((score / (quiz?.questions.length || 1)) * 100) >= 80 ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {Math.round((score / (quiz?.questions.length || 1)) * 100)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={handleStartQuiz}
                  className="px-4 py-2.5 rounded-xl border border-cosmos-border bg-cosmos-card hover:bg-cosmos-subdark text-white text-xs font-semibold flex items-center space-x-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
                <button
                  onClick={() => setIsTakingQuiz(false)}
                  className="px-5 py-2.5 rounded-xl bg-cosmos-blue hover:bg-blue-600 text-white text-xs font-semibold transition shadow-cosmos-glow"
                >
                  Return to Lessons
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
