import { useState } from 'react';
import Button from './Button';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="py-16 px-14 bg-gradient-to-t from-[#ff4d6d] to-black text-white">
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-center">
          We Value Your Feedback
        </div>
        <p className="text-lg md:text-xl mb-8 text-center">
          Help us make Suraksha better by sharing your thoughts and experiences. We appreciate your
          input!
        </p>

        <form onSubmit={handleSubmit} className="w-full md:w-3/4 lg:w-2/3 space-y-6">
          <div>
            <label htmlFor="full-name" className="block font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Smith"
              id="full-name"
              className="w-full p-3 border border-slate-300 rounded-md"
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
              className="w-full p-3 border border-slate-300 rounded-md"
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
              className="w-full p-3 border border-slate-300 rounded-md"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              rows={4}
            />
          </div>

          <Button text="Submit" />
        </form>
      </div>
    </section>
  );
};

export default FeedbackForm;
