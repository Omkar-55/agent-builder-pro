import { Zap } from 'lucide-react';

export function RapidLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-sm">
        <Zap className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold text-foreground">Rapid</span>
    </div>
  );
}
