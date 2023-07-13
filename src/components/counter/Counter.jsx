import './Counter.css'
import {useState} from "react";
import CounterButton from "./CounterButton";
import ResetCounter from "./ResetCounter";

export default function Counter(){
    const [count, setCount] =  useState(0);
    function incrementCounterParentFunction(by){
        setCount(count + by)
    }

    function decrementCounterParentFunction(by){
        setCount(count - by)
    }

    function resetCounter(){
        setCount(0)
    }

    return(
        <>
            <CounterButton by={1} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction}/>
            <CounterButton by={2} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction}/>
            <CounterButton by={5} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction}/>
            <span className="count">{count}</span>
            <ResetCounter resetMethod={(resetCounter)}></ResetCounter>
        </>
    )
}

