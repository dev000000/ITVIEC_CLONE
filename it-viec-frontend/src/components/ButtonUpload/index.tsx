import { FiUpload } from "react-icons/fi";
import "./ButtonUpload.scss";

interface ButtonUploadProps {
  text: string;
  handleUpload: () => void;
}

function ButtonUpload({ text, handleUpload }: ButtonUploadProps) {
  return (
    <div className='button-upload' onClick={handleUpload}>
      <FiUpload />
      <span>{text}</span>
    </div>
  )
}

export default ButtonUpload