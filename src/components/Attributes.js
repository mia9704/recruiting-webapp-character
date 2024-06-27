import { ATTRIBUTE_LIST } from "../consts.js";

function Attributes(props) {
  const maxAttributePoints = 70;

  return (
    <section className="App-section">
      <h2>Attributes</h2>
      {ATTRIBUTE_LIST.map((attribute, index) => {
        return (
          <div key={index}>
            {attribute}:&nbsp;
            {props.attributes[attribute]}
            (Modifier:&nbsp;
            {props.attributeModifiers[attribute]})
            <button
              onClick={() => {
                if (props.maxReached(maxAttributePoints, props.attributes)) {
                  alert(
                    `A Character can have up to ${maxAttributePoints} Delegated Attribute Points`
                  );
                } else {
                  props.incrementCharacterValue("attributes", attribute, 1);
                }
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                props.incrementCharacterValue("attributes", attribute, -1);
              }}
            >
              -
            </button>
          </div>
        );
      })}
    </section>
  );
}

export default Attributes;

