import { PhotoView } from "../_components/PhotoView";

const Photo = async () => {
  const arr = new Array(4).fill(1);
  return (
    <div className=" max-w-3xl flex gap-4">
      {arr.map((_, index) => (
        <PhotoView key={index} id={index} />
      ))}
    </div>
  );
};

export default Photo;
