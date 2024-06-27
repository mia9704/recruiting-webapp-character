import { useState, useEffect } from "react";

function SkillCheck(props) {
  const [selectedSkill, setSelectedSkill] = useState();
  const [dc, setDc] = useState();
  const [rolledNum, setRolledNum] = useState();
  const [result, setResult] = useState();

  function handleChange(e) {
    setSelectedSkill(e.target.value);
  }

  function generateRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function roll(skillPoints) {
    let randomNum = generateRandomNum(1, 21);
    setRolledNum(randomNum);
    let total = skillPoints + randomNum;
    if (total >= dc) setResult("Success");
    else setResult("Failure");
  }

  function handleDcInput(e, setDc) {
    setDc(e.target.value);
  }

  useEffect(() => {
    if (!selectedSkill && props.skillsPoints)
      setSelectedSkill(Object.keys(props.skillsPoints)[0]);
  }, [selectedSkill, props.skillsPoints]);

  return props.skillsPoints ? (
    <div className="Skill-check">
      <h2>Party Skill Check Results</h2>
      <div>Character: {props.characterNum + 1}</div>
      <div>
        Skill: {selectedSkill}: {props.skillsPoints[selectedSkill]}
      </div>
      <div>You Rolled: {rolledNum}</div>
      <div>The DC was: {dc}</div>
      <div>Result: {result}</div>
      <h2>Party Skill Check</h2>
      <div className="CharacterButtons">
        Skill:
        <select value={selectedSkill} onChange={handleChange}>
          {Object.keys(props.skillsPoints).map((skill, index) => {
            return (
              <option key={index} value={skill}>
                {skill}
              </option>
            );
          })}
          ;
        </select>
        <input type="number" onInput={(e) => handleDcInput(e, setDc)} />
        <button onClick={() => roll(props.skillsPoints[selectedSkill])}>
          Roll
        </button>
      </div>
    </div>
  ) : null;
}

export default SkillCheck;

