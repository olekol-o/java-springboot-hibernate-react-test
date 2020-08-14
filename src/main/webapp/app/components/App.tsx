import React, { Component } from 'react'
import {Container, Toast} from 'react-materialize'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'

class App extends Component {
    render () {
        return <Container>
            <h1>Hello SpringBoot from ReactJs with MaterializeCss!</h1>
            <Toast
                options={{
                    html: 'MaterializeCss Js Works!'
                }}
            >
                Test MaterializeCss Js
            </Toast>
        </Container>
    }
}

export default App