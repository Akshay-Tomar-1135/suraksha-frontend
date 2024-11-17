import { FeedbackRequest, FeedbackResponse  } from 'src/interface/Feedback';
  
  
class FeedbackService {
    private baseUrl = import.meta.env.VITE_BACKEND_URL;

    public async submitFeedback(payload: FeedbackRequest): Promise<FeedbackResponse> {
        const { name, email, feedback, rating } = payload;
      
        try {
          const response = await fetch(`${this.baseUrl}/feedback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              feedback,
              stars: rating,
            }),
          });
      
          if (!response.ok) {
            const errorData: { detail: string } = await response.json();
            throw new Error(errorData.detail || `Error: ${response.statusText}`);
          }
      
          const data: FeedbackResponse = await response.json();
          return data;
        } catch (error) {
          console.error('Error submitting feedback:', error);
          throw new Error('An error occurred while submitting the feedback.');
        }
    }
  
}

export const feedbackService = new FeedbackService();
  