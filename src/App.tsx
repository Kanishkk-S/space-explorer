// ============================================================
// SPACE EXPLORER — COSMOS 3D EXPERIENCE MAIN APPLICATION
// ============================================================

import React, { useState, useEffect } from 'react';
import { AuthManager } from '@/systems/auth/AuthManager';
import { CosmosControllerManager } from '@/systems/controller/CosmosControllerManager';
import { StudentProfile } from '@/types/cosmos';
import { RfidLoginScreen } from '@/components/auth/RfidLoginScreen';
import { CosmosSidebar, NavigationSection } from '@/components/layout/CosmosSidebar';
import { OverviewDashboard } from '@/components/cosmos/OverviewDashboard';
import { SolarSystem3D } from '@/components/cosmos/SolarSystem3D';
import { PlanetExplorer } from '@/components/cosmos/PlanetExplorer';
import { DeepSpaceView } from '@/components/cosmos/DeepSpaceView';
import { CosmicKnowledgeView } from '@/components/cosmos/CosmicKnowledgeView';
import { SpaceAcademyView } from '@/components/academy/SpaceAcademyView';
import { MyDiscoveriesView } from '@/components/profile/MyDiscoveriesView';
import { SettingsView } from '@/components/profile/SettingsView';
import { Cpu, Award, Bookmark } from 'lucide-react';

export const App: React.FC = () => {
  const auth = AuthManager.getInstance();
  const controller = CosmosControllerManager.getInstance();

  const [student, setStudent] = useState<StudentProfile | null>(auth.getCurrentStudent());
  const [currentSection, setCurrentSection] = useState<NavigationSection>('overview');
  const [selectedPlanetForExplorer, setSelectedPlanetForExplorer] = useState<string>('earth');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [controllerConnected, setControllerConnected] = useState(controller.getIsConnected());
  const [lastScannedUid, setLastScannedUid] = useState<string | null>(null);

  // Subscribe to authentication changes
  useEffect(() => {
    const unsubscribe = auth.subscribe((current) => {
      setStudent(current ? { ...current } : null);
      if (current) {
        controller.sendTelemetryToESP32('auth_success', {
          name: current.name,
          role: current.role
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Hardware controller event listener
  useEffect(() => {
    const unsubscribe = controller.subscribe((event) => {
      if (event.type === 'connected') {
        setControllerConnected(true);
      } else if (event.type === 'disconnected') {
        setControllerConnected(false);
      } else if (event.type === 'rfid_scan' && event.payload?.uid) {
        setLastScannedUid(event.payload.uid);
      } else if (event.type === 'button_press' && event.payload?.button) {
        const btn = event.payload.button;
        if (btn === 'back') {
          // If in planet explorer, return to solar system
          if (currentSection === 'planet_explorer') {
            setCurrentSection('solar_system');
          } else {
            setCurrentSection('overview');
          }
        } else if (btn === 'select') {
          if (currentSection === 'solar_system') {
            setCurrentSection('planet_explorer');
          }
        }
      }
    });

    return () => unsubscribe();
  }, [currentSection]);

  // Sync ST7735 screen on section or planet changes
  useEffect(() => {
    if (student) {
      controller.sendTelemetryToESP32('display_update', {
        section: currentSection,
        planet: selectedPlanetForExplorer,
        student: student.name
      });
    }
  }, [currentSection, selectedPlanetForExplorer, student]);

  const handleConnectHardware = async () => {
    await controller.requestConnection();
  };

  const handleNavigateToExplorer = (planetId: string) => {
    setSelectedPlanetForExplorer(planetId);
    setCurrentSection('planet_explorer');
  };

  const handleLogout = () => {
    auth.logout();
    setCurrentSection('overview');
  };

  // 1. Mandatory FIRST SCREEN: RFID Authentication
  if (!student) {
    return (
      <RfidLoginScreen
        onLoginSuccess={() => setCurrentSection('overview')}
        controllerConnected={controllerConnected}
        onConnectHardware={handleConnectHardware}
        lastScannedUid={lastScannedUid}
      />
    );
  }

  // 2. Main COSMOS 3D Planetarium Application Shell
  return (
    <div className="flex w-screen h-screen overflow-hidden bg-cosmos-dark font-sans text-cosmos-text">
      {/* Sidebar Navigation */}
      <CosmosSidebar
        currentSection={currentSection}
        onSelectSection={setCurrentSection}
        student={student}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Stage */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gradient-to-b from-cosmos-dark via-cosmos-subdark/80 to-cosmos-dark">
        {/* Top Minimal Global App Header */}
        <header className="h-14 px-6 border-b border-cosmos-border/50 flex items-center justify-between shrink-0 bg-cosmos-subdark/40 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cosmos-cyan">
              {currentSection.replace('_', ' ')}
            </span>
            {student.isDemo && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300">
                DEMO MODE ACTIVE
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            {/* Quick stats pills */}
            <div className="hidden sm:flex items-center space-x-3">
              <span className="flex items-center space-x-1 text-cosmos-cyan">
                <Bookmark className="w-3.5 h-3.5" />
                <span>{student.bookmarks.length} Bookmarked</span>
              </span>
              <span className="flex items-center space-x-1 text-cosmos-gold">
                <Award className="w-3.5 h-3.5" />
                <span>{student.achievements.filter(a => a.isUnlocked).length} Unlocked</span>
              </span>
            </div>

            {/* Controller status indicator */}
            <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border text-[11px] ${
              controllerConnected 
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
                : 'bg-cosmos-subdark border-cosmos-border text-cosmos-muted'
            }`}>
              <Cpu className={`w-3 h-3 ${controllerConnected ? 'text-emerald-400' : 'text-cosmos-muted'}`} />
              <span>ESP32: {controllerConnected ? 'ONLINE' : 'DEMO/USB'}</span>
            </div>
          </div>
        </header>

        {/* Section Viewport */}
        <main className="flex-1 overflow-hidden relative">
          {currentSection === 'overview' && (
            <OverviewDashboard
              onNavigate={setCurrentSection}
              onExplorePlanet={handleNavigateToExplorer}
              controllerConnected={controllerConnected}
            />
          )}

          {currentSection === 'solar_system' && (
            <div className="w-full h-full p-6">
              <SolarSystem3D
                onNavigateToExplorer={handleNavigateToExplorer}
                onSelectPlanet={setSelectedPlanetForExplorer}
                selectedPlanetId={selectedPlanetForExplorer}
              />
            </div>
          )}

          {currentSection === 'planet_explorer' && (
            <PlanetExplorer
              initialPlanetId={selectedPlanetForExplorer}
              onBackToSolarSystem={() => setCurrentSection('solar_system')}
              onSelectCelestialObject={(id) => {
                if (['mercury','venus','earth','mars','jupiter','saturn','uranus','neptune'].includes(id)) {
                  setSelectedPlanetForExplorer(id);
                }
              }}
            />
          )}

          {currentSection === 'deep_space' && <DeepSpaceView />}

          {currentSection === 'knowledge' && <CosmicKnowledgeView />}

          {currentSection === 'academy' && <SpaceAcademyView />}

          {currentSection === 'discoveries' && (
            <MyDiscoveriesView
              onNavigateToObject={(id, cat) => {
                if (cat === 'planet') {
                  handleNavigateToExplorer(id);
                } else if (['star', 'galaxy', 'nebula', 'phenomenon'].includes(cat)) {
                  setCurrentSection('deep_space');
                }
              }}
            />
          )}

          {currentSection === 'settings' && (
            <SettingsView
              onLogout={handleLogout}
              controllerConnected={controllerConnected}
              onConnectHardware={handleConnectHardware}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
