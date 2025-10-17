import React from 'react';
import { Link } from 'react-router-dom';
import { Design } from '../types';

interface DesignCardProps {
  design: Design;
}

const DesignCard: React.FC<DesignCardProps> = ({ design }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 group">
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={design.image}
          alt={design.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-pink-600">
          {design.category_name}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 truncate">
          {design.title}
        </h3>
        {design.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {design.description}
          </p>
        )}
        <div className="flex items-center justify-between mb-3">
          <Link 
            to={`/designer/${design.designer}`}
            className="flex items-center text-sm text-gray-600 hover:text-pink-600 transition"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="truncate">{design.designer_name}</span>
          </Link>
          {design.designer_rating && (
            <div className="flex items-center text-sm">
              <svg className="w-4 h-4 text-yellow-400 fill-current mr-1" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="font-semibold">{design.designer_rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {design.likes_count}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {design.views_count}
            </span>
          </div>
          {design.price_range && (
            <span className="font-semibold text-pink-600">{design.price_range}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignCard;