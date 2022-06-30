import React from "react";

interface Props {
  image: string;
  // setImage:React.Dispatch<React.SetStateAction<string>>
  imageInputRef: React.RefObject<HTMLInputElement>;
  addImage: any;
}
function ImageBox({ imageInputRef, addImage, image}: Props) {
  return (
    <div>
      <form className="rounded-md bg-root mt-5 p-2 flex justify-between space-x-2">
        <input
          ref={imageInputRef}
          className="outline-none text-white rounded-md bg-transparent placeholder:text-white md:flex-1 p-1"
          type="text"
          placeholder="Зурагаа оруулан уу"
        />
        <button
          type="submit"
          onClick={addImage}
          className="shadow-lg border-2 font-bold rounded-md py-1 px-5 text-white"
        >
          Зураг оруулах
        </button>
      </form>
      {image && (
        <img
          src={image}
          alt="upload image"
          className="rounded-lg h-40 mt-5 object-contain"
        />
      )}
    </div>
  );
}

export default ImageBox;
