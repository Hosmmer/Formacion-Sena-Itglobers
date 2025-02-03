import React, { useState, ReactElement, ReactNode } from 'react';
import classes from "./CompoundComponents.module.css";

interface TabsProps {
  children: ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ children }) => {

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  }

  const tabElemnts = React.Children.toArray(children).filter((child): child is ReactElement => React.isValidElement(child));

  return (
    <div className={classes.Tabs}>
      <ul>
        {tabElemnts.map((child, index) => (
          <li
            className={`${index === activeIndex ? classes.TabActive : ""}`}
            onClick={() => handleTabClick(index)}
            key={index}>
            {child.props.label}
          </li>
        ))}
      </ul>
      <p className={classes.TabContent}>
        {tabElemnts[activeIndex]}
      </p>
    </div >
  );
};

export default Tabs;
