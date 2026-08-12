import { LineChart, Search, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <LineChart className="h-5 w-5" />
        </div>
        <span className="text-xl font-bold tracking-tight">MarketIQ</span>
      </div>
      
      {/* Actions & Profile */}
      <div className="flex items-center gap-4 text-muted-foreground">
        <button className="hover:text-foreground transition-colors">
          <Search className="h-5 w-5" />
        </button>
        <button className="hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-secondary border border-border" /> {/* Avatar placeholder */}
      </div>

    </header>
  );
}