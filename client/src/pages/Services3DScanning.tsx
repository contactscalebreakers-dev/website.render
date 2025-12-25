export default function Services3DScanning() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">3D Scanning Services</h1>
      <div className="prose max-w-none">
        <p className="text-xl text-gray-600 mb-6">Professional 3D scanning services for collectibles, prototypes, art pieces, and custom figures.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
        <ul className="space-y-2 text-gray-700">
          <li>High-resolution photogrammetry scanning</li>
          <li>Structured light scanning</li>
          <li>Model cleanup and optimization</li>
          <li>3D print-ready file preparation</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Get Started</h2>
        <p className="text-gray-600">Contact us to discuss your 3D scanning project and get a quote.</p>
        <a href="/contact" className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Get a Quote</a>
      </div>
    </div>
  );
}
