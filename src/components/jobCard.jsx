import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

const JobCard = ({ data, setOpen, setSelectedJob }) => {
  return (
    <div
      onClick={() => {
        setSelectedJob(data);
        setOpen(true);
      }}
      className="border-[1.5px] border-[#023259] rounded-lg flex flex-col p-5 cursor-pointer hover:bg-[#02325951]"
    >
      <div className="flex flex-col">
        <div className="flex items-end justify-between mb-2">
          {/* <Image
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbMtTs8q1WuRfxeiu4qKn0qB4dBckQpbarug&s"
            }
            width={20}
            height={20}
            className="rounded-full"
            alt="logo"
          /> */}
          <p className="text-sm">{data.date} Ago</p>
        </div>
        <div>
          <h1 className="font-bold text-2xl">{data.title}</h1>
          <p>{data.company}</p>
        </div>
      </div>
      <div className="flex justify-between flex-wrap mb-2">
        <div className="flex justify-between flex-wrap mb-2">
          <div className="flex gap-2 items-center mt-2">
            {data.location &&
              (data.location.includes("Remote") ||
              data.location.includes("anywhere") ? (
                <span className="bg-[#023259] rounded p-1 px-2">📍Remote</span>
              ) : (
                <>
                  {data.location
                    .split(",")
                    .slice(0, 2)
                    .map((loc, index) => (
                      <Link
                        key={index}
                        href={`https://www.google.com/maps?q=${loc}`}
                        target="_blank"
                        className="bg-[#023259] rounded p-1 px-2 hover:bg-[#02325951]"
                      >
                        {loc}
                      </Link>
                    ))}
                  {data.location && data.location.split(",").length > 2 && (
                    <span className="font-bold">
                      +{data.location.split(",").length - 2}
                    </span>
                  )}
                </>
              ))}
          </div>
        </div>

        <div>
          <p className="font-bold ">{data?.salary ? data.salary[0] : ""}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p>
          Design intuitive user interfaces and improve user experience for our
          digital products....
        </p>
        <div className="flex">
          <Link
            href={data.url}
            className="bg-white p-2 text-black rounded hover:bg-gray-200"
            target="_blank"
          >
            <SquareArrowOutUpRight />
          </Link>
        </div>
      </div>
      {/* <div className="flex gap-2 my-2">
        <span className="bg-[#023259] rounded p-1 px-2">Figma</span>
        <span className="bg-[#023259] rounded p-1 px-2">Adobe XD</span>
        <span className="bg-[#023259] rounded p-1 px-2">WireFraming</span>
      </div> */}
    </div>
  );
};

export default JobCard;
