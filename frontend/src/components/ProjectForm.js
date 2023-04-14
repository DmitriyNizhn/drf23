import React from 'react';


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {'title': '', 'users': []}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleUsersSelect(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'users': []
            })
            return;
        }

        let users = []

        for(let option of event.target.selectedOptions) {
            users.push(option.value)
        }

        this.setState({
            'users': users
        })
    }

    handleSubmit(event) {

        this.props.createProject(this.state.title, this.state.users)
        event.preventDefault()
    }


    render() {

        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>


                <input type="text" name="title" placeholder="Title"
                       value={this.state.title} onChange={(event) => this.handleChange(event)}/>


                 {/*Выбор авторов*/}
                <select name="author" multiple onChange={(event) => this.handleUsersSelect(event)}>
                    {this.props.users.map((user) => <option value={user.id}>{user.first_name} {user.last_name}</option>)}
                </select>
                {/*<label htmlFor="users">users</label>*/}
                {/*<input type="number" name="users" placeholder="User"*/}
                {/*       value={this.state.users} onChange={(event) => this.handleChange(event)}/>*/}

                <input type="submit" value="Create"/>
            </form>
        );
    }
}

export default ProjectForm