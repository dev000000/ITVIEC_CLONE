import "./ButtonAction.scss";

interface ButtonActionProps {
  text: React.ReactNode;
  icon: React.ReactNode;
  handle: () => void;
}

function ButtonAction({ text, icon, handle }: ButtonActionProps) {
  return (
    <button  className="button-action" onClick={handle}>
      {icon} <span> {text} </span>
    </button>
  )
}

export default ButtonAction