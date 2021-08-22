import React, { Component } from 'react'
import Header from './Header'
import Button from './Button'
import Api from '../api'

class MessageList extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
    }, () => {
      // Included to support initial direction. Please remove upon completion
      console.log(messages)
    })
  }

  renderButton() {
    const isApiStarted = this.api.isStarted()
    return (
      <Button
        action={() => {
          if (isApiStarted) {
            this.api.stop()
          } else {
            this.api.start()
          }
          this.forceUpdate()
        }}
        text={isApiStarted ? 'Stop' : 'Start'}
      >
      </Button>
    )
  }

  render() {
    return (
      <div>
        <Header>
          {this.renderButton()}
          <Button text="Clear" />
        </Header>
      </div>
    )
  }
}

export default MessageList
