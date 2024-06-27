import { SKILL_LIST } from "../consts.js";

function Skills(props) {
  return (
    <section className="App-section">
      <h2>Skills</h2>
      <div>Total skill points available: {props.skillPointsAvailable}</div>
      {SKILL_LIST.map((skill, index) => {
        return (
          <div key={index}>
            {skill.name}:&nbsp;
            {props.skills[skill.name]}
            (Modifier:&nbsp;
            {skill.attributeModifier}
            ):&nbsp;
            {props.attributeModifiers[skill.attributeModifier]}&nbsp;
            <button
              onClick={() => {
                if (
                  props.maxReached(props.skillPointsAvailable, props.skills)
                ) {
                  alert(
                    "You need more skill points! Upgrade intelligence to get more"
                  );
                } else {
                  props.incrementCharacterValue("skills", skill.name, 1);
                }
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                props.incrementCharacterValue("skills", skill.name, -1);
              }}
            >
              -
            </button>
            total:&nbsp;
            {props.skillsPoints[skill.name]}
          </div>
        );
      })}
    </section>
  );
}

export default Skills;

