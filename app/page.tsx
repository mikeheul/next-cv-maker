import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  openGraph: {
    title: 'Next CV Maker',
    description: 'Créez et gérez des CV professionnels pour vos candidats facilement avec Next CV Maker.',
    url: 'https://next-cv-maker.vercel.app/',
    siteName: 'Next CV Maker',
    images: [
      {
        url: 'https://next-cv-maker.vercel.app/screen.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://next-cv-maker.vercel.app/screen.png',
        width: 1800,
        height: 1600,
        alt: 'Next CV Maker',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

const HomePage = () => {
  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen flex flex-col">

        {/* Header */}
        <header className="bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">NextCV</Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/candidate" className="hover:text-blue-400">Candidats</Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-400">À propos</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-400">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-grow bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-center py-32">
          <div className="max-w-2xl mx-auto text-white">
            <h1 className="text-5xl font-extrabold mb-4">Bienvenue sur NextCV</h1>
            <p className="text-xl mb-6">Créez et gérez facilement votre CV, ajoutez des expériences professionnelles et exportez-le au format PDF en toute simplicité.</p>
            <Link href="/candidate">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg">
                Commencez maintenant
              </button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-12 text-white">Fonctionnalités principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="p-6 rounded-lg shadow-md bg-gray-700 text-white">
                <h3 className="text-2xl font-semibold mb-4">Gestion des Candidats</h3>
                <p>Ajoutez, modifiez et supprimez facilement des candidats avec leurs informations et expériences.</p>
              </div>
              <div className="p-6 rounded-lg shadow-md bg-gray-700 text-white">
                <h3 className="text-2xl font-semibold mb-4">Ajout d&apos;Expériences</h3>
                <p>Permet d&apos;ajouter et de mettre à jour les expériences professionnelles de vos candidats directement dans leur profil.</p>
              </div>
              <div className="p-6 rounded-lg shadow-md bg-gray-700 text-white">
                <h3 className="text-2xl font-semibold mb-4">Export PDF</h3>
                <p>Générez facilement un CV au format PDF à partir des informations de votre candidat, prêt à imprimer.</p>
              </div>
            </div>
          </div>
        </section>


        {/* Testimonials Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Ils nous font confiance</h2>
            <div className="flex justify-center space-x-12">
              <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md">
                <p className="text-lg italic">NextCV m&apos;a permis de créer des CV rapidement et efficacement. Très pratique - Jean Dupont</p>
              </div>
              <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md">
                <p className="text-lg italic">Une interface simple et intuitive pour gérer mes candidats et leurs informations - Sophie Durand</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p>&copy; 2025 NextCV. Tous droits réservés.</p>
            <div className="mt-4">
              <ul className="flex justify-center space-x-6">
                <li>
                  <Link href="/privacy" className="hover:text-blue-400">Politique de confidentialité</Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-blue-400">Conditions d&apos;utilisation</Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default HomePage;
