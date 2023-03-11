import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";
import TodoList from "./components/Todo.js";
import ProjectList from "./components/Project.js";
import NotFound404 from "./components/PageNotFound.js";
import {HashRouter, Route, BrowserRouter, Routes, Link} from "react-router-dom";
import User from "./components/User.js";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    componentDidMount() {
//        const authors = [
//            {
//                'first_name': 'Фёдор',
//                'last_name': 'Достоевский',
//                'birthday_year': 1821
//            },
//            {
//                'first_name': 'Александр',
//                'last_name': 'Грин',
//                'birthday_year': 1880
//            },
//        ]
        axios.get(('http://127.0.0.1:8000/api/users')).then(response => {
            this.setState(
                {
                    'users': response.data
                }
            )
        }).catch(error => console.log(error))

        axios.get(('http://127.0.0.1:8000/api/projects')).then(response => {
            this.setState(
                {
                    'projects': response.data
                }
            )
        }).catch(error => console.log(error))

        axios.get(('http://127.0.0.1:8000/api/todos')).then(response => {
            this.setState(
                {
                    'todos': response.data
                }
            )
        }).catch(error => console.log(error))
    }


    render() {
        return (
            <div>

                <BrowserRouter>
                    <p>MENU</p>
                    <nav>
                        <ul>
                            <li>
                                <Link to={'/'}>user</Link>
                            </li>
                            <li>
                                <Link to={'/projects '}>project</Link>
                            </li>
                            <li>
                                <Link to={'/todos'}>todos</Link>
                            </li>
                        </ul>
                    </nav>
                    <hr/>

                    <Routes>
                        <Route path='/' element={<UserList users={this.state.users}/>}/>
                        <Route path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                        <Route path='/todos' element={<TodoList todos={this.state.todos}/>}/>
                        <Route path='*' element={<NotFound404/>}/>


                    </Routes>

                </BrowserRouter>


            </div>
        )
    }
}

export default App;