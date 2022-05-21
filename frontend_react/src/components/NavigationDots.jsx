import React from "react";

const NavigationDots = ({ active }) => {
  return (
    <div className='app__navigation'>
      {[
        "home",
        "about",
        "work",
        "skills",
        "testimonial",
        "certifications",
        "contact",
      ].map((item, index) => {
        return (
          <a
            href={`#${item}`}
            key={item + index}
            className='app__navigation-dot'
            style={active === item ? { backgroundColor: "#313BAC" } : null}
          />
        );
      })}
    </div>
  );
};

export default NavigationDots;
