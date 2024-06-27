import { useState, useEffect } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, SKILL_LIST } from "./consts.js";
import Character from "./components/Character";
import PartySkillCheck from "./components/PartySkillCheck";

function App() {
  const [characters, setCharacters] = useState({});
  const [maxSkillCharacter, setMaxSkillCharacter] = useState({});
  const apiUrl =
    "https://recruiting.verylongdomaintotestwith.ca/api/{mia9704}/character/";

  function generateUniqueId() {
    return "" + new Date().getTime();
  }

  function addNewCharacter() {
    let defaultAttributes = {};
    let defaultSkills = {};
    ATTRIBUTE_LIST.forEach((attribute) => {
      defaultAttributes[attribute] = 10;
    });
    SKILL_LIST.forEach((skill) => {
      defaultSkills[skill.name] = 0;
    });
    let uniqueId = generateUniqueId();

    setCharacters((prevState) => ({
      ...prevState,
      [uniqueId]: {
        attributes: defaultAttributes,
        skills: defaultSkills,
      },
    }));
  }

  function resetAllCharacters() {
    setCharacters({});
  }

  function saveAllCharacters() {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characters),
    });
  }

  function loadAllCharacters() {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.body);
      });
  }

  useEffect(() => {
    loadAllCharacters();
  }, []);

  useEffect(() => {}, [characters]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <div className="CharacterButtons">
        <button onClick={() => addNewCharacter()}>Add New Character</button>
        <button onClick={() => resetAllCharacters()}>
          Reset All Characters
        </button>
        <button onClick={() => saveAllCharacters()}>Save All Characters</button>
      </div>
      <PartySkillCheck
        skillsPoints={maxSkillCharacter.skillsPoints}
        characterNum={maxSkillCharacter.characterNum}
      />
      {Object.keys(characters).map((characterId, index) => {
        return (
          <Character
            key={index}
            characterNum={index}
            character={characters[characterId]}
            characterId={characterId}
            characters={characters}
            setCharacters={setCharacters}
            maxSkillCharacter={maxSkillCharacter}
            setMaxSkillCharacter={setMaxSkillCharacter}
          ></Character>
        );
      })}
    </div>
  );
}

export default App;

