import { useState } from "react";
import { toast } from "react-toastify";
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const allowedFiles = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];//MIME formats 

  const maxFileSize = 5 * 1024 * 1024; //convert bytes

  // handle upload files
  const handleFile = (e) => {
    const fileType = e.target.files[0];
    console.log(fileType.type);

    if (fileType) {
      //check the file type
      if (!allowedFiles.includes(fileType.type)) {  
        toast.error("invalid file type");
      }
      // check the file size
      if (!maxFileSize > fileType.size) { 
        toast.error("maximum file size is 5 MB");
      }
    }
    setFile(fileType);
  };
  return (
    <div>
      <div
        className="px-5 py-2 rounded-pill shadow-lg"
        style={{ backgroundColor: "#77b1b5" }}
      >
        <input type="file" onChange={handleFile} />
        <button className="btn btn-primary" disabled={!file}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
