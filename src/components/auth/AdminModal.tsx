// ============================================================
// SPACE EXPLORER — ADMIN PORTAL MODAL (PROTECTED INSTRUCTOR VIEW)
// ============================================================

import React, { useState } from 'react';
import { AuthManager } from '@/systems/auth/AuthManager';
import { ShieldCheck, UserPlus, Trash2, X, AlertCircle, CheckCircle, Award, BookOpen } from 'lucide-react';
import { StudentProfile } from '@/types/cosmos';

interface AdminModalProps {
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ onClose }) => {
  const auth = AuthManager.getInstance();
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [students, setStudents] = useState<StudentProfile[]>(auth.getAllStudents());
  
  // Registration form state
  const [newName, setNewName] = useState('');
  const [newUid, setNewUid] = useState('');
  const [newRole, setNewRole] = useState('Astrophysics Cadet');
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default exhibition passcode for college staff
    if (pin === 'cosmos2026' || pin === 'admin') {
      setIsAuthenticated(true);
      setFeedback(null);
    } else {
      setFeedback({ type: 'error', message: 'Incorrect administrator passcode.' });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const res = auth.registerStudent({
      name: newName,
      rfidUid: newUid,
      role: newRole
    });

    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      setNewName('');
      setNewUid('');
      setStudents(auth.getAllStudents());
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  const handleDelete = (uid: string) => {
    if (confirm(`Remove student with card UID ${uid}?`)) {
      auth.deleteStudent(uid);
      setStudents(auth.getAllStudents());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-cosmos-subdark border border-cosmos-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cosmos-border bg-cosmos-card/80">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-cosmos-blue" />
            <h3 className="font-semibold text-white tracking-wide">Administrator & Instructor Portal</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-cosmos-muted hover:text-white hover:bg-cosmos-subdark transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!isAuthenticated ? (
            <form onSubmit={handlePinSubmit} className="max-w-sm mx-auto text-center space-y-4 py-8">
              <ShieldCheck className="w-12 h-12 text-cosmos-blue mx-auto" />
              <div>
                <h4 className="text-lg font-bold text-white">Exhibition Admin Login</h4>
                <p className="text-xs text-cosmos-muted mt-1">Enter instructor passcode to manage student cards and view records.</p>
              </div>

              {feedback && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedback.message}</span>
                </div>
              )}

              <input
                type="password"
                placeholder="Passcode (default: cosmos2026)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-2.5 bg-cosmos-card border border-cosmos-border rounded-xl text-sm text-center text-white focus:outline-none focus:border-cosmos-blue font-mono"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cosmos-blue hover:bg-blue-600 text-white text-xs font-semibold transition"
              >
                Authenticate
              </button>
            </form>
          ) : (
            <>
              {/* Feedback Alert */}
              {feedback && (
                <div className={`p-3 rounded-xl border text-xs flex items-center space-x-2 ${
                  feedback.type === 'success' 
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200' 
                    : 'bg-red-950/60 border-red-500/40 text-red-200'
                }`}>
                  {feedback.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* Student Registration Form */}
              <div className="bg-cosmos-card p-4 rounded-xl border border-cosmos-border space-y-3">
                <h4 className="text-xs font-semibold text-white tracking-wider flex items-center space-x-2">
                  <UserPlus className="w-4 h-4 text-cosmos-cyan" />
                  <span>REGISTER NEW STUDENT / RFID CARD</span>
                </h4>

                <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Student Full Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="px-3 py-2 bg-cosmos-subdark border border-cosmos-border rounded-lg text-xs text-white placeholder-cosmos-muted focus:outline-none focus:border-cosmos-blue"
                  />
                  <input
                    type="text"
                    placeholder="RFID Card UID (e.g. A1 B2 C3 D4)"
                    value={newUid}
                    onChange={(e) => setNewUid(e.target.value)}
                    required
                    className="px-3 py-2 bg-cosmos-subdark border border-cosmos-border rounded-lg text-xs text-white placeholder-cosmos-muted font-mono focus:outline-none focus:border-cosmos-blue"
                  />
                  <input
                    type="text"
                    placeholder="Role (e.g. Cadet, Researcher)"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="px-3 py-2 bg-cosmos-subdark border border-cosmos-border rounded-lg text-xs text-white placeholder-cosmos-muted focus:outline-none focus:border-cosmos-blue"
                  />
                  <div className="md:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-cosmos-blue hover:bg-blue-600 text-white text-xs font-semibold transition flex items-center space-x-1.5"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Register Card</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Registered Students Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-white tracking-wider">
                    REGISTERED PROFILES ({students.length})
                  </h4>
                  <span className="text-[11px] text-cosmos-muted">Isolated data per student</span>
                </div>

                <div className="border border-cosmos-border rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-cosmos-card text-cosmos-muted font-mono text-[11px] border-b border-cosmos-border">
                      <tr>
                        <th className="py-2.5 px-3">Student</th>
                        <th className="py-2.5 px-3">RFID UID</th>
                        <th className="py-2.5 px-3">Role</th>
                        <th className="py-2.5 px-3">Progress</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cosmos-border/40 font-mono">
                      {students.map((st) => (
                        <tr key={st.id} className="hover:bg-cosmos-card/40 transition">
                          <td className="py-2.5 px-3 font-sans font-medium text-white">{st.name}</td>
                          <td className="py-2.5 px-3 text-cosmos-blue">{st.rfidUid}</td>
                          <td className="py-2.5 px-3 font-sans text-cosmos-muted">{st.role}</td>
                          <td className="py-2.5 px-3 font-sans text-xs">
                            <span className="inline-flex items-center space-x-1 text-cosmos-cyan mr-2">
                              <BookOpen className="w-3 h-3" />
                              <span>{st.completedLessons.length}</span>
                            </span>
                            <span className="inline-flex items-center space-x-1 text-cosmos-gold">
                              <Award className="w-3 h-3" />
                              <span>{st.achievements.filter(a => a.isUnlocked).length}</span>
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => handleDelete(st.rfidUid)}
                              className="text-red-400 hover:text-red-300 p-1 transition"
                              title="Delete Student"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
