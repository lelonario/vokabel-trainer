import type { FC } from 'react';
import Link from 'next/link';

export const BottomNav: FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 p-4 border-t bg-background">
      <div className="flex justify-around">
        <Link href="/" className="flex flex-col items-center gap-1">
          <span>🏠</span>
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/learn" className="flex flex-col items-center gap-1">
          <span>📚</span>
          <span className="text-xs">Learn</span>
        </Link>
        <Link href="/stats" className="flex flex-col items-center gap-1">
          <span>📊</span>
          <span className="text-xs">Stats</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1">
          <span>👤</span>
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
};
