import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";
import TodoList from "./components/Todo.js";
import ProjectList from "./components/Project.js";
import NotFound404 from "./components/PageNotFound.js";
// import LoginForm from "./components/Auth.js";
import {Route, BrowserRouter, Routes, Link, Navigate} from "react-router-dom";


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


    // get_token(username,password){
    //     console.log(username,password)
    //     // axios.post(('http://127.0.0.1:8000/api-token-auth/', {'username': username, 'password': password})).then(response => {
    //     //
    //     //         {
    //     //             console.log(response.data['token'])
    //     //         }
    //     //
    //     // }).catch(error => console.log(error))
    // }
    //
    // logout(){
    //
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
                        {/*<Route path='/login' element={()=> <LoginForm get_token = {(username,password)=>this.get_token(username,password)}/>}/>*/}


                        <Route path='*' element={<NotFound404/>}/>


                    </Routes>

                </BrowserRouter>


            </div>
        )
    }
}


export default App;