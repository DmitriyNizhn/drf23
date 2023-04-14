import React from "react";
import {useLocation} from "react-router-dom";

const NotFound404 = ({location}) => {
    return (<div className="not-found">
            <h1>Страница по адресу '{useLocation().pathname}' не найдена</h1>
        </div>)
}
export default NotFound404