import type { FC } from 'react';

export const LanguageTabs: FC = () => {
  return (
    <div className="flex gap-4 mb-4 border-b">
      <button className="py-2 px-4 border-b-2 border-primary">
        English
      </button>
      <button className="py-2 px-4 text-muted-foreground">
        Latin
      </button>
      <button className="py-2 px-4 text-muted-foreground">
        Spanish
      </button>
    </div>
  );
};
