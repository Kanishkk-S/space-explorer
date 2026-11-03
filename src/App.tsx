// ============================================================
// SPACE EXPLORER — COSMOS 3D EXPERIENCE MAIN APPLICATION
// ============================================================

import React, { useState, useEffect } from 'react';
import { AuthManager } from '@/systems/auth/AuthManager';
import { CosmosControllerManager } from '@/systems/controller/CosmosControllerManager';
import { StudentProfile, CelestialObject } from '@/types/cosmos';
import { RfidLoginScreen } from '@/components/auth/RfidLoginScreen';
import { PlanetariumNav, NavigationSection } from '@/components/layout/PlanetariumNav';
import { CinematicOverview } from '@/components/cosmos/CinematicOverview';
import { SolarSystem3D } from '@/components/cosmos/SolarSystem3D';
import { PlanetExplorer } from '@/components/cosmos/PlanetExplorer';
import { UniverseExplorerMap } from '@/components/cosmos/UniverseExplorerMap';
import { DeepSpaceView } from '@/components/cosmos/DeepSpaceView';
import { CosmicKnowledgeView } from '@/components/cosmos/CosmicKnowledgeView';
import { SpaceAcademyView } from '@/components/academy/SpaceAcademyView';
import { MyDiscoveriesView } from '@/components/profile/MyDiscoveriesView';
import { SettingsView } from '@/components/profile/SettingsView';

export const App: React.FC = () => {
  const auth = AuthManager.getInstance();
  const controller = CosmosControllerManager.getInstance();

  const [student, setStudent] = useState<StudentProfile | null>(auth.getCurrentStudent());
  const [currentSection, setCurrentSection] = useState<NavigationSection>('overview');
  const [selectedPlanetForExplorer, setSelectedPlanetForExplorer] = useState<string>('earth');
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

  // Sync ST7735 physical screen on section or planet changes
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

  const handleSelectObjectInUniverse = (obj: CelestialObject) => {
    if (obj.category === 'planet') {
      handleNavigateToExplorer(obj.id);
    }
  };

  const handleLogout = () => {
    auth.logout();
    setCurrentSection('overview');
  };

  // 1. Mandatory FIRST SCREEN: Cinematic RFID Authentication
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

  // 2. Main COSMOS 3D Planetarium Application Shell with Floating Nav
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#03050B] font-sans text-cosmos-white flex flex-col">
      {/* Floating Center HUD Navigation */}
      <PlanetariumNav
        currentSection={currentSection}
        onSelectSection={setCurrentSection}
        student={student}
        onLogout={handleLogout}
        controllerConnected={controllerConnected}
        onConnectHardware={handleConnectHardware}
      />

      {/* Main Viewport Stage */}
      <main className="flex-1 w-full h-full pt-20 overflow-y-auto">
        {currentSection === 'overview' && (
          <CinematicOverview
            onNavigate={setCurrentSection}
            onExplorePlanet={handleNavigateToExplorer}
            controllerConnected={controllerConnected}
          />
        )}

        {currentSection === 'solar_system' && (
          <SolarSystem3D
            onNavigateToExplorer={handleNavigateToExplorer}
            onSelectPlanet={setSelectedPlanetForExplorer}
            selectedPlanetId={selectedPlanetForExplorer}
          />
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

        {currentSection === 'universe_map' && (
          <UniverseExplorerMap
            onSelectObject={handleSelectObjectInUniverse}
            onExplorePlanetIn3D={handleNavigateToExplorer}
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
  );
};

export default App;
