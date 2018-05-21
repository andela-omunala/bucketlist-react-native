import React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MenuProvider } from 'react-native-popup-menu';

import { ContextMenu } from '../../../../Common/PopupMenu';
import BaseClass from './BaseClass';
import * as messageActions from '../../../../../actions/messageActions';
import * as userActions from '../../../../../actions/userActions';
import * as navigationActions from '../../../../../actions/navigationActions';
import Text from '../../../../Common/SuperText';
import { setTime } from '../../../../../utils';
import styles from '../../styles';
import propTypes from './propTypes';

class Conversation extends BaseClass {
  state = {
    message: {
      content: '',
    },
    selectedMessage: {},
    editMode: false,
  }

  componentDidMount = () => {
    if (this.props.conversation) {
      this.props.conversation.messages
        .filter(chatMessage => chatMessage.receiverId === this.props.profile.id)
        .forEach(message => this.props.actions.markAsRead(message));
    }
    if (this.scrollView) {
      this.scrollView.scrollToEnd({ animated: true });
    }
  }

  componentDidUpdate = ({ conversation, params: { newConversation }, actions: { navigate } }) => {
    if (!conversation && !newConversation && !this.state.message.content) {
      navigate({ route: 'MessageList', navigator: 'MessageNavigator' });
    }
  }

  selectMessage = (selectedMessage) => {
    this.menuContext.openMenu('messages');
    this.setState({ selectedMessage });
  }

  renderMessages = messages => messages.map((chatMessage) => {
    const { createdAt, time } = setTime(chatMessage);
    const { profile } = this.props;
    const dateTime = `- ${createdAt}${time} -`;

    return (
      <TouchableOpacity
        key={chatMessage.id}
        onLongPress={() => (
          chatMessage.senderId === profile.id ?
            this.selectMessage(chatMessage) :
            () => {}
        )}
        delayLongPress={500}
        activeOpacity={1}
      >
        <Text
          style={[this.setStyle(chatMessage, profile), styles.message]}
        >
          {chatMessage.content}
        </Text>
        <Text
          style={styles.timeSent}
        >
          {dateTime}
        </Text>
      </TouchableOpacity>
    );
  })

  render() {
    const {
      conversation,
      params: { newConversation, id },
    } = this.props;
    const { message } = this.state;
    let name;
    let userId;

    const items = [
      { label: 'Edit', action: this.editMessage },
      { label: 'Delete', action: this.deleteMessage },
    ];

    if (conversation || newConversation) {
      name = this.getName(conversation || newConversation);
      userId = this.getId(conversation || newConversation);
    }
    if (!conversation && !newConversation) {
      return (<View style={styles.container} />);
    }

    return (
      <MenuProvider ref={(mc) => { this.menuContext = mc; }} >
        <View style={[styles.container, { backgroundColor: '#fff' }]}>
          <View style={styles.top}>
            <Icon
              style={styles.backButton}
              onPress={this.goBack}
              name="chevron-left"
              color="#00bcd4"
              size={30}
            />
            <TouchableOpacity onPress={() => this.goToProfile({ id: userId })}>
              <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
            <Icon
              style={styles.deleteButton}
              onPress={conversation ? () => this.deleteConversation({ id }) : this.goBack}
              name="delete"
              color="red"
              size={24}
            />
          </View>
          <View style={styles.bodyWrapper}>
            <ScrollView
              contentContainerStyle={styles.body}
              ref={(ref) => { this.scrollView = ref; }}
              onContentSizeChange={() => this.scrollView.scrollToEnd()}
            >
              {conversation && this.renderMessages(conversation.messages)}
            </ScrollView>
          </View>
          <View style={styles.newMessage}>
            <TextInput
              autoFocus
              placeholder="type message"
              underlineColorAndroid="#00bcd4"
              style={styles.inputStyles}
              value={message.content}
              onChangeText={this.onChange}
              onKeyPress={({ key }) => {
                if (key === 'Enter') {
                  this.saveMessage();
                }
              }}
            />
            <Icon
              style={styles.newButton}
              onPress={this.saveMessage}
              name="send"
              color="#00bcd4"
            />
          </View>
        </View>
        <ContextMenu items={items} name="messages" />
      </MenuProvider>
    );
  }
}

Conversation.propTypes = propTypes;

const mapStateToProps = ({
  profile,
  conversations,
}, { navigation: { state } }) => {
  let param = {};
  let conversation;
  if (state && state.params) {
    const { params, params: { id, newConversation } } = state;
    param = params;
    if (newConversation) {
      conversation = conversations
        .filter(chat => chat.senderId === newConversation.senderId
          && chat.receiverId === newConversation.receiverId)[0];
    } else {
      conversation = conversations.filter(chat => chat.id === id)[0];
    }
  }
  return ({
    params: param,
    profile,
    conversation,
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...messageActions,
    ...userActions,
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
