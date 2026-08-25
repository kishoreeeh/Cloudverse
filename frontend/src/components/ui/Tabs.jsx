import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function Tabs({ tabs, activeTab, onChange, className, accentColor }) {
  return (
    <div className={cn("flex space-x-1 border-b border-slate-200 overflow-x-auto no-scrollbar bg-slate-100/60 p-1 rounded-xl", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-4 py-2 text-xs md:text-sm font-semibold transition-all rounded-lg whitespace-nowrap",
              isActive ? "text-slate-900 bg-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            )}
          >
            {tab.label}
            {isActive && accentColor && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                style={{ backgroundColor: accentColor }}
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
