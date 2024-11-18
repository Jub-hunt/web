"use client";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/jobCard";
import CardModal from "@/components/cardModal";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { CornerDownLeft } from "lucide-react";

// Define the type for a job
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  [key: string]: any; // For additional fields if needed
}

// Define the type for the API response
interface ApiResponse {
  success: boolean;
  data: Job[];
  hasMore: boolean;
  error?: string;
}

export default function Home() {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]); // All fetched jobs
  const [loading, setLoading] = useState<boolean>(false); // Loading indicator
  const [hasMore, setHasMore] = useState<boolean>(true); // Indicator for more jobs
  const [page, setPage] = useState<number>(0); // Current page
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query state
  const [lastJobId, setLastJobId] = useState<number>(0); // Track the last job ID for pagination
  const observerRef = useRef<HTMLDivElement | null>(null); // Ref for the observer

  // Function to fetch jobs with or without search query
  const fetchJobs = async (page: number, search: string, lastJobId: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/jobs?limit=10&search=${search}&lastJobId=${lastJobId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const result: ApiResponse = await response.json();
      if (result.success && result.data) {
        setJobs((prevJobs) => [...prevJobs, ...result.data]); // Append new jobs
        setHasMore(result.hasMore); // Check if more jobs are available
        if (result.data.length > 0) {
          // Update the last job ID for pagination
          setLastJobId(result.data[result.data.length - 1].id);
        }
      } else {
        setHasMore(false); // No more jobs
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Observer logic for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1); // Trigger next page fetch
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, loading]);

  // Fetch jobs whenever `page`, `searchQuery`, or `lastJobId` changes
  useEffect(() => {
    if (hasMore) {
      fetchJobs(page, searchQuery, lastJobId);
    }
  }, [page]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value == ""){
      fetchJobs(0, "", 0)
    }
    setSearchQuery(e.target.value);
  };

  // Handle search on Enter key press
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPage(0); // Reset to first page on search
      setJobs([]); // Clear current jobs
      setLastJobId(0); // Reset lastJobId on new search
      fetchJobs(0, searchQuery, 0); // Fetch jobs with the search query
    }
  };

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
      <div className="relative">
        <input
          type="text"
          placeholder="Search for your desired Job 🔎"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleSearchKeyPress}
          className="w-full p-4 px-5 font-bold rounded-lg border-2 border-[#023259] bg-[#011627] focus:border-[#012542] outline-none mb-5"
        />
        <div className="flex items-center gap-2 border-2 border-[#023259] bg-[#011627] cursor-pointer absolute top-2 right-2 p-2 rounded-lg hover:bg-[#012542]" onClick={()=>{
          setPage(0);
          setJobs([]); 
          setLastJobId(0); 
          fetchJobs(0, searchQuery, 0);
        }}>Search <CornerDownLeft size={15}/></div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        <CardModal
          isOpen={isDetailsOpen}
          setOpen={setIsDetailsOpen}
          data={selectedJob}
        />
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            data={job}
            setOpen={setIsDetailsOpen}
            setSelectedJob={setSelectedJob}
          />
        ))}
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
      </div>
      {!hasMore && !loading && (
        <div className="flex justify-end">
          <Image
            src={"/gamingmouse.png"}
            height={500}
            width={500}
            alt="mouse"
          />
        </div>
      )}
      <div ref={observerRef} className="h-10" />{" "}
      {/* Trigger point for the observer */}
    </div>
  );
}

const LoadingCard = () => {
  return (
    <div className="border-[1.5px] border-[#023259] rounded-lg flex flex-col p-5 animate-pulse bg-[#011627]">
      <div className="flex items-center justify-between mb-2">
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        <div className="w-20 h-4 bg-gray-600 rounded"></div>
      </div>
      <div className="mb-4">
        <div className="w-32 h-6 bg-gray-600 rounded mb-2"></div>
        <div className="w-20 h-4 bg-gray-600 rounded"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-16 h-6 bg-gray-600 rounded"></div>
        <div className="w-16 h-6 bg-gray-600 rounded"></div>
        <div className="w-16 h-6 bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};
