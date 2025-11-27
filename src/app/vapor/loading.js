
import LibraryGameCardSkeleton from '@/components/suspense/LibraryGameCardSkeleton';
import { range } from '@/utils';

async function VaporLoading() {
  return (
    <section className="max-width-wrapper">
      <header className="library-header">
        <h1>My games</h1>
      </header>

      <div className="game-grid">
        {range(12).map((num) => (
          <LibraryGameCardSkeleton key={num} />
        ))}
      </div>
    </section>
  );
}

export default VaporLoading;