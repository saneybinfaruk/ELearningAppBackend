import { PrismaClient } from "@prisma/client";

// Course Type
export type Course = {
  id: number;
  courseType: string;
  courseName: string;
  instructorName: string;
  rating: number;
  price: number;
  description: string;
  imageUrl: string;
  courseDuration: string;
  discountAmount: string;
  skills: string[];
  lessons: Lesson[];
  reviews: Review[];
};

// Lesson Type
export type Lesson = {
  id: number;
  question: string;
  answer: string;
};

// Review Type
export type Review = {
  id: number;
  userName: string;
  userOccupation: string;
  review: string;
  rating: number;
  courseId: number; // Reference to Course ID
};
