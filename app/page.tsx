import { getAllProjects } from "@/lib/sanity.queries";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkGrid from "@/components/WorkGrid";
import ProjectArchive from "@/components/ProjectArchive";
import About from "@/components/About";
import Process from "@/components/Process";
import Footer from "@/components/Footer";

export default async function Home() {
  // Fetch all projects from Sanity
  const projects = await getAllProjects();

  // Divide projects into two categories
  const featuredProjects = projects.slice(0, 5); // The Bento 5
  const archivedProjects = projects.slice(5);     // Everything else

  return (
    <>
      <Navbar />
      <main className="bg-stone-950">
        <Hero />
        
        <div id="work">
          {/* We pass only the first 5 to the WorkGrid */}
          <WorkGrid projects={featuredProjects} />
          
          {/* Only show the archive if there are actually projects left over */}
          {archivedProjects.length > 0 && (
            <ProjectArchive projects={archivedProjects} />
          )}
        </div>

        <div id="about">
          <About />
          <Process />
        </div>

        <div id="contact">
          <Footer />
        </div>
      </main>
    </>
  );
}