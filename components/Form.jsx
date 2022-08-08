import plantAI from "../pages/api/plant-ai";
import { useState } from "react";
import Image from "next/image";

function Form() {
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [aiResult, setAiResult] = useState("");

  // !Test Fetching
  // plantAI
  //   .get("/")
  //   .then((response) => console.log(response.data))
  //   .catch((err) => console.log(err));

  const onImageChange = (e) => {
    const [inputFile] = e.target.files;
    if (inputFile) {
      setImage(URL.createObjectURL(inputFile));
      console.log(inputFile);
      setFile(inputFile);
      console.log(image);
    }
  };

  const uploadImage = () => {
    //? Process to get the image from input
    const formData = new FormData();
    const imageInput = document.querySelector("#image-input");
    formData.append("file", imageInput.files[0]);
    for(let key of formData.entries()) {
      console.log(key);
    }
    //? API call, post image, handle response
    plantAI
      .post(`/predict`, formData)
      .then((response) => {
        console.log(response.data);
        console.log(response.request);
        setAiResult(response.data);
        // const resultDisplay = document.querySelector("#AI-Result");
        // if(resultDisplay.innerHTML.length === 0) {
        //   resultDisplay.innerHTML += aiResult;
        // }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-[80%] bg-slate-200 mx-auto mt-10">
      <h1 className="text-center text-2xl font-bold py-10">Input photo here</h1>
      <form
        action="http://localhost:5000/predict"
        method="POST"
        className="flex flex-col items-center bg-green-50 p-5"
      >
        <input
          id="image-input"
          name="image-input"
          type="file"
          className="bg-red-50"
          accept="image/*"
          onChange={(e) => {
            onImageChange(e);
          }}
        />
        <div
          className="px-5 py-2 bg-blue-200 mt-5 cursor-pointer rounded"
          onClick={() => {
            uploadImage();
          }}
        >
          Check Plant Health
        </div>
      </form>
      <div className="flex justify-center">
        {image ? <Image src={image} width={400} height={300} /> : ""}
      </div>
      <div id="AI-Result" className="text-center p-5">
        {
          aiResult
          ? aiResult
          : ''
        }
      </div>
    </div>
  );
}

export default Form;
