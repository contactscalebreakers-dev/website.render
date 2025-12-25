import { Link } from 'wouter';

const services = [
  { title: '3D Scanning', description: 'High-precision 3D scanning for collectibles, prototypes, and custom figures.', href: '/services/3d-scanning' },
  { title: 'Mural Art', description: 'Custom murals for businesses, homes, and public spaces.', href: '/services/murals' },
  { title: '3D Modelling', description: 'Digital sculpting and 3D modelling for toys, characters, and products.', href: '/services/3d-modelling' },
];

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => (
          <Link key={service.href} href={service.href}>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
