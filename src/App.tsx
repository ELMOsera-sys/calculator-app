import { useState,useEffect } from 'react';
   import type { MouseEvent } from "react";




function App() {
    const [theme, setTheme] = useState("1");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  interface CalcBtn{
    value:string|number,
    self:string,
    diff?:true
  }

  const calcBtn: CalcBtn[] = [
  { value: "RESET", self: "reset", diff: true},
  { value: "DEL", self: "del", diff: true },
  { value: "/", self: "div" },
  { value: 7, self: "seven" },
  { value: 8, self: "eight" },
  { value: 9, self: "nine" },
  { value: "*", self: "mult" },
  { value: 4, self: "four" },
  { value: 5, self: "five" },
  { value: 6, self: "six" },
  { value: "-", self: "minus" },
  { value: 1, self: "one" },
  { value: 2, self: "two" },
  { value: 3, self: "three" },
  { value: "+", self: "plus" },
  { value: 0, self: "zero" },
  { value: ".", self: "dot" },
  { value: "=", self: "equal" },
];

const [stocked,setStocked]=useState<string[]>([]);
const [typed,setTyped]=useState<string[]>([]);
const [operator,setOperator]=useState<string>("");
const [equal,setEqual]=useState<boolean>(false)


const calculate =(a:string[],b:string[],op:string):string[] =>{
  const x=Number(a.join(""));
  const y=Number(b.join(""));

  let result = 0;

  switch (op) {
    case "+": result = x + y; break;
    case "-": result = x - y; break;
    case "*": result = x * y; break;
    case "/": result = x / y; break;
  }
  return String(result).split("");
}



const handleClick = (e: MouseEvent<HTMLButtonElement>):void=>{
  const target = e.currentTarget.value ;

  switch(target){
    case "RESET":
      setStocked([]);
      setTyped([]);
      setOperator("");
      return;
    case "DEL":
      if(typed.length===0){
        setTyped(stocked);
        setStocked([]);
        setOperator("")
      }else{
        setTyped(typed.slice(0,-1))
      }
      return;
    case ".":
      if (typed.includes(".")) return;
      if(equal){
        setTyped([target]);
        setEqual(false);
        return
      }
      setTyped(typed.length === 0 ? ["0", "."] : [...typed, "."]);
      return;
    case "+":
    case "-":
    case "*":
    case "/":
      if (typed.length === 0) {
        if (stocked.length > 0) setOperator(target);
        return;
      }
      setStocked(stocked.length > 0 ? calculate(stocked, typed, operator) : typed);
      setTyped([]);
      setOperator(target);
      return;
    case "=":
      if (stocked.length === 0 || typed.length === 0) return;
      setTyped(calculate(stocked, typed, operator));
      setStocked([]);
      setOperator("");
      setEqual(true);
      return;

    default:
      if(equal){
        setTyped([target]);
        setEqual(false);
        return
      }
      setTyped([...typed, target]);
  }
}

const screen = (typed.length ? typed : stocked).join("") || "0";

  return (
    <>
      <main className="flex flex-col items-center justify-center md:w-[50%] w-full  gap-5">
        <div className="flex justify-around items-center w-full text-ink ">
          <h1 className="text-3xl">Calc</h1>
          <div className="flex items-center gap-2">THEME
            <div className="flex flex-col justify-around">
            <div className="flex justify-around">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
          <input type="range" min="1" max="3" step="1" value={theme}
    onChange={(e) => setTheme(e.target.value)}  className="theme-slider" />
          </div>
          </div>
        </div>

        <div className="w-4/5 h-[5rem] bg-screen rounded-2xl 
        text-ink flex items-center justify-end px-4">
        <p className='text-5xl'>{screen}</p>
        </div>

        <div className="w-4/5 h-[25rem] p-4 bg-keypad rounded-2xl grid grid-cols-4 gap-2
         [grid-template-areas:'seven_eight_nine_del''four_five_six_plus''one_two_three_minus''dot_zero_div_mult''reset_reset_equal_equal'] ">
        {calcBtn.map((btn)=>(
          <button key={"key"+btn.value} style={{ gridArea: btn.self }}
          className={ `${btn?.diff===true ? "bg-key-primary text-ink-accent shadow-md shadow-key-neutral-shadow" :
            (btn.self === "equal" ? "bg-key-accent text-ink-accent shadow-md shadow-key-accent-shadow" :
              " bg-key-neutral text-ink-key shadow-md shadow-key-primary-shadow"
            )} w-full h-full rounded-2xl text-2xl cursor-pointer hover:scale-[1.1]
            active:scale-[0.9]`} 
            value={btn.value}
            onClick={e=>handleClick(e)}
          >{btn.value}</button>
        ))}
        </div>

      </main>
    </>
  )
}

export default App
