"use client";
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Movie = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");
  const title = searchParams.get("title");
  const language = searchParams.get("language");
  const imgPath = searchParams.get("imgPath");
  const vote_average = searchParams.get("vote_average");
  const overview = searchParams.get("overview");

  if (!id || !title || !language || !imgPath) {
    return <div className="min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  const handleBookNowClick = () => {
    if (!session) {
      router.push('/api/auth/signin');
    } else {
      const url = `/buyTickets/seatLayout?id=${id}&title=${title}&language=${language}&imgPath=${imgPath}&vote_average=${vote_average}&overview=${overview}`;
      router.push(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between lg:flex-row">
          <div className="text-left">
            <h2 className="text-3xl text-lime-600 font-bold tracking-wide">{title}</h2>
            <p className="mt-2 text-sm"><span className="text-lime-300">Language:</span> {language}</p>
            <p className="text-sm"><span className="text-lime-300">Vote Average:</span> {vote_average}</p>
            <p className="text-sm mb-8"><span className="text-lime-300">Overview:</span> {overview}</p>
            <button
              onClick={handleBookNowClick}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Book Now
            </button>
          </div>
          <div className="flex-shrink-0 w-64 md:w-96 lg:w-96">
            <img
              src={`https://image.tmdb.org/t/p/w500${imgPath}`}
              alt="Movie Poster"
              className="w-full pt-24 rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
