import { MotionValue } from "framer-motion";

export interface SanityProject {
  _id: string;
  title: string;
  slug: string;
  projectType?: string;
  externalLink?: string;
  mainImage?: string;
  image?: string;
  video?: string;
  category?: string;
  _createdAt?: string;
  description?: unknown[];
}

export interface WordProps {
  children: React.ReactNode;
  range: [number, number];
  progress: MotionValue<number>;
}

export interface ProcessStep {
  title: string;
  desc: string;
  color: string;
}

export interface ProcessCardProps {
  step: ProcessStep;
  index: number;
  progress: MotionValue<number>;
}
