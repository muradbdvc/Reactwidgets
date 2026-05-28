import React, { useState } from 'react'
import './Calculator.scss'

const Calculator = () => {
    const[input, setInput] =useState();

    const handleClick=(value)=>{
        setInput((prev)=> prev + value);
    }
    const handleClear=()=>{
        setInput("");
    }
    const handleDelet=(prev)=>{
        setInput((prev)=>prev.slice(0,-1))};
    const handleCalculate =()=>{
        try{
            setInput(eval(input).toString());
        }catch(error){
            setInput("Erroe");
        }
    }
  return (
    <div>
        <div className="calculator-container">
            <div className="calculator">
                <div className="display">{input||"0"}</div>

                <div className="buttons">
                    <div className="btn control" onClick={handleClear}>C</div>
                    <div className="btn control" onClick={handleDelet}>Del</div>
                    <div className="btn operator" onClick={()=>handleClick("%")}>%</div>
                    <div className="btn operator" onClick={()=>handleClick("/")}>/</div>

                    <div className="btn red" onClick={()=>handleClick("7")}>7</div>
                    <div className="btn" onClick={()=>handleClick("8")}>8</div>
                    <div className="btn" onClick={()=>handleClick("9")}>9</div>
                    <div className="btn operator" onClick={()=>handleClick("*")}>x</div>

                    <div className="btn" onClick={()=>handleClick("4")}>4</div>
                    <div className="btn" onClick={()=>handleClick("5")}>5</div>
                    <div className="btn" onClick={()=>handleClick("6")}>6</div>
                    <div className="btn operator" onClick={()=>handleClick("-")}>-</div>

                    <div className="btn" onClick={()=>handleClick("1")}>1</div>
                    <div className="btn" onClick={()=>handleClick("2")}>2</div>
                    <div className="btn" onClick={()=>handleClick("3")}>3</div>
                    <div className="btn operator" onClick={()=>handleClick("+")}>+</div>

                    <div className="btn zero" onClick={()=>handleClick("0")}>0</div>
                    <div className="btn" onClick={()=>handleClick(".")}>.</div>
                    <div className="btn" onClick={handleCalculate}>=</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Calculator