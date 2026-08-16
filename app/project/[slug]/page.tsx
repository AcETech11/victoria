import { getProjectBySlug } from "@/lib/sanity.queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * 1. DYNAMIC METADATA
 * This handles what shows up on Google, LinkedIn, and Instagram.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Victoria Design`,
    description: `Case study for ${project.title} - ${project.category}`,
    openGraph: {
      title: project.title,
      description: `View the motion and design process behind ${project.title}.`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

/**
 * 2. PAGE COMPONENT
 * This handles the actual visual UI.
 */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  // Polished "Not Found" state
  if (!project) {
    return (
      <main className="h-screen bg-stone-950 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-serif italic text-stone-500 mb-6">Project Not Found</h2>
        <Link 
          href="/" 
          className="font-mono text-xs uppercase tracking-widest text-accent border border-accent/30 px-6 py-3 rounded-full hover:bg-accent hover:text-stone-950 transition-all"
        >
          ← Return to Gallery
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-stone-950 text-stone-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="p-8 flex justify-between items-center sticky top-0 z-50 mix-blend-difference">
        <Link href="/" className="font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors">
          ← Back to Works
        </Link>
        <div className="font-mono text-xs uppercase tracking-widest text-stone-500">
          {project.category}
        </div>
      </nav>

      <div className="max-w-1800px mx-auto px-8 py-12 lg:flex gap-20">
        
        {/* Left Side: Cinematic Media (Sticky) */}
        <div className="lg:w-2/3 lg:sticky lg:top-32 h-fit">
          <div className="rounded-3xl overflow-hidden bg-stone-900 border border-white/5 aspect-video relative">
            {project.video ? (
              <video 
                src={project.video} 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover"
              />
            ) : project.image ? (
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-stone-800 flex items-center justify-center text-stone-500 font-mono text-xs italic">
                No Media Available
              </div>
            )}
          </div>
        </div>

        {/* Right Side: The Story/Case Study */}
        <div className="lg:w-1/3 mt-12 lg:mt-0">
          <h1 className="text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">{project.title}</h1>
          
          <div className="prose prose-invert prose-stone max-w-none mb-12">
            <PortableText value={project.description} />
          </div>

          {project.externalLink && (
            <a 
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-accent text-stone-950 font-bold rounded-full hover:scale-105 active:scale-95 transition-transform"
            >
              View Live Prototype
            </a>
          )}

          {/* Project Details Footer */}
          <div className="mt-20 pt-10 border-t border-stone-800 grid grid-cols-2 gap-8 font-mono text-[10px] uppercase tracking-widest text-stone-500">
            <div>
              <p className="text-stone-400 mb-2">Role</p>
              <p>Lead Designer</p>
            </div>
            <div>
              <p className="text-stone-400 mb-2">Year</p>
              <p>2026</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}