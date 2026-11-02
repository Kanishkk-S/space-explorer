// ============================================================
// SPACE EXPLORER — COSMOS SIDEBAR NAVIGATION (DRIBBBLE-INSPIRED)
// ============================================================

import React from 'react';
import { 
  Orbit, 
  Compass, 
  Sparkles, 
  GraduationCap, 
  Bookmark, 
  Settings, 
  BookOpen, 
  Home, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  User
} from 'lucide-react';
import { StudentProfile } from '@/types/cosmos';

export type NavigationSection = 
  | 'overview'
  | 'solar_system'
  | 'planet_explorer'
  | 'deep_space'
  | 'knowledge'
  | 'academy'
  | 'discoveries'
  | 'settings';

interface CosmosSidebarProps {
  currentSection: NavigationSection;
  onSelectSection: (section: NavigationSection) => void;
  student: StudentProfile | null;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: NavigationSection;
  label: string;
  icon: any;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'solar_system', label: 'Solar System', icon: Orbit, badge: '3D' },
  { id: 'planet_explorer', label: 'Planet Explorer', icon: Compass },
  { id: 'deep_space', label: 'Deep Space', icon: Sparkles },
  { id: 'knowledge', label: 'Cosmic Knowledge', icon: BookOpen },
  { id: 'academy', label: 'Space Academy', icon: GraduationCap },
  { id: 'discoveries', label: 'My Discoveries', icon: Bookmark },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const CosmosSidebar: React.FC<CosmosSidebarProps> = ({
  currentSection,
  onSelectSection,
  student,
  onLogout,
  isCollapsed,
  onToggleCollapse
}) => {
  return (
    <aside
      className={`h-screen bg-cosmos-subdark/95 border-r border-cosmos-border/80 flex flex-col justify-between transition-all duration-300 z-30 shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Branding Header */}
      <div className="p-4 border-b border-cosmos-border/60 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cosmos-blue to-cosmos-violet flex items-center justify-center shadow-cosmos-glow shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="truncate">
              <h1 className="font-extrabold text-sm tracking-wider text-white truncate">SPACE EXPLORER</h1>
              <p className="text-[10px] font-mono text-cosmos-cyan tracking-widest truncate">COSMOS 3D</p>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cosmos-blue to-cosmos-violet flex items-center justify-center mx-auto shadow-cosmos-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className={`p-1.5 rounded-lg text-cosmos-muted hover:text-white hover:bg-cosmos-card transition ${
            isCollapsed ? 'hidden' : 'block'
          }`}
          title="Toggle Sidebar"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Center Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`w-full flex items-center rounded-xl font-medium text-xs transition relative group ${
                isCollapsed ? 'justify-center p-3' : 'px-3.5 py-3 space-x-3'
              } ${
                isActive
                  ? 'bg-gradient-to-r from-cosmos-blue/25 to-cosmos-violet/15 text-white border border-cosmos-blue/40 shadow-cosmos-glow'
                  : 'text-cosmos-muted hover:text-white hover:bg-cosmos-card/70'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? 'text-cosmos-cyan scale-110' : 'text-cosmos-muted group-hover:text-white'
                }`}
              />

              {!isCollapsed && (
                <span className="flex-1 text-left truncate tracking-wide">{item.label}</span>
              )}

              {!isCollapsed && item.badge && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-cosmos-cyan/20 text-cosmos-cyan border border-cosmos-cyan/40">
                  {item.badge}
                </span>
              )}

              {/* Active Indicator Glow Pip */}
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-cosmos-cyan rounded-r-full shadow-cyan-glow" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Expand Button when Collapsed */}
      {isCollapsed && (
        <div className="px-3 py-2 flex justify-center">
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-xl text-cosmos-muted hover:text-white hover:bg-cosmos-card transition"
            title="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Authenticated Student Profile Card & Logout */}
      <div className="p-3 border-t border-cosmos-border/60 bg-cosmos-card/40">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between space-x-2'}`}>
          <div className="flex items-center space-x-2.5 truncate">
            <div className="w-8 h-8 rounded-lg bg-cosmos-card border border-cosmos-border flex items-center justify-center text-cosmos-blue shrink-0">
              <User className="w-4 h-4" />
            </div>

            {!isCollapsed && (
              <div className="truncate text-left">
                <span className="block text-xs font-bold text-white truncate">{student?.name || 'Explorer'}</span>
                <span className="block text-[10px] font-mono text-cosmos-cyan truncate">
                  {student?.isDemo ? 'DEMO MODE' : student?.role || 'Cadet'}
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-cosmos-muted hover:text-red-400 hover:bg-red-950/40 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
