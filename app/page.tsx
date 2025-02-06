import Link from "next/link";

export default function Home() {
  return (
    <Link 
        href="/candidate"
        className="inline-flex items-center text-sm text-white bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md mb-6 transition-colors duration-300"
    >
        Liste des candidats
    </Link>
  );
}
