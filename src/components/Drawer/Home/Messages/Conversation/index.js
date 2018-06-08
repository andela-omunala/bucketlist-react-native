import React from 'react';
import {
  View,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import ContextMenu from '../../../../Common/ContextMenu';
import Dialog from '../../../../Common/Dialog';
import BaseClass from './BaseClass';
import Text from '../../../../Common/SuperText';
import ConversationHeader from './ConversationHeader';
import NewMessage from './NewMessage';
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
    showMenu: false,
    deleteMode: '',
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

    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.actions.navigate({
        navigator: 'MessageNavigator',
        route: 'MessageList',
      });
      return true;
    });
  }

  componentDidUpdate = ({
    conversation,
    params: { newConversation },
    actions: { navigate },
  }) => {
    if (!conversation && !newConversation && !this.state.message.content) {
      navigate({
        route: 'MessageList',
        navigator: 'MessageNavigator',
      });
    }
  }

  selectMessage = (selectedMessage) => {
    this.openMenu();
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
            this.openMenu(chatMessage) :
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
    const { message, showMenu, showDialog, deleteMode } = this.state;
    let name;
    let userId;

    const items = [
      { label: 'Edit', action: this.editMessage },
      { label: 'Delete', action: this.deleteMessage },
    ];

    const dialogProps = {
      text: `Delete ${deleteMode}? This action cannot be undone.`,
      buttons: [{
        label: 'Delete',
        action: this.delete,
      }],
      cancelable: true,
      onCancel: this.closeDialog,
    };

    if (conversation || newConversation) {
      name = this.getName(conversation || newConversation);
      userId = this.getId(conversation || newConversation);
    }

    if (!conversation && !newConversation) {
      return (<View style={styles.container} />);
    }

    return (
      <TouchableWithoutFeedback onPress={this.closeMenu} style={styles.touchArea}>
        <View style={[styles.container, { backgroundColor: '#fff' }]}>
          <ConversationHeader
            goBack={this.goBack}
            goToProfile={this.goToProfile}
            deleteConversation={this.deleteConversation}
            userId={userId}
            name={name}
            conversation={conversation}
            id={id}
          />
          <View style={styles.bodyWrapper}>
            <ScrollView
              contentContainerStyle={styles.body}
              ref={(ref) => { this.scrollView = ref; }}
              onContentSizeChange={() => this.scrollView.scrollToEnd()}
            >
              {conversation && this.renderMessages(conversation.messages)}
            </ScrollView>
          </View>
          <NewMessage
            message={message}
            onChange={this.onChange}
            saveMessage={this.saveMessage}
          />
          {
            this.state.editMode &&
            <TouchableOpacity onPress={this.cancel} style={styles.cancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          }
          {showMenu && <ContextMenu items={items} />}
          {showDialog && <Dialog {...dialogProps} />}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Conversation.propTypes = propTypes;

export default Conversation;
