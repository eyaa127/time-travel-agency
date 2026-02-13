export function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight">
            Voyagez à travers <span className="text-yellow-500">le temps</span>
          </h1>
          <p className="mt-6 text-zinc-200 text-lg md:text-xl">
            Explorez les moments les plus extraordinaires de l’histoire.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#destinations"
              className="px-6 py-3 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
            >
              Explorer les destinations
            </a>
            <a
              href="#quiz"
              className="px-6 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition"
            >
              Faire le quiz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
