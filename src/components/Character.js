import { useState, useEffect } from "react";
import { SKILL_LIST } from "../consts.js";
import SkillCheck from "./SkillCheck";
import Attributes from "./Attributes";
import CharacterClass from "./CharacterClass";
import Skills from "./Skills";

function Character({
  setCharacters,
  characterId,
  character,
  characterNum,
  setMaxSkillCharacter,
  maxSkillCharacter,
}) {
  const [attributeModifiers, setAttributeModifiers] = useState({});
  const [skillsPoints, setSkillsPoints] = useState({});
  const [totalSkillPoints, setTotalSkillPoints] = useState();
  const [skillPointsAvailable, setSkillPointsAvailable] = useState(0);

  function calculateModifier(points) {
    return Math.floor((points - 10) / 2);
  }

  function maxReached(max, points) {
    let sum = 0;
    Object.keys(points).forEach((key) => {
      sum += points[key];
    });
    return sum >= max;
  }

  function incrementCharacterValue(type, name, val) {
    setCharacters((prevState) => ({
      ...prevState,
      [characterId]: {
        ...character,
        [type]: {
          ...character[type],
          [name]: prevState[characterId][type][name] + val,
        },
      },
    }));
  }

  function isValidNum(val) {
    return val !== undefined && !isNaN(val);
  }

  useEffect(() => {
    let totalPoints = 0;
    let pointsDict = {};
    SKILL_LIST.forEach((skill) => {
      let points =
        character.skills[skill.name] +
        attributeModifiers[skill.attributeModifier];
      totalPoints += points;
      pointsDict = { ...pointsDict, [skill.name]: points };
      setSkillsPoints((prevState) => ({
        ...prevState,
        [skill.name]: points,
      }));
    });
    setTotalSkillPoints(totalPoints);
  }, [character, character.skills, attributeModifiers]);

  useEffect(() => {
    if (isValidNum(totalSkillPoints)) {
      setMaxSkillCharacter((prevState) => {
        if (
          (totalSkillPoints > prevState.totalSkillPoints &&
            prevState.characterNum !== characterNum) ||
          !isValidNum(prevState.totalSkillPoints) ||
          prevState.characterNum === characterNum
        ) {
          return {
            ...prevState,
            totalSkillPoints: totalSkillPoints,
            characterNum: characterNum,
            skillsPoints: { ...skillsPoints },
          };
        } else {
          return { ...prevState };
        }
      });
    }
  }, [totalSkillPoints, skillsPoints, characterNum, setMaxSkillCharacter]);

  useEffect(() => {
    let points = calculateModifier(character.attributes.Intelligence) * 4 + 10;
    if (points < 0) points = 0;
    setSkillPointsAvailable(points);
  }, [character, character.attributes, character.attributes.Intelligence]);

  useEffect(() => {
    let modifierPoints = {};
    Object.keys(character.attributes).forEach((attribute) => {
      modifierPoints[attribute] = calculateModifier(
        character.attributes[attribute]
      );
    });
    setAttributeModifiers(modifierPoints);
  }, [character, character.attributes]);

  return (
    <div className="Character">
      <h2 className="CharacterNum">Character: {characterNum + 1}</h2>
      <SkillCheck skillsPoints={skillsPoints} />
      <Attributes
        attributes={character.attributes}
        attributeModifiers={attributeModifiers}
        incrementCharacterValue={incrementCharacterValue}
        maxReached={maxReached}
      />
      <CharacterClass attributes={character.attributes} />
      <Skills
        skills={character.skills}
        skillPointsAvailable={skillPointsAvailable}
        attributeModifiers={attributeModifiers}
        maxReached={maxReached}
        incrementCharacterValue={incrementCharacterValue}
        skillsPoints={skillsPoints}
      />
    </div>
  );
}

export default Character;

