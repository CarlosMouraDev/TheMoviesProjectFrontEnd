import { useNavigate } from 'react-router-dom';

type MovieCardProps = {
  id: number;
  title: string;
  posterPath?: string;
  releaseDate?: string;
  rating?: number;
};

export default function MovieCard({
  id,
  title,
  posterPath,
  releaseDate,
  rating,
}: MovieCardProps) {
  const navigate = useNavigate();

  // filters unavailable data
  const formattedDate =
    releaseDate && !isNaN(Date.parse(releaseDate))
      ? new Date(releaseDate).toLocaleDateString('pt-BR')
      : 'Data indisponível';

  const validRating =
    rating !== undefined && !isNaN(rating) && rating > 0
      ? rating.toFixed(1)
      : 'N/A';

  const imageSrc = `https://image.tmdb.org/t/p/w500${posterPath}`;

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className='bg-[#1b2233] rounded-xl overflow-hidden shadow-md hover:scale-[1.03] transition-transform duration-200 cursor-pointer'
    >
      <img
        src={imageSrc}
        alt={title}
        className='w-full h-[400px] object-cover'
        loading='lazy'
      />
      <div className='p-3'>
        <h2 className='font-semibold text-white truncate'>{title}</h2>
        <p className='text-sm text-slate-400'>{formattedDate}</p>
        <p className='text-yellow-400 font-bold text-sm mt-1'>
          ⭐ {validRating}
        </p>
      </div>
    </div>
  );
}
