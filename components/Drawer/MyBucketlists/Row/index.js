import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import RenderRow from './RenderRow';

class Row extends Component {
  static getDerivedStateFromProps = nextProps => ({ ...nextProps })

  state = {
    ...this.props,
    visibleModal: false,
    properties: [],
  };

  componentDidMount = () => {
    this.setState({
      properties: this.renderProperties(),
    });
  }

  setModalVisible = (value) => {
    this.setState({
      visibleModal: value,
    });
  }

  handleTouch = async () => {
    const { content } = this.state;
    const { navigate } = this.props;
    if (content.userId) {
      await navigate({
        params: {
          bucketlist: content,
        },
        navigator: 'MyBucketlistNavigator',
        route: 'items',
      });
    }
  }

  renderProperties = () => {
    const { content } = this.props;
    const {
      id, items, userId, self, likes, links, userDisplayName,
      userPictureUrl, pictureUrl, members, tags, ...obj
    } = { ...content };
    const properties = [];
    Object.keys(obj).forEach((property) => {
      if (property === 'createdAt' || property === 'updatedAt') {
        obj[property] = Moment(obj[property]).format('MMMM Do YYYY, h:mm:ss a');
      }
      if (obj[property] && typeof (obj[property]) === 'string') {
        properties.push({ name: property, text: obj[property] });
      }
    });
    return properties;
  }

  render() {
    return (
      <RenderRow
        handleTouch={this.handleTouch}
        setModalVisible={this.setModalVisible}
        showModal={this.props.showModal}
        visibleModal={this.state.visibleModal}
        properties={this.state.properties}
        onDone={this.props.onDone}
        {...this.props}
      />
    );
  }
}

Row.propTypes = {
  context: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
  }),
  content: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
      })),
    }),
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
    PropTypes.any,
  ]).isRequired,
  showModal: PropTypes.func.isRequired,
  onDone: PropTypes.func,
  navigate: PropTypes.func,
};

Row.defaultProps = {
  context: {
    type: 'Add',
    name: '',
  },
  onDone: () => {},
  navigate: () => {},
};
export default Row;
