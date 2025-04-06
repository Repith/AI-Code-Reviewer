import axios from 'axios';
import { getAuthHeader } from './auth.service';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface ReviewFeedback {
  reviewId: string;
  feedback: string;
}

export interface ReviewHistory {
  _id: string;
  reviewId: string;
  code: string;
  language: string;
  feedback: string;
  createdAt: string;
}

export const createReview = async (
  code: string,
  language: 'javascript' | 'typescript'
): Promise<ReviewFeedback> => {
  const response = await axios.post(
    `${API_URL}/review`,
    { code, language },
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const getReviewHistory = async (): Promise<ReviewHistory[]> => {
  const response = await axios.post(
    `${API_URL}/review/user-reviews`,
    {},
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const createStreamingReview = async (
  code: string,
  language: 'javascript' | 'typescript',
  onChunk: (chunk: string) => void
): Promise<void> => {
  try {
    const authHeader = getAuthHeader();
    const response = await fetch(`${API_URL}/review/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
      body: JSON.stringify({ code, language }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('Response body is null');

    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      if (value) {
        const chunk = decoder.decode(value, { stream: !done });
        onChunk(chunk);
      }
    }
  } catch (error) {
    console.error('Error streaming review:', error);
    throw error;
  }
};
