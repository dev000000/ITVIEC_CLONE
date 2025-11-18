import "./Button.scss"
import { IoSearchOutline } from "react-icons/io5";
function ButtonSubmit ({type,text, disabled = false ,handleClick}) {
  // button({text, disabled}) <=> button(props) , const {text, disabled} = props 

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