import React from "react";


const UserItem = ({user}) => {

    return (
        <tr>
            <td>
                {user.id}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.birthday_year}
            </td>
            <td>
                {user.email}
            </td>

        </tr>
    )

}

const UserList = ({users}) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Birthday year
            </th>
            <th>
                E-mail
            </th>
            {users.map((user) => < UserItem user={user}/>)}
        </table>
    )
}
export default UserList