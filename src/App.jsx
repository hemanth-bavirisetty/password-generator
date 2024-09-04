import { useState, useCallback, useEffect, useRef } from "react";
import { IoReloadCircleSharp } from "react-icons/io5";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [color,setColor] = useState("bg-gray-500");  

  const generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNLOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbersAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+-=?/[]{}|";
    }
    let pass = "";
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, charAllowed, setPassword]);

  useEffect(() => generatePassword(), [generatePassword]);

  const passwordRef = useRef(null);

  return (
    <>
      <div className={`${color} w-screen h-screen flex flex-col items-center justify-center`}>
        <h1 className="text-white text-4xl font-bold mb-4">
          Password Generator
        </h1>
        <div className=" bg-slate-200 p-5 flex flex-col  items-center justify-center rounded-lg gap-2 shadow-xl ">
          <div className=" flex overflow-hidden shadow rounded-lg w-4/5 mb-4">
            <input
              type="text"
              value={password}
              ref={passwordRef}
              readOnly
              className="outline-none  w-full p-2  "
            />

            <button
              onClick={() => {
                setColor("bg-emerald-600")
                window.navigator.clipboard.writeText(password);
                passwordRef.current.select();
              }}
              className="outline-none p-2 w-20 bg-orange-500 hover:bg-orange-600 shadow-sm"
            >
              copy
            </button>
            <button
              onClick={()=>{
                setColor("bg-gray-600")
                generatePassword()}
              }
              className="w-20 hover:bg-green-600 bg-green-500 shadow-sm px-6"
            >
              <IoReloadCircleSharp size={20} color="white" /> 
            </button>
          </div>

          <div className="flex  flex-row items-center justify-center gap-2 font-semibold text-orange-500">
            <input
              type="range"
              min={6}
              max={50}
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">length :({length})</label>
            <input
              type="checkbox"
              className="h-4 w-4"
              id="numberInput"
              defaultChecked={numbersAllowed}
              onChange={() => setNumbersAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Allow Numbers</label>
            <input
              type="checkbox"
              id="charInput"
              className="h-4 w-4"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Allow spl chars</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
