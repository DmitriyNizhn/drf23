import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";
import TodoList from "./components/Todo.js";
import ProjectList from "./components/Project.js";
import NotFound404 from "./components/PageNotFound.js";
import LoginForm from "./components/Auth.js";
import {Route, BrowserRouter, Routes, Link, Navigate} from "react-router-dom";
import Cookies from "universal-cookie";
import ProjectForm from "./components/ProjectForm.js";
import TodoForm from "./components/TodoForm.js";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            // 'projectsInfo': [],

        }
    }

    createProject(title, users) {
        console.log(title, users, 'createProject')
        const headers = this.get_headers()
        const data = {'title': title, 'authors': users}
        // console.log(data)
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers}).then(
            response => {
                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    deleteProject(id) {

        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers}).then(response => {
            this.load_data()

        }).catch(error => console.log(error))
    }


    createTodo(text, project, author) {
        console.log(text, project, author, 'createTodo')
        const headers = this.get_headers()
        const data = {'text': text, 'project': project, 'authors': author}
        // console.log(data)
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers}).then(
            response => {
                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }

    deleteTodo(id) {

        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers}).then(response => {
            this.load_data()

        }).catch(error => console.log(error))
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers}).then(response => {
            this.setState(
                {
                    'users': response.data.results
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects', {headers}).then(response => {
            this.setState(
                {
                    'projects': response.data.results
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos', {headers}).then(response => {
            this.setState(
                {
                    'todos': response.data.results
                }
            )
        }).catch(error => console.log(error))


    }

    set_token(token) {
        // localStorage.setItem('token', token)
        // let item = localStorage.getItem('token')
        // // console.log(localStorage)
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {'username': username, 'password': password})
            .then(response => {
                    this.set_token(response.data['token'])
                }
            ).catch(error => alert('Неверный логин или пароль'))
    }

    is_auth() {
        return !!this.state.token
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }

        if (this.is_auth()) {
            headers['Authorization'] = `Token ${this.state.token}`
        }

        return headers
    }

    logout() {
        this.set_token('')

    }

    get_token_from_cookies() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    componentDidMount() {
        this.get_token_from_cookies()
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
                            <li>
                                {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> :
                                    <button>
                                        <Link to={'/login'}>Login</Link>
                                    </button>
                                }
                            </li>
                        </ul>
                    </nav>
                    <hr/>

                    <Routes>
                        <Route path='/' element={<UserList users={this.state.users}/>}/>
                        <Route path='/projects' element={<ProjectList projects={this.state.projects}
                                                                      deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route path='/projects/create' element={<ProjectForm
                            users={this.state.users}
                            createProject={(title, users) => this.createProject(title, users)}/>}/>
                        <Route path='/todos'
                               element={<TodoList todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                        <Route path='/todos/create' element={<TodoForm
                            author={this.state.users} project = {this.state.projects}
                            createTodo={(text, project, author) => this.createTodo(text, project, author)}/>}/>
                        <Route path='/project' element={<Navigate to='/projects'/>}/>
                        <Route path='/todo' element={<Navigate to='/todos'/>}/>
                        <Route path='/login' element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>


                        <Route path='*' element={<NotFound404/>}/>


                    </Routes>

                </BrowserRouter>


            </div>
        )
    }
}


export default App;