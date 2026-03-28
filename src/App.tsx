/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Beaker, 
  Play, 
  Pause, 
  RotateCcw, 
  Eye, 
  Grid3X3, 
  History, 
  UserCircle, 
  FileText, 
  Lightbulb,
  ArrowRight,
  LayoutGrid,
  FlaskConical,
  Activity,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, ReactNode } from 'react';

export default function App() {
  const [activeStep, setActiveStep] = useState(1);
  const [activePerspective, setActivePerspective] = useState('micro');

  return (
    <div className="min-h-screen bg-black text-on-surface-variant font-sans selection:bg-primary/30">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
          <div className="text-2xl font-bold tracking-tight text-primary font-headline">
            Molecular Editorial
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {['Acid-Base', 'Redox', 'Precipitation'].map((item) => (
              <a key={item} href="#" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
                {item}
              </a>
            ))}
            <a href="#" className="text-primary font-bold border-b-2 border-primary pb-1 text-sm">
              Organic
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-all active:scale-95">
              <UserCircle className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="hidden lg:flex h-[calc(100vh-4rem)] sticky top-16 w-64 border-r border-white/5 flex-col py-8 gap-4 bg-[#0a0a0a]">
          <div className="px-6 mb-4">
            <h2 className="text-lg font-bold text-primary font-headline">Lab Console</h2>
            <p className="text-[10px] text-outline font-medium uppercase tracking-widest">v2.4 Precision Mode</p>
          </div>
          <nav className="flex flex-col gap-1 pr-4">
            <SidebarItem icon={<FlaskConical className="w-5 h-5" />} label="Library" />
            <SidebarItem icon={<Activity className="w-5 h-5" />} label="Simulations" active />
            <SidebarItem icon={<Grid3X3 className="w-5 h-5" />} label="Periodic Table" />
            <SidebarItem icon={<History className="w-5 h-5" />} label="History" />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 grid grid-cols-12 gap-6 p-6 max-w-screen-2xl mx-auto overflow-hidden">
          
          {/* Column 1: Control Zone */}
          <section className="col-span-12 md:col-span-3 flex flex-col gap-6">
            <div className="bg-surface-container-low rounded-xl p-5 border border-white/5 shadow-2xl">
              <h3 className="font-headline font-bold text-lg mb-4 text-primary tracking-tight">Control Zone</h3>
              <div className="space-y-6">
                {/* Playback Controls */}
                <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                  <ControlButton icon={<RotateCcw className="w-5 h-5" />} />
                  <button className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-on-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                    <Play className="w-8 h-8 fill-current" />
                  </button>
                  <ControlButton icon={<Pause className="w-5 h-5" />} />
                </div>

                {/* Speed Selection */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-3 px-1">Simulation Speed</p>
                  <div className="flex gap-2">
                    {['0.5x', '1.0x', '2.0x'].map((speed) => (
                      <button 
                        key={speed}
                        className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${
                          speed === '1.0x' ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface hover:bg-white/10'
                        }`}
                      >
                        {speed}
                      </button>
                    ))}
                  </div>
                </div>

                {/* View Toggles */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-3 px-1">Visual Perspective</p>
                  <div className="flex flex-col gap-2">
                    <PerspectiveButton 
                      icon={<Eye className="w-5 h-5" />} 
                      label="Macro Observation" 
                      active={activePerspective === 'macro'}
                      onClick={() => setActivePerspective('macro')}
                      color="text-secondary"
                    />
                    <PerspectiveButton 
                      icon={<LayoutGrid className="w-5 h-5" />} 
                      label="Micro Molecular" 
                      active={activePerspective === 'micro'}
                      onClick={() => setActivePerspective('micro')}
                      color="text-primary"
                    />
                    <PerspectiveButton 
                      icon={<FileText className="w-5 h-5" />} 
                      label="Symbolic Notation" 
                      active={activePerspective === 'symbolic'}
                      onClick={() => setActivePerspective('symbolic')}
                      color="text-tertiary"
                    />
                  </div>
                </div>

                {/* Step Control */}
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-3 px-1">Step Sequence</p>
                  <div className="space-y-3">
                    <StepItem number={1} label="Effective Collision" active={activeStep === 1} onClick={() => setActiveStep(1)} />
                    <StepItem number={2} label="Bond Dissociation" active={activeStep === 2} onClick={() => setActiveStep(2)} />
                    <StepItem number={3} label="Atom Reorganization" active={activeStep === 3} onClick={() => setActiveStep(3)} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Column 2: Animation Zone */}
          <section className="col-span-12 md:col-span-6 flex flex-col gap-6">
            <div className="flex-1 relative bg-surface-container-lowest rounded-2xl overflow-hidden border border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] flex items-center justify-center min-h-[500px]">
              {/* Background Visual Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#b4c5ff_1px,transparent_1px)] [background-size:32px_32px]"></div>
              
              {/* Main Animation Canvas */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Heat/Exothermic Glow */}
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-80 h-80 rounded-full bg-primary/20 blur-[100px]"
                />
                
                <div className="flex gap-16 items-center z-10 scale-110">
                  {/* Reactants */}
                  <div className="flex flex-col gap-10">
                    <div className="flex gap-2">
                      <Atom label="H" size="small" />
                      <Atom label="H" size="small" />
                    </div>
                    <div className="flex gap-2">
                      <Atom label="O" color="bg-red-900/60 border-red-500/50" />
                      <Atom label="O" color="bg-red-900/60 border-red-500/50" />
                    </div>
                  </div>
                  
                  {/* Reaction Arrow */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{ x: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-16 h-16 text-primary" />
                    </motion.div>
                    <span className="text-tertiary font-headline font-bold text-sm mt-2 tracking-[0.3em] bg-black/50 px-3 py-1 rounded-full border border-tertiary/20">
                      ΔH &lt; 0
                    </span>
                  </div>
                  
                  {/* Products */}
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)] flex items-center justify-center border-2 border-white/20 text-white font-black z-10 text-xl">O</div>
                    <div className="absolute top-2 right-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-black/10 text-black font-bold z-20">H</div>
                    <div className="absolute bottom-2 left-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-black/10 text-black font-bold z-20">H</div>
                  </div>
                </div>
              </div>

              {/* Overlay UI */}
              <div className="absolute top-8 left-8 glass-panel p-5 rounded-xl border border-white/10 shadow-2xl glow-primary">
                <div className="text-[10px] font-bold text-primary mb-1 tracking-widest uppercase">CURRENT REACTION</div>
                <div className="font-headline text-2xl font-bold tracking-tight text-white">Hydrogen Combustion</div>
              </div>
              
              <div className="absolute bottom-8 right-8">
                <div className="bg-black/60 px-4 py-2 rounded-full flex items-center gap-3 border border-white/10 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_#4ed8c9]"></span>
                  <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">REAL-TIME SIMULATION</span>
                </div>
              </div>
            </div>
          </section>

          {/* Column 3: Knowledge Zone */}
          <section className="col-span-12 md:col-span-3 flex flex-col gap-6">
            {/* Balanced Equation Card */}
            <div className="bg-surface-container-low rounded-xl p-6 border border-white/5 shadow-2xl">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-4 px-1">Balanced Equation</h4>
              <div className="font-headline text-3xl font-bold text-center text-white py-4 bg-black/40 rounded-xl border border-white/5 mb-4 glow-primary">
                2H<span className="formula-sub">2</span> + O<span className="formula-sub">2</span> → 2H<span className="formula-sub">2</span>O
              </div>
              <div className="flex flex-wrap gap-2">
                <Tag label="EXOTHERMIC" color="bg-red-900/30 text-red-300 border-red-500/20" />
                <Tag label="REDOX" color="bg-blue-900/30 text-blue-300 border-blue-500/20" />
                <Tag label="SYNTHESIS" color="bg-emerald-900/30 text-emerald-300 border-emerald-500/20" />
              </div>
            </div>

            {/* Process Details */}
            <div className="bg-surface-container-low rounded-xl p-6 border border-white/5 shadow-2xl flex-1 flex flex-col">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-6 px-1">Mechanism Details</h4>
              <div className="space-y-6 flex-1">
                <MechanismStep 
                  title="Dissociation" 
                  description="Input energy overcomes H-H (436 kJ) and O=O (495 kJ) bond enthalpies through effective collisions." 
                />
                <MechanismStep 
                  title="Active State" 
                  description="Brief existence of highly unstable activated complex before new bond formation." 
                />
                <MechanismStep 
                  title="Formation" 
                  description="New O-H bonds release 463 kJ/mol, resulting in a net exothermic reaction." 
                />
              </div>

              {/* Study Tips */}
              <div className="mt-8 bg-primary-container/20 text-primary border border-primary/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <h4 className="font-bold text-xs uppercase tracking-wider">Lab Notes</h4>
                </div>
                <ul className="space-y-3 text-[11px] leading-relaxed opacity-90">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Energy is absorbed during dissociation; released during formation.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    ΔH = Σ(Bond breaking) - Σ(Bond formation).
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FAB */}
      <div className="fixed bottom-10 right-10">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-on-primary flex items-center gap-4 px-8 py-4 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] glow-primary"
        >
          <FileText className="w-5 h-5" />
          <span className="font-bold tracking-tight">Generate Lab Report</span>
        </motion.button>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: ReactNode, label: string, active?: boolean }) {
  return (
    <a 
      href="#" 
      className={`flex items-center gap-3 px-6 py-3 transition-all ${
        active 
          ? 'bg-primary-container/30 text-primary border-r-4 border-primary font-medium' 
          : 'text-on-surface-variant hover:bg-white/5'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </a>
  );
}

function ControlButton({ icon }: { icon: ReactNode }) {
  return (
    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/20 transition-colors text-primary">
      {icon}
    </button>
  );
}

function PerspectiveButton({ icon, label, active, onClick, color }: { icon: ReactNode, label: string, active: boolean, onClick: () => void, color: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-lg border transition-all text-sm ${
        active 
          ? `bg-primary-container/20 border-primary/40 font-bold text-primary` 
          : `bg-surface-container-lowest border-white/5 font-medium hover:border-primary/40`
      }`}
    >
      <span className={active ? 'text-primary' : color}>{icon}</span>
      {label}
    </button>
  );
}

function StepItem({ number, label, active, onClick }: { number: number, label: string, active: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 group cursor-pointer transition-opacity ${active ? 'opacity-100' : 'opacity-50'}`}
    >
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
        active ? 'border-primary group-hover:bg-primary/20' : 'border-outline group-hover:border-primary'
      }`}>
        {active && <div className="w-2 h-2 rounded-full bg-primary"></div>}
      </div>
      <span className={`text-xs ${active ? 'font-bold text-on-surface' : 'font-medium text-on-surface-variant'}`}>
        {number}. {label}
      </span>
    </div>
  );
}

function Atom({ label, size = 'large', color = 'bg-surface-container-highest border-outline/30' }: { label: string, size?: 'small' | 'large', color?: string }) {
  const sizeClasses = size === 'small' ? 'w-10 h-10 text-xs' : 'w-14 h-14 text-base';
  return (
    <div className={`${sizeClasses} rounded-full ${color} shadow-xl flex items-center justify-center border text-on-surface font-bold`}>
      {label}
    </div>
  );
}

function Tag({ label, color }: { label: string, color: string }) {
  return (
    <span className={`px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider ${color}`}>
      {label}
    </span>
  );
}

function MechanismStep({ title, description }: { title: string, description: string }) {
  return (
    <div className="relative pl-6 border-l border-white/10">
      <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-primary glow-primary"></div>
      <h5 className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">{title}</h5>
      <p className="text-xs text-on-surface-variant leading-relaxed">
        {description}
      </p>
    </div>
  );
}
