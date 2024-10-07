import { useState } from 'react';
import Button from './Button';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = {
      name,
      email,
      feedback,
      rating,
    };
  
    try {
      const response = await fetch('/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text(); 
        throw new Error(`Network response was not ok: ${errorMessage}`);
      }
  
      alert('Feedback submitted successfully!');
      
      setName('');
      setEmail('');
      setFeedback('');
      setRating(null);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('There was a problem submitting your feedback. Please try again.');
    }
  };

  const handleRatingClick = (rate: number) => {
    setRating(rate);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>, rate: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleRatingClick(rate);
    }
  };

  return (
    <section className="py-10 px-6 sm:px-8 md:px-10 text-black">
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <div className="text-3xl md:text-4xl lg:text-5xl pt-4 font-bold tracking-tighter mb-4 text-center bg-gradient-to-b from-black to-[#6a0dad] text-transparent bg-clip-text">
          We Value Your Feedback
        </div>

        <p className="text-base md:text-lg lg:text-xl mb-6 text-center">
          Help us make Suraksha better by sharing your thoughts and experiences. We appreciate your input!
        </p>

        {/* Emoji Rating Section */}
        <div className="mb-6">
          <p className="text-lg mb-4 text-center">Was this page helpful? Let us know how we did</p>
          <div className="flex justify-center space-x-4">
            {[1, 2, 3, 4, 5].map((rate, index) => {
              const emojis = ['🤬', '🙁', '😶', '😁', '😍'];
              return (
                <div className="item" key={index}>
                  <span
                    className={`emoji text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block transition-transform transform duration-300 ease-in-out ${
                      rate === rating ? 'scale-125' : ''
                    } hover:scale-125 cursor-pointer`}
                    onClick={() => handleRatingClick(rate)}
                    onKeyDown={(e) => handleKeyDown(e, rate)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Rate ${rate}`}
                  >
                    {emojis[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conditionally Render Feedback Form */}
        {rating && (
          <form onSubmit={handleSubmit} className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 space-y-5">
            <div>
              <label htmlFor="full-name" className="block font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Smith"
                id="full-name"
                className="w-full p-3 border border-slate-300 rounded-md text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="me@email.com"
                className="w-full p-3 border border-slate-300 rounded-md text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="feedback" className="block font-medium mb-2">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                placeholder="Share your thoughts here..."
                className="w-full p-3 border border-slate-300 rounded-md text-black"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                rows={4}
              />
            </div>

            <Button
              text="Submit"
              onButtonClick={(e) => {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
              }}
            />
          </form>
        )}
      </div>
    </section>
  );
};

export default FeedbackForm;
