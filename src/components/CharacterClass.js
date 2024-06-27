import { useState, useEffect } from "react";
import { CLASS_LIST } from "../consts.js";
import CharacterClassRequirements from "./CharacterClassRequirements";

function CharacterClass(props) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [classReqsFulfilled, setClassReqsFulfilled] = useState({});

  useEffect(() => {
    Object.keys(CLASS_LIST).forEach((class_name) => {
      let isReqFulfilled = true;
      Object.keys(CLASS_LIST[class_name]).forEach((attribute) => {
        isReqFulfilled =
          isReqFulfilled &&
          props.attributes[attribute] >= CLASS_LIST[class_name][attribute];
      });
      setClassReqsFulfilled((prevState) => ({
        ...prevState,
        [class_name]: isReqFulfilled,
      }));
    });
  }, [props.attributes]);

  return (
    <section className="App-section">
      <h2>Classes</h2>
      {Object.keys(CLASS_LIST).map((key, index) => {
        return (
          <div
            key={index}
            style={{ color: classReqsFulfilled[key] ? "red" : "white" }}
            onClick={() => {
              setSelectedCharacter(CLASS_LIST[key]);
              setIsOpen(true);
            }}
          >
            {key}
          </div>
        );
      })}
      <CharacterClassRequirements
        selectedCharacter={selectedCharacter}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </section>
  );
}

export default CharacterClass;

