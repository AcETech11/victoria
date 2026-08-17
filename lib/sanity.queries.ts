import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { projectId } from "@/sanity/env";

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
  if (!projectId || projectId === 'unconfigured') return [];
  try {
    const data = await client.fetch(getAllProjectsQuery);
    return data || [];
  } catch (error) {
    console.warn("Failed to fetch projects from Sanity:", error);
    return [];
  }
}

// 2. Specific Query for the Case Study Page
export async function getProjectBySlug(slug: string) {
  if (!projectId || projectId === 'unconfigured') return null;
  try {
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
  } catch (error) {
    console.warn(`Failed to fetch project by slug (${slug}) from Sanity:`, error);
    return null;
  }
}
