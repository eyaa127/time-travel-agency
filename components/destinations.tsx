import Image from "next/image";

export function Destinations() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
        Nos Destinations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Paris 1889 */}
        <div className="group rounded-xl overflow-hidden bg-zinc-900 shadow-lg hover:shadow-2xl transition-all duration-500">
          <div className="relative">
            <Image
              src="/images/paris-1889.jpg"
              alt="Paris 1889"
              width={800}
              height={500}
              className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 text-sm rounded">
              1889
            </span>
          </div>
        </div>

        {/* Crétacé */}
        <div className="group rounded-xl overflow-hidden bg-zinc-900 shadow-lg hover:shadow-2xl transition-all duration-500">
          <div className="relative">
            <Image
              src="/images/cretaceous.jpg"
              alt="Crétacé"
              width={800}
              height={500}
              className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 text-sm rounded">
              -65M
            </span>
          </div>
        </div>

        {/* Florence 1504 */}
        <div className="group rounded-xl overflow-hidden bg-zinc-900 shadow-lg hover:shadow-2xl transition-all duration-500">
          <div className="relative">
            <Image
              src="/images/florence-1504.jpg"
              alt="Florence 1504"
              width={800}
              height={500}
              className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 text-sm rounded">
              1504
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
