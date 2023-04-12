import React from "react";
import {Link} from "react-router-dom";


const ProjectItem = ({project,users, deleteProject}) => {

    return (
        <tr>

            <td>
                <Link to={`/projects/${project.id}`}>{project.id}</Link>
            </td>
            <td>
                {project.title}
            </td>
            <td>
                {project.url_rep}
            </td>
            <td>
                {project.authors.map(authorId => users.find(a => a.id === authorId).last_name).join(', ')}
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>

        </tr>
    )

}

const ProjectList = ({projects,users, deleteProject}) => {
    return (
        <div>
            <table>
                <th>
                    ID
                </th>
                <th>
                    Title
                </th>
                <th>
                    URL
                </th>
                <th>
                    authors
                </th>
                <th></th>

                {projects.map((project) => < ProjectItem project={project} users={users} deleteProject={deleteProject}/>)}


            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}


export default ProjectList
