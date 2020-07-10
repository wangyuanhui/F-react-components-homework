import React, { Component } from 'react';
import './ChatInput.scss';
import answersData from '../../data/answers.json';
import { ROLE } from '../../constants';

class ChatInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  newInput = () => {
    // get input value and reset
    let input = this.state.inputValue;
    this.setState({
      inputValue: ''
    });

    let messages = [];
    messages.push({ "text": input, "role": ROLE.CUSTOMER });

    // add answer if any
    const answer = answersData.find((answer) => {
      for (const tag of answer.tags) {
        if (tag != "DEFAULT" && input.includes(tag)) {
          return true;
        }
      }
    })
    if (answer != null) {
      messages.push(answer);
    }

    // print messages
    this.props.addMessage(messages);
  }

  render() {
    return (
      <footer className="ChatInput">
        <input type="text" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
        <button type="button" onClick={this.newInput}>Send</button>
      </footer>
    );
  }
}

export default ChatInput;
