import plantAI from "../pages/api/plant-ai";
import { useEffect, useState } from "react";
import Image from "next/image";

function Form() {
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [serverStatus, setServerStatus] = useState("Contacting server...");

  // !Test Fetching
  useEffect(() => {
    plantAI
      .get("/")
      .then((response) => setServerStatus("Online"))
      .catch((err) => setServerStatus("Offline"));
  }, [image]);

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
    if (serverStatus === "Online") {
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
    } else {
      setAiResult("Server is offline");
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      <h1 className="text-center text-2xl font-bold py-10">
        Checking Plant Health
      </h1>
      <h1>
        Server Status:{" "}
        {serverStatus === "Contacting server..." ? (
          <span className="text-blue-300">{serverStatus}</span>
        ) : serverStatus === "Online" ? (
          <span className="text-green-500">{serverStatus}</span>
        ) : (
          <span className="text-red-500">{serverStatus}</span>
        )}
      </h1>
      <form
        action="http://localhost:5000/predict"
        method="POST"
        className="flex flex-col items-center bg-Hamagon p-5 rounded mb-10"
      >
        <label htmlFor="image-input">Upload Image</label>
        <input
          id="image-input"
          name="image-input"
          type="file"
          className="bg-HamagonDark rounded w-full md:w-[50%]"
          accept="image/*"
          onChange={(e) => {
            onImageChange(e);
          }}
        />
        <div
          className="px-5 py-2 bg-gradient-to-br from-HamagonLight to-Hamagon border mt-5 cursor-pointer rounded"
          onClick={() => {
            uploadImage();
          }}
        >
          Check
        </div>
      </form>
      <div id="AI-Result" className="text-center bg-Hamagon rounded">
        {
          image
          ? <div className="flex justify-center py-5 px-5">
              <Image src={image} width={400} height={300} />
            </div>
          : ""
        }
        {serverStatus === "Offline" ? (
          <h1 className="text-red-500 bg-red-300 p-3 pt-5 rounded">
            Server is offline
          </h1>
        ) : (
          <>
            <h1 className="p-3 pt-5">Result:</h1>
            <p className="px-5 pb-10">{aiResult}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Form;
