import "./TagSkill.scss";
import { useNavigate } from "react-router-dom";

interface TagSkillProps {
  text: string;
}

function TagSkill({ text }: TagSkillProps) {
  const navigate = useNavigate();
  const handleNavigate = (skill: string, e: React.MouseEvent) => {
    // Navigate to the job search page with the skill as a query parameter
    e.stopPropagation(); // Prevent the click from bubbling up to parent elements
    navigate(`/viec-lam-it?skill=${skill}`);
  };

  return (
    <div className="tag-skill" onClick={(e) => handleNavigate(text, e)}>
      {text}
    </div>
  );
}

export default TagSkill;
