import React from 'react';
import {
  ScrollView,
  View,
  BackHandler,
} from 'react-native';

import BaseClass from '../CommonClass';
import SingleCard from '../SingleCard';
import ContextMenu from '../../../Common/ContextMenu';
import Dialog from '../../../Common/Dialog';

import styles from '../styles';
import propTypes from './propTypes';

class Bucketlist extends BaseClass {
  state = {
    items: [],
    selectedBucketlist: {},
    showMenu: false,
    showDialog: false,
  }

  componentDidMount = () => {
    const { bucketlist, params } = this.props;
    if (!bucketlist) {
      this.props.actions.navigate({
        navigator: params.navigator,
        route: 'bucketlists',
      });
    }

    this.setItems([
      {
        label: 'Edit',
        action: this.editBucketlist,
      },
      {
        label: 'Delete',
        action: this.deleteBucketlist,
      },
    ]);

    this.setButtons([{
      label: 'Delete',
      action: this.delete,
    }]);

    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.actions.navigate({
        navigator: params.navigator,
        route: 'bucketlists',
      });
      return true;
    });
  }

  componentDidUpdate = ({
    bucketlist,
    actions: { navigate },
  }) => {
    if (!bucketlist) {
      navigate({
        navigator: this.props.params.navigator,
        route: 'bucketlists',
      });
    }
  }

  goToBucketlist = () => {
    this.closeMenu();
  }

  render() {
    const {
      bucketlist,
      navigator,
      params: { fromRoute },
    } = this.props;

    const bucketlistProps = {
      bucketlist,
      mode: 'single',
      setItems: this.setItems,
      setButtons: this.setButtons,
      setOtherItems: this.setOtherItems,
      setOtherButtons: this.setOtherButtons,
      openMenu: this.openMenu,
      closeMenu: this.closeMenu,
      openDialog: this.openDialog,
      closeDialog: this.closeDialog,
      goToBucketlist: this.goToBucketlist,
      showMenu: this.state.showMenu,
      currentRoute: 'bucketlists',
      fromRoute,
      navigator,
    };

    const showMenu = this.state.showMenu || this.state.showItemMenu;
    const items = this.state.showItemMenu ? this.state.otherItems : this.state.items;
    const buttons = this.state.showItemMenu ? this.state.otherButtons : this.state.buttons;

    const dialogProps = {
      text: 'Are you sure? This action cannot be undone.',
      buttons,
      cancelable: true,
      onCancel: this.closeDialog,
    };

    if (bucketlist) {
      return (
        <View style={styles.container}>
          <ScrollView
            ref={(el) => { this.scrollView = el; }}
            onContentSizeChange={() => this.scrollView.scrollToEnd()}
          >
            <SingleCard {...bucketlistProps} />
          </ScrollView>
          {showMenu && <ContextMenu items={items} />}
          {this.state.showDialog && <Dialog {...dialogProps} />}
        </View>
      );
    }
    return <View />;
  }
}

Bucketlist.propTypes = propTypes;

export default Bucketlist;
