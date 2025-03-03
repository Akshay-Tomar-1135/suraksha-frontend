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
            const errorData = await response.json();
            throw new Error(errorData.detail || response.statusText || response.status);
          }
      
          const data: FeedbackResponse = await response.json();
          return data;
        } catch (error: any) {
          console.error('Error submitting feedback:', error.message || error);
          throw new Error(error.message || 'An unexpected error occurred.');
        }
    }
  
}

export const feedbackService = new FeedbackService();
  