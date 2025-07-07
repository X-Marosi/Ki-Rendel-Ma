import { useState } from "react";
import { Wheel } from "react-custom-roulette";

interface WheelData {
  option: string;
  style?: { backgroundColor?: string; textColor?: string };
}

// A repeating pattern of grays for a monochrome wheel
const wheelMonochromeColors = [
  "#ff595e",
  "#ffca3a",
  "#8ac926",
  "#1982c4",
  "#6a4c93",
];

const WheelOfFortune = () => {
  const [nameInput, setNameInput] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winner, setWinner] = useState<string | null>("N/A");

  const data: WheelData[] =
    names.length > 0
      ? names.map((name, index) => ({
          option: name.length > 15 ? `${name.substring(0, 15)}...` : name,
          style: {
            backgroundColor:
              wheelMonochromeColors[index % wheelMonochromeColors.length],
            textColor: "#ffffff",
          },
        }))
      : [{ option: "", style: { textColor: "#b3b3b3" } }];

  const addName = () => {
    if (nameInput.trim() && !names.includes(nameInput.trim())) {
      setNames([...names, nameInput.trim()]);
      setNameInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addName();
  };

  const removeName = (nameToRemove: string) => {
    setNames(names.filter((name) => name !== nameToRemove));
    setWinner("N/A");
  };

  const spinWheel = () => {
    if (names.length < 2) return;
    const newPrizeNumber = Math.floor(Math.random() * names.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setWinner("N/A");
  };

  const isSpinDisabled = names.length < 2 || mustSpin;

  return (
    <div className="flex flex-col items-center font-sans p-8 bg-[#1e1e1e] rounded-2xl max-w-2xl mx-auto my-8 border border-[#333333]">
      <h1 className="text-white text-4xl font-bold mb-8">🎯 Wheel of Names</h1>

      <div className="flex w-full mb-6">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a name"
          className="flex-1 p-3 text-base text-white bg-[#2a2a2a] border-2 border-[#333333] rounded-l-lg outline-none"
        />
        <button
          onClick={addName}
          className="px-6 py-3 text-base font-bold bg-sky-500 text-white border-2 border-l-0 border-[#333333] rounded-r-lg cursor-pointer"
        >
          Add
        </button>
      </div>

      {names.length > 0 && (
        <div className="w-full mb-8">
          <h3 className="text-left text-[#b3b3b3] border-b-2 border-[#333333] pb-2 mb-4 font-medium">
            Contestants ({names.length})
          </h3>
          <ul className="flex flex-wrap gap-2 p-0 list-none">
            {names.map((name, index) => (
              <li
                key={index}
                className="flex items-center bg-[#2a2a2a] text-white py-2 px-2 pl-4 rounded-full text-sm border border-[#333333]"
              >
                {name}
                <button
                  onClick={() => removeName(name)}
                  className="ml-2 w-6 h-6 pb-0.5 text-white rounded-full hover:bg-red-500 bg-[#222] cursor-pointer flex items-center justify-center font-bold border-none focus:outline-none"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-2 w-full flex justify-center relative">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          textColors={["#ffffff"]}
          fontSize={16}
          fontWeight={600}
          outerBorderWidth={0}
          outerBorderColor="#444"
          innerBorderWidth={62}
          innerBorderColor="#111"
          radiusLineColor="#444"
          radiusLineWidth={0}
          textDistance={75}
          onStopSpinning={() => {
            setMustSpin(false);
            setWinner(names[prizeNumber]);
          }}
        />

        <button
          onClick={spinWheel}
          disabled={isSpinDisabled}
          className={`w-30 h-30 top-[162.5px] left-[180px] z-99 absolute text-lg font-bold rounded-full border-none cursor-pointer transition-transform ease-in-out duration-100
          ${
            isSpinDisabled
              ? "bg-[#2a2a2a] text-[#555555] cursor-not-allowed"
              : "bg-white text-[#121212]"
          }`}
        >
          {mustSpin ? "Spinning..." : "SPIN!"}
        </button>
      </div>

      <div
        className={`mt-8 text-2xl text-center text-[#b3b3b3]
        ${winner === "N/A" ? "opacity-0" : "opacity-100"}`}
      >
        The winner is
        <span className="block mt-2 text-5xl font-bold text-white">
          {winner}
        </span>
      </div>
    </div>
  );
};

export default WheelOfFortune;
