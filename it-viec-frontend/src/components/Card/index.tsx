import "./Card.scss";
import type { CSSProperties, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
}

function Card({ children, style }: CardProps) {
  return (
    <div className='card-item' style={style}>
      {children}
    </div>
  );
}

export default Card;