import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.css';

const styles = {
  theme: {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: 'grey',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: 'grey',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
    position: 'fixed',
    zIndex: '99999',
    textAlign: 'left'
  },

  reviewTitles: {
    textDecoration: 'underline',
    textDecorationColor: 'yellow'
  }
};

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      message: ''
    };
  }

  componentDidMount() {
    const { steps } = this.props;
    const { name, email, message } = steps;

    this.setState({ name, email, message });
  }

  render() {
    const { name, email, message } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Message</h3>
        <div>
          <p style={styles.reviewTitles}>Name:</p>
          <p>{name.value}</p>
        </div>
        <div>
          <p style={styles.reviewTitles}>Email:</p>
          <p>{email.value}</p>
        </div>
        <div>
          <p style={styles.reviewTitles}>Message:</p>
          <p>{message.value}</p>
        </div>
      </div>
    );
  }
}

class MrChatBot extends Component {
  sendMessage = e => {
    let contactObj = {
      name: e.steps.name.value,
      email: e.steps.email.value,
      message: e.steps.message.value
    };
    fetch('https://bot-contact-form.herokuapp.com/contact', {
      method: 'POST',
      body: JSON.stringify(contactObj),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return 'end';
  };
  render() {
    return (
      <div className="bot">
        <ChatBot
          className="tutorial"
          floating={true}
          headerTitle="Contact"
          style={styles.theme}
          botDelay={500}
          placeholder="Type here..."
          steps={[
            {
              id: '1',
              message: 'Hi, I can help you get in touch!',
              trigger: '2'
            },
            {
              id: '2',
              message: 'What is your name?',
              trigger: 'name'
            },
            {
              id: 'name',
              user: true,
              trigger: '5'
            },
            {
              id: '4',
              message: 'Nice to meet you, {previousValue}!',
              trigger: '5'
            },
            {
              id: '5',
              message: 'What is your email?',
              trigger: 'email'
            },
            {
              id: 'email',
              user: true,
              trigger: '7'
            },
            {
              id: '7',
              message: 'Thank you! What message would you like me to pass on?',
              trigger: 'message'
            },
            {
              id: 'message',
              user: true,
              trigger: '9'
            },
            {
              id: '9',
              message: 'Great! Check out your summary',
              trigger: 'review'
            },
            {
              id: 'review',
              component: <Review />,
              asMessage: true,
              trigger: 'update'
            },
            {
              id: 'update',
              message: 'Would you like to update some field?',
              trigger: 'update-question'
            },
            {
              id: 'update-question',
              options: [
                { value: 'yes', label: 'Edit', trigger: 'update-yes' },
                {
                  value: 'no',
                  label: 'Submit',
                  trigger: 'end-message'
                }
              ]
            },
            {
              id: 'update-yes',
              message: 'What field would you like to update?',
              trigger: 'update-fields'
            },
            {
              id: 'update-fields',
              options: [
                { value: 'name', label: 'Name', trigger: 'update-name' },
                { value: 'email', label: 'Email', trigger: 'update-email' },
                {
                  value: 'message',
                  label: 'Message',
                  trigger: 'update-message'
                }
              ]
            },
            {
              id: 'update-name',
              update: 'name',
              trigger: '9'
            },
            {
              id: 'update-email',
              update: 'email',
              trigger: '9'
            },
            {
              id: 'update-message',
              update: 'message',
              trigger: '9'
            },
            {
              id: 'end-message',
              message: 'Thanks! Your data was submitted successfully!',
              trigger: this.sendMessage
            },
            {
              id: 'end',
              message: 'Goodbye!',
              end: true
            }
          ]}
        />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  language: state.languageChosen
});

export default connect(mapStateToProps)(withRouter(MrChatBot));
