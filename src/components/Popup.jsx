import React from 'react';
import PropTypes from 'prop-types';

export default WrappedComponent => {
	return function ({visible}) {
		return visible
		? <WrappedComponent />
		: null;
	}

}
