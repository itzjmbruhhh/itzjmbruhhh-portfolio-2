import { useState, useRef } from "react";
import homeData from "../assets/utils/Home.json";

function HomeLeft() {
  const [toastVisible, setToastVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cvLink = new URL(
    `../assets/files/${homeData.cv_directory}`,
    import.meta.url,
  ).href;

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(homeData.email)
      .then(() => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000); // hide after 3 seconds
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <div className="home-left info-container">
      <div className="info-wrapper">
        <div className="info-bio m-0.5 box-shadow">
          {/* Info Header */}
          <div className="info-header pb-0 p-4">
            <div className="flex justify-center md:justify-start xl:justify-start">
              <i className="lar la-user text-2xl border-9 p-1 rounded-full border-(--color-primary-opaque) bg-(--color-primary) text-white"></i>
            </div>
            <h1 className="mt-4 ml-1 font-extrabold text-(--color-secondary) text-2xl md:text-6xl xl:text-6xl">
              Hi, I'm{" "}
              <span className="text-(--color-primary)">{homeData.name}</span>
            </h1>
            <p className="info-text">
              {homeData.bio_1} <br /> {homeData.bio_2}
            </p>
          </div>

          <div className="info-footer pt-0 p-4">
            <ul>
              <li className="info-text mt-2 flex items-center gap-2">
                <i className="lar la-sticky-note text-3xl text-(--color-primary)"></i>
                <span>{homeData.profession}</span>
              </li>
              <li className="info-text mt-2 flex items-center gap-2">
                <i className="lar la-envelope text-3xl text-(--color-primary)"></i>
                <span>{homeData.email}</span>
              </li>
              <li className="info-text mt-2 flex items-center gap-2">
                <i className="las la-map-marker text-3xl text-(--color-primary)"></i>
                <span>{homeData.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="info-cv m-0.5 mt-10 box-shadow">
          <div className="ml-5 mr-5 mt-2">
            <p className="text-[12px] md:text-[16px] xl:text-[16px] text-(--color-body-3) font-normal">
              Download my curriculum vitae:
            </p>
            <div className="flex xl:space-x-5 space-y-5 py-5 flex-col xl:flex-row xl:space-y-0 md:space-y-0 md:space-x-5 md:flex-row relative">
              <button className="box-shadow hover cv-button font-medium">
                <a
                  href={cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full block"
                >
                  VIEW RÉSUMÉ
                </a>
              </button>
              <button
                className="box-shadow hover cv-button font-medium relative"
                onClick={handleCopyEmail}
                ref={buttonRef}
              >
                CONTACT ME
                {/* Inline toast positioned next to button */}
                {toastVisible && (
                  <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black/90 text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap animate-fadeInOut">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast animation */}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateX(10px); }
          10% { opacity: 1; transform: translateX(0); }
          90% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(10px); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s forwards;
        }
      `}</style>
    </div>
  );
}

export default HomeLeft;
