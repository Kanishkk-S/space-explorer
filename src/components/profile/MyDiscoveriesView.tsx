// ============================================================
// SPACE EXPLORER — MY DISCOVERIES & STUDENT PROGRESS
// ============================================================

import React, { useState } from 'react';
import { AuthManager } from '@/systems/auth/AuthManager';
import { ALL_CELESTIAL_OBJECTS } from '@/data/celestialData';
import { CelestialCategory, CelestialObject } from '@/types/cosmos';
import { 
  Bookmark, 
  Trash2, 
  Search, 
  Award, 
  BookOpen, 
  Compass, 
  ExternalLink
} from 'lucide-react';

interface MyDiscoveriesViewProps {
  onNavigateToObject?: (objectId: string, category: CelestialCategory) => void;
}

export const MyDiscoveriesView: React.FC<MyDiscoveriesViewProps> = ({ onNavigateToObject }) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history' | 'achievements' | 'quizzes'>('bookmarks');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<CelestialCategory | 'all'>('all');

  const auth = AuthManager.getInstance();
  const student = auth.getCurrentStudent();

  const bookmarkedObjects: CelestialObject[] = (student?.bookmarks || [])
    .map(id => ALL_CELESTIAL_OBJECTS.find(o => o.id === id))
    .filter((o): o is CelestialObject => Boolean(o));

  const exploredObjects: CelestialObject[] = (student?.exploredObjects || [])
    .map(id => ALL_CELESTIAL_OBJECTS.find(o => o.id === id))
    .filter((o): o is CelestialObject => Boolean(o));

  const filteredBookmarks = bookmarkedObjects.filter(obj => {
    const matchesSearch = obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          obj.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || obj.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRemoveBookmark = (id: string) => {
    auth.toggleBookmark(id);
  };

  return (
    <div className="w-full h-full flex flex-col font-sans text-cosmos-text p-6 overflow-hidden">
      {/* Header and Student Summary Ribbon */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <span className="text-xs font-mono tracking-widest text-cosmos-cyan uppercase">STUDENT ARCHIVE</span>
          <h2 className="text-2xl font-black text-white">My Discoveries & Portfolio</h2>
          <p className="text-xs text-cosmos-muted mt-0.5">
            Archived record for <strong className="text-white">{student?.name}</strong> • {student?.role}
          </p>
        </div>

        {/* Quick Tabs */}
        <div className="flex items-center space-x-1.5 bg-cosmos-subdark/80 p-1 rounded-xl border border-cosmos-border">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 ${
              activeTab === 'bookmarks' ? 'bg-cosmos-blue text-white shadow-cosmos-glow' : 'text-cosmos-muted hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Bookmarks ({student?.bookmarks.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 ${
              activeTab === 'history' ? 'bg-cosmos-blue text-white shadow-cosmos-glow' : 'text-cosmos-muted hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explored ({student?.exploredObjects.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 ${
              activeTab === 'achievements' ? 'bg-cosmos-blue text-white shadow-cosmos-glow' : 'text-cosmos-muted hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Achievements ({student?.achievements.filter(a => a.isUnlocked).length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 ${
              activeTab === 'quizzes' ? 'bg-cosmos-blue text-white shadow-cosmos-glow' : 'text-cosmos-muted hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Quiz History ({student?.quizHistory.length || 0})</span>
          </button>
        </div>
      </div>

      {/* Main Tab Panels */}
      <div className="flex-1 glass-panel rounded-2xl border border-cosmos-border p-6 overflow-hidden flex flex-col shadow-2xl">
        {/* Bookmarks Tab */}
        {activeTab === 'bookmarks' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search & Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 shrink-0">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-cosmos-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search bookmarked celestial objects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-cosmos-subdark border border-cosmos-border rounded-xl text-xs text-white placeholder-cosmos-muted focus:outline-none focus:border-cosmos-blue"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
                {(['all', 'planet', 'moon', 'star', 'galaxy', 'nebula', 'phenomenon'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono capitalize transition ${
                      filterCategory === cat
                        ? 'bg-cosmos-blue/30 text-cosmos-cyan border border-cosmos-blue/50'
                        : 'text-cosmos-muted hover:text-white bg-cosmos-subdark'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookmarks Grid */}
            <div className="flex-1 overflow-y-auto pr-2">
              {filteredBookmarks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBookmarks.map(obj => (
                    <div
                      key={obj.id}
                      className="p-4 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/70 hover:border-cosmos-border flex flex-col justify-between transition group"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: obj.color }} />
                            <h4 className="font-bold text-white text-sm">{obj.name}</h4>
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-cosmos-cyan">
                            {obj.category}
                          </span>
                        </div>
                        <p className="text-xs text-cosmos-muted line-clamp-2 leading-relaxed mb-3">
                          {obj.tagline}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-cosmos-border/40 text-xs">
                        {onNavigateToObject ? (
                          <button
                            onClick={() => onNavigateToObject(obj.id, obj.category)}
                            className="text-cosmos-blue hover:text-cosmos-cyan font-semibold flex items-center space-x-1 transition"
                          >
                            <span>Explore</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        ) : <div />}

                        <button
                          onClick={() => handleRemoveBookmark(obj.id)}
                          className="text-cosmos-muted hover:text-red-400 p-1 transition"
                          title="Remove Bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-cosmos-muted">
                  <Bookmark className="w-12 h-12 text-cosmos-border mb-3" />
                  <h4 className="font-semibold text-white text-sm">No Saved Bookmarks Yet</h4>
                  <p className="text-xs max-w-sm mt-1">
                    Explore the 3D Solar System, Moons, or Deep Space and click "Bookmark Object" to build your custom exhibition portfolio.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Explored History Tab */}
        {activeTab === 'history' && (
          <div className="flex-1 overflow-y-auto pr-2">
            <h4 className="text-xs font-semibold text-cosmos-cyan tracking-wider uppercase mb-3">
              JOURNEY CHRONOLOGY ({exploredObjects.length} CELESTIAL OBJECTS VISITED)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {exploredObjects.map(obj => (
                <div key={obj.id} className="p-3.5 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: obj.color }} />
                  <div>
                    <h5 className="font-bold text-white text-xs">{obj.name}</h5>
                    <span className="text-[10px] font-mono text-cosmos-muted uppercase">{obj.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(student?.achievements || []).map(ach => (
                <div
                  key={ach.id}
                  className={`p-4 rounded-xl border flex items-start space-x-3.5 transition ${
                    ach.isUnlocked
                      ? 'bg-cosmos-subdark/90 border-amber-500/40 text-white shadow-sm'
                      : 'bg-cosmos-subdark/30 border-cosmos-border/30 opacity-40 text-cosmos-muted'
                  }`}
                >
                  <div className={`p-3 rounded-xl shrink-0 ${ach.isUnlocked ? 'bg-amber-500/20 text-amber-400' : 'bg-cosmos-card text-cosmos-muted'}`}>
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-sm text-white">{ach.title}</h4>
                      {ach.isUnlocked && (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
                          UNLOCKED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-cosmos-muted mt-1 leading-normal">{ach.description}</p>
                    {ach.unlockedAt && (
                      <span className="text-[10px] font-mono text-cosmos-cyan/80 block mt-2">
                        Earned: {ach.unlockedAt.split('T')[0]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz History Tab */}
        {activeTab === 'quizzes' && (
          <div className="flex-1 overflow-y-auto pr-2">
            {(student?.quizHistory || []).length > 0 ? (
              <div className="space-y-3">
                {student?.quizHistory.map((q, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-white text-sm">{q.quizTitle}</h5>
                      <span className="text-xs font-mono text-cosmos-muted">Date: {q.date}</span>
                    </div>

                    <div className="flex items-center space-x-4 font-mono">
                      <div>
                        <span className="text-[10px] text-cosmos-muted block">SCORE</span>
                        <span className="text-sm font-bold text-white">{q.score} / {q.totalQuestions}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-cosmos-muted block">ACCURACY</span>
                        <span className={`text-base font-bold ${q.accuracyPercentage >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {q.accuracyPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-cosmos-muted">
                <BookOpen className="w-12 h-12 text-cosmos-border mb-3" />
                <h4 className="font-semibold text-white text-sm">No Quiz Records Yet</h4>
                <p className="text-xs max-w-sm mt-1">
                  Visit the Space Academy and test your knowledge to earn certificates and quiz accuracy records.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
