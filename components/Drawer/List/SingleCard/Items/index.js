/* eslint-disable global-require */
import React from 'react';
import { View, TouchableOpacity, CheckBox, TouchableWithoutFeedback } from 'react-native';

import BaseClass from './BaseClass';
import Text from '../../../../Common/SuperText';
import styles from '../../../Home/styles';
import propTypes from './propTypes';

class Items extends BaseClass {
  state = {
    page: 0,
    comment: {
      id: '',
      content: '',
    },
    selectedItem: {
      id: '',
      content: '',
    },
    typing: false,
    submitting: false,
    editMode: false,
  }

  componentDidMount = () => {
    if (this.props.setItems) {
      this.props.setItems([
        { label: 'Edit', action: this.editItem },
        { label: 'Delete', action: this.deleteItem },
      ]);
    }
    if (this.props.setButtons) {
      this.props.setButtons([{
        label: 'Delete',
        action: this.delete,
      }]);
    }
  }

  shouldComponentUpdate = ({
    bucketlist: { items },
  }) => JSON.stringify(items) !== JSON.stringify(this.props.bucketlist.items)

  renderItems = bucketlist => bucketlist.items
    .slice(this.state.page * 5, (this.state.page * 5) + 5)
    .map(item => (
      <TouchableOpacity
        key={item.id}
        onLongPress={() => (
          (this.props.bucketlist.userId === this.props.profile.id && this.props.mode) ?
            this.openMenu(item) :
            () => {}
        )}
        delayLongPress={500}
        activeOpacity={1}
      >
        <View
          style={styles.item}
        >
          <Text style={styles.commentUser}>{item.name}</Text>
          <CheckBox
            value={item.done}
            onValueChange={() => this.onDone(item)}
            disabled={this.props.bucketlist.userId !== this.props.profile.id}
          />
        </View>
      </TouchableOpacity>
    ))

  render = () => {
    const { bucketlist } = this.props;
    const { page } = this.state;

    return (
      <TouchableWithoutFeedback onPress={this.props.closeMenu} style={styles.touchArea}>
        <View style={styles.stretch}>
          <View style={[styles.commentSection, { alignItems: 'stretch', paddingHorizontal: 10 }]}>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => this.openForm('Add')} style={[styles.value, { justifyContent: 'flex-start' }]}>
                <Text style={styles.commentNavigator}>Add item</Text>
              </TouchableOpacity>
              <View style={styles.navigationButtons}>
                {
                  bucketlist.items.length > 0 && page > 0 &&
                  <TouchableOpacity
                    style={[styles.value, { justifyContent: 'flex-start' }]}
                    onPress={() => this.navigatePage('previous')}
                  >
                    <Text style={styles.commentNavigator}>previous</Text>
                  </TouchableOpacity>
                }
                {
                  bucketlist.items.length > 0 &&
                bucketlist.items.length > ((page + 1) * 5) &&
                <TouchableOpacity
                  style={[styles.value, { justifyContent: 'flex-start' }]}
                  onPress={() => this.navigatePage('next')}
                >
                  <Text style={styles.commentNavigator}> next</Text>
                </TouchableOpacity>
                }
              </View>
            </View>
            {this.renderItems(bucketlist) }
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Items.propTypes = propTypes;

Items.defaultProps = {
  bucket: {
    id: '',
    comments: [],
    items: [],
  },
  mode: null,
};

export default Items;
