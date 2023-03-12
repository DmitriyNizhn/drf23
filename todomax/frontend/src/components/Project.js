import React from "react";
import {Link} from "react-router-dom";



const ProjectItem = ({project}) => {

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
                {project.authors}
            </td>

        </tr>
    )

}

const ProjectList = ({projects}) => {
    return (
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
            {projects.map((project) => < ProjectItem project={project}/>)}
        </table>
    )
}


export default ProjectList
