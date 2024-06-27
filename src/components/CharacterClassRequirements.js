function CharacterClassRequirements(props) {
  return props.isOpen ? (
    <section className="App-section">
      <h2> Minimum Requirements</h2>
      {Object.keys(props.selectedCharacter).map((key, index) => {
        return (
          <div key={index}>
            {key}: {props.selectedCharacter[key]}
          </div>
        );
      })}
      <button onClick={() => props.setIsOpen(false)}>
        Close Requirement View
      </button>
    </section>
  ) : null;
}

export default CharacterClassRequirements;

