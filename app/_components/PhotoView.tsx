import Link from "next/link";

export const PhotoView = ({ id }: { id: number }) => {
  return (
    <Link href={`./photo/${id}`}>
      <div className=" w-20 h-20 text-center border-r-2 bg-teal-200 cursor-pointer">
        {id}
      </div>
    </Link>
  );
};
