import { useState } from "react";

type ToggleProps = {
  isToggled?: boolean;
  onToggle?: (value: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ isToggled = false, onToggle }) => {
  const [internalToggle, setInternalToggle] = useState<boolean>(isToggled);
  const toggle = () => {
    const newToggle = !internalToggle;
    setInternalToggle(newToggle);

    if (onToggle) {
      onToggle(newToggle)
    }
  }
  return (
    <button onClick={toggle}>
      {internalToggle ? "ON" : "OFF"}
    </button>
  );
};


export const ParentComponent = () => {
  const [toggleState, setToggleState] = useState<boolean>(false);
  return (
    <div>
      <p>Togle is {toggleState ? "ON" : "OFF"}</p>
      <Toggle isToggled={toggleState} onToggle={setToggleState} />
    </div>
  );
};
