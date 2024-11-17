export type FeedbackRequest = {
    name: string;
    email: string;
    feedback: string;
    rating: number; 
};

export type FeedbackResponse = {
    message: string;
};