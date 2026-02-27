import { useState } from "react";
import activitiesData from "../assets/utils/Activities.json";

function Activities() {
  const [openCards, setOpenCards] = useState<Record<number, boolean>>({});

  const toggleCard = (globalIndex: number) => {
    setOpenCards((prev) => ({ ...prev, [globalIndex]: !prev[globalIndex] }));
  };

  // Separate items into two arrays based on index
  const leftTree = activitiesData.filter((_, index) => index % 2 === 0);
  const rightTree = activitiesData.filter((_, index) => index % 2 !== 0);

  const renderNode = (
    item: (typeof activitiesData)[0],
    _localIndex: number,
    globalIndex: number
  ) => {
    const isOpen = openCards[globalIndex] ?? false;

    return (
      <div key={globalIndex} className="group relative mb-8 pl-6">
        {/* Circle */}
        <div className="timeline-circle absolute -left-4 top-6 w-6 h-6 rounded-full bg-(--background-color-2) border-4 border-(--color-tertiary) transition-all duration-300 group-hover:bg-(--color-primary) group-hover:scale-125"></div>
        {/* Horizontal line */}
        <div className="absolute left-2 z-[-1] top-8 w-12 h-2 bg-(--color-tertiary) branch-line"></div>

        {/* Text content */}
        <div className="box-shadow-resume w-fit min-w-[250px] xl:min-h-[280px] md:min-w-full md:w-full xl:min-w-full xl:w-full">
          {/* Header — clickable on small/medium, static on xl */}
          <button
            type="button"
            className="w-full text-left border-b border-(--color-tertiary) mt-2 pb-3 px-5 xl:cursor-default focus:outline-none"
            onClick={() => toggleCard(globalIndex)}
            aria-expanded={isOpen}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-xl xl:text-3xl font-medium text-(--color-gray)">
                  {item.title}
                </h2>
                <h3 className="text-[12px] xl:text-[14px]">{item.bio}</h3>
              </div>
              {/* Chevron: only visible below xl */}
              <span
                className={`xl:hidden shrink-0 mt-1 transition-transform duration-300 text-(--color-primary) ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <i className="las la-angle-down text-xl"></i>
              </span>
            </div>
          </button>

          {/* Body — always visible on xl, toggle on smaller screens */}
          <div
            className={`overflow-hidden transition-all duration-300 xl:!max-h-none xl:!opacity-100 ${
              isOpen
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0 xl:max-h-none xl:opacity-100"
            }`}
          >
            <div className="mb-2 pt-3 text-left px-5">
              <p className="text-justify">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="activities-section"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      {/* Section Heading */}
      <div className="mb-10">
        <h3 className="res-bio">2022-present</h3>
        <h1 className="res-heading">Certifications and Activities</h1>
      </div>

      <div className="flex flex-col xl:flex-row justify-center xl:px-30">
        {/* Left Column */}
        <div className="relative border-l-8 border-(--color-tertiary) ml-6 w-[83%] md:w-[95%] xl:w-[50%] timeline-column">
          {leftTree.map((item, localIndex) =>
            renderNode(item, localIndex, localIndex * 2)
          )}
        </div>

        {/* Right Column */}
        <div className="relative border-l-8 border-(--color-tertiary) ml-6 w-[83%] md:w-[95%] xl:w-[50%] timeline-column">
          {rightTree.map((item, localIndex) =>
            renderNode(item, localIndex, localIndex * 2 + 1)
          )}
        </div>
      </div>
    </div>
  );
}

export default Activities;
