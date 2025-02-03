import { useEffect, useState } from "react";

function withStorageListener(WrappedComponent) {
    return function WrappedComponentWithStorageListener(props) {
        const [storageChange, setStorageChange] = useState(false);

        useEffect(() => {
            const handleStorageChange = (change) => {
                if (change.key === 'TODOS_V1') {
                    console.log('Hubo cambios en TODOS_V1');
                    setStorageChange(true); // Update the state to trigger the alert
                }
            };

            // Listen to the 'storage' event
            window.addEventListener('storage', handleStorageChange);

            // Cleanup listener when the component is unmounted
            return () => {
                window.removeEventListener('storage', handleStorageChange);
            };
        }, []);
        const toggleShow = () => {
            props.sincronize();
            setStorageChange(false);
        };
        return (
            <WrappedComponent
                show={storageChange}
                toggleShow={toggleShow}
                {...props}
            />
        );
    };
}

export { withStorageListener };
