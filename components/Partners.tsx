'use client';

const partners = [
  {
    name: 'Company 1',
    logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=100&q=80'
  },
  {
    name: 'Company 2',
    logo: 'https://images.unsplash.com/photo-1614680376408-12c9d0a2f9c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=100&q=80'
  },
  {
    name: 'Company 3',
    logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=100&q=80'
  },
  {
    name: 'Company 4',
    logo: 'https://images.unsplash.com/photo-1614680376458-0f88a5b463f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=100&q=80'
  },
  {
    name: 'Company 5',
    logo: 'https://images.unsplash.com/photo-1614680376739-8360d55bc8a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=100&q=80'
  }
];

export default function Partners() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Trusted by Leading Companies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}