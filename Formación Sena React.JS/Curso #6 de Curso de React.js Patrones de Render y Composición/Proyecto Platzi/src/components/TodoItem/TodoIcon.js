import { ReactComponent as CheckSVG } from '../../assets/icons/check.svg'
import { ReactComponent as DeletekSVG } from '../../assets/icons/delete.svg'
import './TodoIcon.css';
const iconTypes = {
    "check": (color) => < CheckSVG className="Icon-svg" fill={color} />,
    "delete": (color) => <DeletekSVG className="Icon-svg" fill={color} />
}

function TodoIcon({ type, color, onClick }) {
    return (
        <span className={`Icon-container Icon-container-${type}`}
            onClick={onClick}
        >
            {iconTypes[type](color)}
        </span>
    );
}

export { TodoIcon };