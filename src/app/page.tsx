"use client";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/jobCard";
import CardModal from "@/components/cardModal";
import { data } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});

  return (
    <div className="my-6 max-w-[1200px] mx-auto px-6">
      <div className="flex w-full justify-between">
        <div>
          <Image
            src={"/full-logo.svg"}
            height={150}
            width={150}
            alt="logo"
            className="me-2"
          />
        </div>
        <Button className="font-semibold">
          <Image
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/2048px-Google_Chrome_icon_%28February_2022%29.svg.png"
            }
            height={20}
            width={20}
            alt="logo"
            className="me-2"
          />
          Add Extension
        </Button>
      </div>
      <div className="flex flex-col items-center mt-12"></div>
      <input
        type="text"
        placeholder="Search for your desired Job 🔎"
        className="w-full p-4 px-5 font-bold rounded-lg border-2 border-[#023259] bg-[#011627] focus:border-[#012542] outline-none mb-5"
      />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        <CardModal
          isOpen={isDetailsOpen}
          setOpen={setIsDetailsOpen}
          data={selectedJob}
        />
        {data.map((job) => (
          <>
            <JobCard
              data={job}
              setOpen={setIsDetailsOpen}
              setSelectedJob={setSelectedJob}
            />
          </>
        ))}
      </div>
    </div>
  );
}
