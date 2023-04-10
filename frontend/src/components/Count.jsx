import { useState } from 'react';

function Counter() {
    const [counter, setCounter] = useState(0);
    return (
        <div>
            <span>Counter: {counter}</span>
            <button onClick={() => setCounter((count) => count + 1)}>+</button>
        </div>
    );
}

export default Counter;