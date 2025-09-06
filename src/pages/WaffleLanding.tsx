import React from "react";

const WaffleLanding: React.FC = () => {
    return (
    <div
      className="fixed inset-0 flex items-center justify-center text-center font-bold"
      style={{ backgroundColor: '#DFA656', minHeight: '100vh', minWidth: '100vw' }}
    >
      <div>
        <h1 className="text-5xl font-bold">Waffle<br /></h1>
        <h4><br />Tap a cell to activate it</h4>
        <h4>then use the address bar to search or navigate</h4>
        <h4>or open the menu to use Presets or Bookmarks.</h4>
      </div>
    </div>
    );
};

export default WaffleLanding;