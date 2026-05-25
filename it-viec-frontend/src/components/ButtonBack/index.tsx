import { IoIosArrowBack } from "react-icons/io";
import "./ButtonBack.scss";

interface ButtonBackProps {
  handleBack: () => void;
}

function ButtonBack({ handleBack }: ButtonBackProps) {
  return (
    <div className='button-back' onClick={handleBack}>
      <IoIosArrowBack />
    </div>
  )
}

export default ButtonBack