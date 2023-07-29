import React, { useState } from 'react';

const TabComponent = ({children}) => {
  // const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (index) => {
    // setActiveTab(index);
  };

  return (
    <div>
      <div className="tab-buttons">
        {children.map((child, index) => (
          {child}
        ))}
      </div>
      <div>


      </div>
    </div>
  );
};

export default TabComponent;
