export default function ResetCounter({resetMethod}){
    return(
        <div>
            <button className="resetButton button" onClick={resetMethod}>Reset</button>
        </div>
    )
}