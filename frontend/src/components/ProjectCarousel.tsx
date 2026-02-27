import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Projects.css";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  url?: string;
  liveUrl?: string;
  techStack?: string[];
}

interface ProjectCarouselProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  projects,
  onProjectSelect,
}) => {
  return (
    <div
      className="mt-5 w-full relative px-3 sm:px-6 md:px-10 xl:px-30"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay="1000"
    >
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1280: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="custom-swiper"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div
              className="project-card box-shadow-proj cursor-pointer group transition-all duration-300 p-4 sm:p-5 md:p-6 xl:p-7 rounded-xl h-full"
              onClick={() => onProjectSelect(project)}
            >
              <div className="overflow-hidden rounded-[10px] mb-5">
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
                  className="rounded-[10px] w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div>
                <span className="bio text-[14px]!">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="mr-2">
                      {tag}
                    </span>
                  ))}
                </span>

                <h1 className="my-2 text-xl md:text-2xl font-semibold flex items-center gap-2 transition-colors duration-300 group-hover:text-(--color-primary)">
                  {project.title}
                  <span className="opacity-0 transition-all duration-300 group-hover:opacity-100 text-(--color-primary)">
                    <i className="las la-arrow-right text-2xl"></i>
                  </span>
                </h1>

                <p className="text-(--color-body-2) text-[15px] md:text-[16px]">
                  {project.description.length > 10
                    ? project.description.slice(0, 100) + "..."
                    : project.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination mt-6 flex justify-center xl:hidden"></div>
    </div>
  );
};

export default ProjectCarousel;
