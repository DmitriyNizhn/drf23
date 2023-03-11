import React from "react";


const TodoItem = ({todo}) => {

    return (
        <tr>

            <td>
                {todo.id}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.time_create}
            </td>
            <td>
                {todo.time_update}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.authors}
            </td>
        </tr>
    )

}

const TodoList = ({todos}) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                text
            </th>
            <th>
                time_create
            </th>
            <th>
                time_update
            </th>
            <th>
                project
            </th>
            <th>
                authors
            </th>
            {todos.map((todo) => < TodoItem todo={todo}/>)}
        </table>
    )
}
export default TodoList