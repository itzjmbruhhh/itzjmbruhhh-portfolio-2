import React from "react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  url?: string;
  liveUrl?: string;
  techStack?: string[]; // <-- make optional
}

interface ProjectOverlayProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectOverlay: React.FC<ProjectOverlayProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
             bg-black/80 backdrop-blur-md backdrop-saturate-150"
      onClick={onClose}
    >
      <div
        className="box-shadow-proj-overlay relative p-6 md:p-10 bg-(--background-color-2) rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="cursor-pointer absolute top-3 right-4 text-(--color-body-2) hover:text-(--color-primary) transition-colors"
          onClick={onClose}
        >
          <i className="las la-times text-2xl"></i>
        </button>

        {/* Project Image */}
        <img
          src={
            project.image
              ? new URL(
                  `../assets/images/projects/${project.image}`,
                  import.meta.url,
                ).href
              : ""
          }
          alt={project.title}
          className="rounded-lg mb-4 md:w-[300px] xl:w-[550px] w-full object-contain"
        />

        {/* Content */}
        <div className="text-justify">
          {/* Tags */}
          <div className="mb-2 xl:mb-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-block bg-(--color-primary)/10 text-(--color-primary) text-[11px] xl:text-sm px-1.5 py-0.5 rounded-full mr-2"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title & Description */}
          <h2 className="text-[17px] md:text-2xl xl:text-4xl font-semibold mb-1 text-(--color-gray) text-left">
            {project.title}
          </h2>
          <p className="text-(--color-body-2) text-[12px] xl:text-[18px] xl:mt-4">
            {project.description}
          </p>

          {/* Tech Stack */}
          {project.techStack?.map(
            (
              tech:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined,
              i: any,
            ) => (
              <span
                key={`tech-${i}`}
                className="inline-block bg-(--color-secondary)/10 text-(--color-secondary) text-[11px] xl:text-sm px-3 py-1 rounded-full mr-2 mt-4"
              >
                {tech}
              </span>
            ),
          )}

          {/* Action Buttons */}
          {(project.url || project.liveUrl) && (
            <div className="mt-[8%] flex flex-wrap gap-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="box-shadow hover cv-button font-medium"
                >
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="box-shadow hover cv-button font-medium"
                >
                  View Live
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverlay;
