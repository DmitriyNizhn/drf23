import React from "react";
import {useParams} from "react-router-dom";


const InfoProject = ({getProject, item}) => {
    // let {id} = getProject;
    //
    // let authors = item.authors ? item.authors : []
    // console.log(id)
    return (
        <div>
            <h1>{item.title}</h1>
            Repository: {item()}
            <p></p>
            Users:
            {item.authors}

        </div>

    )

}

export default InfoProject
