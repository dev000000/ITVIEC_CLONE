import "./Button.scss";
import { IoSearchOutline } from "react-icons/io5";

interface ButtonSubmitProps {
  type?: string;
  text: string;
  disabled?: boolean;
  handleClick?: () => void;
}

function ButtonSubmit({ type, text, disabled = false, handleClick }: ButtonSubmitProps) {

  return (
    <>
      <button type="submit" className={`button ${type ? `button--${type}` : " "}`} disabled={disabled} onClick={handleClick}>
        {type === "search" && (<IoSearchOutline />)} 
        {text}
      </button>
    </>
  )
}
export default ButtonSubmit;