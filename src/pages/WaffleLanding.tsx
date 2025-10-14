import React from "react";

const WaffleLanding: React.FC = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-6"
      style={{
        // Warm bakery background gradient
        background:
          "radial-gradient(1200px 600px at 50% -10%, rgba(255,255,255,0.25), rgba(255,255,255,0) 60%), radial-gradient(800px 600px at 50% 120%, rgba(108,56,14,0.35), rgba(0,0,0,0) 60%), linear-gradient(180deg, #EEC07A 0%, #DFA656 30%, #C88B3B 100%)",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      {/* Waffle cell */}
      <div
        className="relative w-[88vw] max-w-[320px] aspect-[4/3] rounded-[28px] overflow-hidden"
        style={{
          // Base bake color
          backgroundColor: "#E2A656",
          // Layered gradients to create a beveled waffle grid
          backgroundSize: "100% 100%, 100% 100%, 120px 120px, 120px 120px, 120px 120px, 120px 120px",
          border: "1px solid rgba(90,45,10,0.25)",
          boxShadow:
            "inset 0 8px 20px rgba(255,255,255,0.35), inset 0 -16px 24px rgba(0,0,0,0.25), 0 20px 50px rgba(0,0,0,0.35)",
        }}
      >
        {/* Highlight rim */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[28px]"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -2px 0 rgba(0,0,0,0.25)",
          }}
        />

        {/* Title & glyph */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black/80 drop-shadow">
              Empty Cell
            </h1>
          </div>
        </div>

        {/* Instruction plate */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
          <div className="rounded-2xl px-4 py-3 bg-white/40 backdrop-blur-md border border-white/50 shadow-lg max-w-[90%]">
            <p className="text-sm sm:text-base font-semibold text-black/80 text-center">
              Tap a <span className="font-extrabold">cell</span> to activate it
            </p>
            <div className="mt-1 text-xs sm:text-sm text-black/70 text-center">
              <p>Use the address bar to search or navigate</p>
              <p>Open the menu for Presets &amp; Bookmarks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaffleLanding;