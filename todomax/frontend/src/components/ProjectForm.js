import React from 'react';

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: '', author: 0}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
        ;

    }

    handleSubmit(event) {
        // console.log(this.state.title)
        // console.log(this.state.author)
        this.props.createProject(this.state.title, this.state.author)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="title">title</label>
                    <input type="text" name="title" placeholder="title"
                           value={this.state.title} onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label for="author">author</label>
                    <input type="number" name="author" placeholder="author"
                           value={this.state.author} onChange={(event) => this.handleChange(event)}/>
                    <input type="submit" value="Save"/>
                </div>

            </form>
        )
            ;
    }
}

export default ProjectForm