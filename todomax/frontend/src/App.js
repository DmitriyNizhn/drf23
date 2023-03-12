import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";
import TodoList from "./components/Todo.js";
import ProjectList from "./components/Project.js";
import NotFound404 from "./components/PageNotFound.js";
import {Route, BrowserRouter, Routes, Link, Navigate, useParams} from "react-router-dom";
import User from "./components/User.js";
import project from "./components/Project.js";
import InfoProject from "./components/InfoProject.js";



class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            // 'projectsInfo': [],

        }
    }

    // getProject(id) {
    //
    //     axios.get(`http://127.0.0.1:8000/api/projects/${id}`)
    //         .then(response => {
    //             console.log(response.data)
    //             this.setState({projectsInfo: response.data})
    //         }).catch(error => console.log(error))
    // }

    componentDidMount() {

        axios.get(('http://127.0.0.1:8000/api/users')).then(response => {
            this.setState(
                {
                    'users': response.data.results
                }
            )
        }).catch(error => console.log(error))

        axios.get(('http://127.0.0.1:8000/api/projects')).then(response => {
            this.setState(
                {
                    'projects': response.data.results
                }
            )
        }).catch(error => console.log(error))

        axios.get(('http://127.0.0.1:8000/api/todos')).then(response => {
            this.setState(
                {
                    'todos': response.data.results
                }
            )
        }).catch(error => console.log(error))

        // axios.get(`http://127.0.0.1:8000/api/projects/${id}`).then(response => {
        //     this.setState(
        //         {
        //             'projectsInfo': response.data
        //         }
        //     )
        // }).catch(error => console.log('myerr:', error))
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
                                <Link to={'/projects'}>project</Link>
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
                        <Route path='/project' element={<Navigate to='/projects'/>}/>
                        <Route path='/todo' element={<Navigate to='/todos'/>}/>
                        {/*<Route path='/projects/:id' element={<InfoProject getProject={(id) => this.getProject(id)}*/}
                        {/*                                                    item={this.state.projectsInfo}/>}/>*/}


                        <Route path='*' element={<NotFound404/>}/>


                    </Routes>

                </BrowserRouter>


            </div>
        )
    }
}


export default App;