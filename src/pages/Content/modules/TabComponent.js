import React, { useState } from 'react';

console.log('React', React, 'useState', useState);

const TabComponent = (children) => {
  // const [activeTab, setActiveTab] = useState(0);
  var activeTab = 1;
  console.log('children', children);

  const handleTabChange = (index) => {
    // setActiveTab(index);
  };

  return (
    <div>
      <div className="tab-buttons">
        {React.Children.map(children, (child, index) => (
          <div>index</div>
        ))}
      </div>
      <div>{/* {React.Children.toArray(children)[activeTab]} */}</div>
    </div>
  );
};

export default TabComponent;
