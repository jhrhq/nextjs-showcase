const HomeSections = ({ sectionTitle, children }: { sectionTitle: string; children: React.ReactNode }) => {
  return (
    <section className="mb-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground tracking-tight">{sectionTitle}</h2>
      <div
        id="trendingMovies"
        className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
      >
        {children}
      </div>
    </section>
  );
};

export default HomeSections;
