import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/assets/css/index.css';
import App from './app';

// function App({ saludo, nombre }) {

//     return (
//         <h1>{saludo} , {nombre}!</h1>
//     );
// }

// function withSaludo(WrappedComponent) {
//     return function WrappedComponentWithSaludo(saludo) {
//         return function truthComponent(props) {
//             return (
//                 <>
//                     <WrappedComponent {...props} saludo={saludo} />
//                     <p>Estamos Acompañando WrappedComponent </p>
//                 </>
//             )
//         }
//     }
// }

// const AppWithWSaludo = withSaludo(App)("Hola!!!");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
    //<AppWithWSaludo nombre="Hosmmer" />
);
