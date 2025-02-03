import React, { cloneElement, Children } from 'react';

function TodoHeader({ children, loading }) {
    return (
        <header>
            {Children.map(children, (child, index) =>
                cloneElement(child, {
                    loading,
                    key: child.key || index, // Asigna una clave única si no existe
                })
            )}
        </header>
    );
}

export { TodoHeader };
