import { SquareArrowOutUpRight, X } from "lucide-react";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const CardModal = ({ isOpen, setOpen, data }) => {
  const modalRef = useRef();
  const { ref: titleRef } = useInView({ threshold: 0 });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target))
        setOpen(false);
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="w-[calc(100vw-10em)] max-w-[60em] border-[1.5px] border-[#023259] rounded-lg bg-[#011627] p-6 relative overflow-y-auto max-h-[calc(100vh-10em)]"
      >
        <div className="absolute top-3 right-3 flex">
          <Link
            href={data.url}
            className="bg-white p-2 text-black rounded hover:bg-gray-200 flex gap-2 items-center"
            target="_blank"
          >
            <SquareArrowOutUpRight size={15} /> Apply Now
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="hover:shadow-white text-white px-2 py-1 rounded-md"
          >
            <X />
          </button>
        </div>
        <h2 ref={titleRef} className="text-2xl font-bold mb-4 flex flex-col">
          <span>
            {data.title}
            <span className="rounded-full text-lg ms-2 border-2 border-[#023259] cursor-pointer hover:bg-[#023259] px-3 py-1">
              1 Day Ago
            </span>
          </span>
          <span className="text-sm font-thin">Facebook Carrers</span>
        </h2>
        <h2 className="text-2xl font-bold flex flex-col">{data.salary}</h2>
        <div className="flex flex-wrap">
          {data.location[0].split(",").map((loc, index) => (
            <Link
              key={index}
              href={`https://www.google.com/maps?q=${loc}`}
              target="_blank"
              className="bg-[#023259] rounded p-1 px-2 hover:bg-[#02325951] m-1"
            >
              {loc.includes("Remote") || loc.includes("anywhere")
                ? "📍Remote"
                : loc}
            </Link>
          ))}
        </div>
        <div>
          <div className="max-w-4xl mx-auto p-6"></div>
        </div>
        {/* {!inView && (
          <Link
            href={"www.google.com"}
            className="fixed top-[calc(100vh-8em)] left-[calc(100vw-40em)] bg-white p-2 text-black rounded shadow-lg hover:bg-gray-200 z-50"
            target="_blank"
          >
            <SquareArrowOutUpRight />
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default CardModal;
