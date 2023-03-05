import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
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
    }


    render() {
        return (
            <div>
                <header>
                    <li>Menu</li>
                    <li>Menu</li>
                    <li>Menu</li>
                    <li>Menu</li>
                </header>
                <hr/>
                <UserList users={this.state.users}/>

                <hr/>
                <footer>
                    <cl>Fo</cl>
                    <cl>te</cl>
                    <cl>r</cl>
                </footer>

            </div>
        )
    }
}

export default App;