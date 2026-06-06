import "./TagSkill.scss";
import { useNavigate } from "react-router-dom";
import { buildJobSearchPath } from "@/utils/jobSearch";

interface TagSkillProps {
  text: string;
}

function TagSkill({ text }: TagSkillProps) {
  const navigate = useNavigate();
  const handleNavigate = (skill: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(buildJobSearchPath({ keyword: skill }));
  };

  return (
    <div className="tag-skill" onClick={(e) => handleNavigate(text, e)}>
      {text}
    </div>
  );
}

export default TagSkill;
