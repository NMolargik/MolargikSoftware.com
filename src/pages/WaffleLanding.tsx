import React from "react";
import { useParams, Link } from "react-router-dom";

// Page component that reads two integers from the URL
const WaffleLanding: React.FC = () => {
    const { num1, num2 } = useParams<{ num1: string; num2: string }>();

    console.log("WaffleLanding params:", { num1, num2 });
    return (
    <div
      className="fixed inset-0 flex items-center justify-center text-center font-bold"
      style={{ backgroundColor: '#DFA656', minHeight: '100vh', minWidth: '100vw' }}
    >
      {(!num1 || !num2) ? (
        <div>
        <h1 className="text-2xl font-bold">Missing params</h1>
        <p>
          This page expects two numbers in the URL. Try{" "}
          <Link className="underline" to="/waffle/5/10">/waffle/5/10</Link>.
        </p>
        </div>
      ) : (
        <div>
        <h1 className="text-5xl font-bold">Waffle<br /><br /></h1>
        <h1 className="text-3xl font-bold">Cell {num1}, {num2}</h1>
        <h4><br />Use the address bar to search or navigate.</h4>
        <h4>Or open the menu to use Presets or Bookmarks.</h4>
        </div>
      )}
    </div>
    );
};

export default WaffleLanding;