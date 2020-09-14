import React, { Component } from 'react'
import {inject, observer} from "mobx-react"
import {Button, Icon, TextField} from "@material-ui/core"

@inject("commonStore", "userStore")
@observer
class SignUp extends Component {

    componentWillUnmount() {
        this.props.userStore.reset()
    }

    handleUserNameChange = e => {
        this.props.userStore.setUserName(e.target.value)
    }

    handlePasswordChange = e => {
        this.props.userStore.setPassword(e.target.value)
    }

    handleSubmitForm = e => {
        e.preventDefault()
        this.props.userStore.register()
    }

    render () {
        const { loading } = this.props.commonStore
        const { userName, password } = this.props.userStore
        return (
            <form
                className="grey lighten-2"
                noValidate
                autoComplete="off"
                title="Register"
            >
                <div>
                    <TextField
                        label='Login'
                        value={userName}
                        onChange={this.handleUserNameChange}
                    />
                </div>
                <div>
                    <TextField
                        label='Password'
                        value={password}
                        onChange={this.handlePasswordChange}
                    />
                </div>
                <div>
                    <Button
                        disabled={loading}
                        onClick={this.handleSubmitForm}
                    >
                        Submit
                        <Icon>
                            send
                        </Icon>
                    </Button>
                </div>
            </form>
        )
    }
}

export default SignUp