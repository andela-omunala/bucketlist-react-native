import React from 'react';

import Bucketlists from '../../../List/Bucketlists';

const AllBucketlists = () => {
  const navigator = 'AllBucketlistNavigator';
  const route = 'bucketlist';
  const screen = 'allBucketlists';
  const currentRoute = 'bucketlists';

  const props = {
    navigator,
    route,
    screen,
    currentRoute,
  };

  return (<Bucketlists {...props} />);
};

export default AllBucketlists;
