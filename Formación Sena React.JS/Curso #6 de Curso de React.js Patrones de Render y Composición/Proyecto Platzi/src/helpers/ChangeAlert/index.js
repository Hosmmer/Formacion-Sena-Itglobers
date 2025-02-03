import { withStorageListener } from "./withStorageListener";
import "./ChangeAlert.css"; // Import the CSS file for styles

function ChangeAlert({ show, toggleShow }) {
    if (show) {
        return (
            <div className="modal-overlay">
                <div className="modal-container">
                    <p className="modal-text">¡Hubo cambios en tus datos!</p>
                    <button
                        className="modal-button"
                        onClick={() => toggleShow(false)}
                    >
                        Volver a cargar la información
                    </button>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

const ChangeAlertWithStorageListener = withStorageListener(ChangeAlert);

export { ChangeAlertWithStorageListener };
