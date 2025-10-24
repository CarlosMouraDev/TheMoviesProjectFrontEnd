import React from 'react';

interface MovieCardProps {
  title: string;
  posterPath: string;
  releaseDate: string;
  rating: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterPath,
  releaseDate,
  rating,
}) => {
  const formattedDate = new Date(releaseDate).toLocaleDateString('pt-BR');
  return (
    <div className='bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-indigo-500/30 transition-transform duration-300 cursor-pointer'>
      <img
        src={posterPath || '/placeholder.jpg'}
        alt={title}
        className='w-full h-100 md:h-80 lg:h-110 object-cover'
      />
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-slate-100 truncate'>
          {title}
        </h3>
        <p className='text-slate-400 text-sm'>{formattedDate}</p>
        <p className='text-indigo-400 font-medium mt-1'>
          ⭐ {rating ? rating.toFixed(1) : 'N/A'}
        </p>
      </div>
    </div>
  );
};
