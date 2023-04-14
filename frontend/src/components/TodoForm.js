import React from 'react';


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {'text': '', 'project': 0, 'author': 0}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }


    handleSubmit(event) {

        this.props.createTodo(this.state.text, this.state.project, this.state.author)
        event.preventDefault()
    }


    render() {

        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <input type="text" name="text" placeholder="Text"
                       value={this.state.text} onChange={(event) => this.handleChange(event)}/>

                <select name="author" onChange={(event) => this.handleChange(event)}>
                    {this.props.author.map((user) => <option
                        value={user.id}>{user.first_name} {user.last_name}</option>)}
                </select>
                <select name="project" onChange={(event) => this.handleChange(event)}>
                    {this.props.project.map((item) => <option
                        value={item.id}>{item.title} </option>)}
                </select>


                <input type="submit" value="Create"/>
            </form>
        );
    }
}

export default TodoForm