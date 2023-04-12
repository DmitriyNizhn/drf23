import React from "react";
import {Link} from "react-router-dom";
import Project from "./Project";


const TodoItem = ({todo,users, project, deleteTodo}) => {

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


            <td>
                <button onClick={() => deleteTodo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )

}

const TodoList = ({todos, users, project, deleteTodo}) => {
    return (
        <div>
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

                {todos.map((todo) => < TodoItem users= {users} projects={project} todo={todo} deleteTodo={deleteTodo}/>)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}
export default TodoList