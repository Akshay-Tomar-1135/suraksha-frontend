import React, { FC } from 'react';
import { FaAngry, FaFrown, FaMeh, FaSmile, FaGrinBeam } from 'react-icons/fa';
import { Mood } from 'src/_mock';

interface Smiley {
  label: Mood;
  icon: JSX.Element;
}

const smileys: Smiley[] = [
  { label: Mood.worse, icon: <FaAngry className="text-red-500 text-5xl" /> },
  { label: Mood.bad, icon: <FaFrown className="text-orange-500 text-5xl" /> },
  { label: Mood.fine, icon: <FaMeh className="text-gray-500 text-5xl" /> },
  { label: Mood.good, icon: <FaSmile className="text-green-500 text-5xl" /> },
  { label: Mood.great, icon: <FaGrinBeam className="text-blue-500 text-5xl" /> },
];

interface CustomSmileyRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const CustomSmileyRating: FC<CustomSmileyRatingProps> = ({ rating, setRating }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setRating(index + 1);
    }
  };

  return (
    <div className="flex justify-center my-4 gap-x-4">
      {smileys.map((smiley, index) => (
        <div
          key={index}
          role="button"
          tabIndex={0}
          onClick={() => setRating(index + 1)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`text-center cursor-pointer transform transition-transform duration-300 ease-in-out ${
            index + 1 === rating ? 'scale-[1.3] hover:scale-[1.4]' : 'scale-100 hover:scale-110'
          }`}
          aria-label={smiley.label}
        >
          <div
            className={`text-5xl ${
              index + 1 === rating ? 'text-black' : 'text-gray-500'
            } transform`}
          >
            {smiley.icon}
          </div>
          <p className={`mt-2 text-sm ${index + 1 === rating ? 'text-black' : 'text-gray-500'}`}>
            {smiley.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CustomSmileyRating;
