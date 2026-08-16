import { createClient, groq } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2026-01-15",
  useCdn: true,
});

// 1. Unified Query for the Homepage (Bento + Archive)
export const getAllProjectsQuery = groq`*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  projectType,
  externalLink,
  "mainImage": mainImage.asset->url,
  "video": mainVideo.asset->url,
  category,
  _createdAt
}`;

export async function getAllProjects() {
  return await client.fetch(getAllProjectsQuery);
}

// 2. Specific Query for the Case Study Page
export async function getProjectBySlug(slug: string) {
  return await client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0] {
      title,
      "projectType": projectType,
      "video": mainVideo.asset->url,
      "image": mainImage.asset->url,
      description,
      externalLink,
      category,
      _createdAt
    }`, 
    { slug }
  );
}