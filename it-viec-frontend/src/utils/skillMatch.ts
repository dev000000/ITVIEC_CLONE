// utils/skillMatch.ts

type MatchScore = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Score cao hơn = match tốt hơn, hiển thị trước
 *
 * 5 - Exact:       "java"     → "Java"
 * 4 - Prefix:      "java"     → "JavaScript"
 * 3 - Word prefix: "boot"     → "Spring Boot"
 * 2 - Acronym:     "ml"       → "Machine Learning"
 * 1 - Substring:   "script"   → "JavaScript", "TypeScript"
 * 0 - No match
 */

function getAcronym(name: string): string {
  return name
    .split(/[\s\-_.]+/)
    .map((word) => word[0] ?? "")
    .join("")
    .toLowerCase();
}

export function getMatchScore(skillName: string, query: string): MatchScore {
  const name = skillName.toLowerCase();
  const q = query.toLowerCase().trim();

  if (!q) return 0;

  if (name === q) return 5;
  if (name.startsWith(q)) return 4;

  const words = name.split(/[\s\-_.]+/);
  if (words.some((w) => w.startsWith(q))) return 3;

  if (getAcronym(skillName) === q) return 2; // "ml" → "Machine Learning"

  if (name.includes(q)) return 1;

  return 0;
}