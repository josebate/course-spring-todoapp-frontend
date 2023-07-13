export default function CounterButton({by, incrementMethod, decrementMethod}){

    return (
        <div className="Counter">
            <div>
                <button className="counterButton button" onClick={() => incrementMethod(by)}>+{by}</button>
                <button className="counterButton button" onClick={() => decrementMethod(by)}>-{by}</button>
            </div>
        </div>
    )
}