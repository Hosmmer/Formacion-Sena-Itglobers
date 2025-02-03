import React from "react";
import { TodoIcon } from '../TodoItem/TodoIcon';


function DeleteIcon({ onDelete }) {
    return (
        <TodoIcon
            type="delete"
            color="gray"
            onClick={onDelete}
        />
    );
}


export { DeleteIcon };