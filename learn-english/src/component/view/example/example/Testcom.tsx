import React, { useRef } from 'react';

function Testcom() {
    // Create a ref for an array of inputs
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Handler to focus a specific input
    const focusInput = (index: number) => {
        if (inputRefs.current[index]) {
            inputRefs.current[index]?.focus();
        }
    };

    return (
        <div>
            {/* Buttons to trigger focus for each input */}
            {[...Array(3)].map((_, index) => (
                <div>
                    <button key={index} onClick={() => focusInput(index)}>
                        Focus Input {index + 1}
                    </button>
                </div>
            ))}

            {/* Target inputs */}
            {[...Array(3)].map((_, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)} // Assign refs dynamically
                    type="text"
                    placeholder={`Input ${index + 1}`}
                />
            ))}
        </div>
    );
    // const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // // Function to focus all elements
    // const focusAll = () => {
    //     inputRefs.current.forEach((input) => {
    //         input?.focus();
    //     });
    // };

    // return (
    //     <div>
    //         <input
    //             type="text"
    //             placeholder="Input 1"
    //             ref={(el) => (inputRefs.current[0] = el)}
    //         />
    //         <input
    //             type="text"
    //             placeholder="Input 2"
    //             ref={(el) => (inputRefs.current[1] = el)}
    //         />
    //         <input
    //             type="text"
    //             placeholder="Input 3"
    //             ref={(el) => (inputRefs.current[2] = el)}
    //         />
    //         <button onClick={focusAll}>Focus All</button>
    //     </div>
    // );
    // const inputRef1 = useRef<HTMLInputElement | null>(null);
    // const inputRef2 = useRef<HTMLInputElement | null>(null);

    // const handleClick = () => {
    //     // Focus the first element
    //     inputRef1.current?.focus();

    //     // Focus the second element
    //     inputRef2.current?.focus();
    // };


    // return (
    //     <div>
    //         <input ref={inputRef1} type="text" placeholder="Input 1" />
    //         <input ref={inputRef2} type="text" placeholder="Input 2" />
    //         <button onClick={handleClick}>Focus Both Inputs</button>
    //     </div>
    // );

}

export default Testcom;
