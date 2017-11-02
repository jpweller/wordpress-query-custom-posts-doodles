'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _selectors = require('./selectors');

var _state = require('./state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * External dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Internal dependencies
 */


var debug = (0, _debug2.default)('query:doodle');

var QueryDoodles = function (_Component) {
	_inherits(QueryDoodles, _Component);

	function QueryDoodles() {
		_classCallCheck(this, QueryDoodles);

		return _possibleConstructorReturn(this, (QueryDoodles.__proto__ || Object.getPrototypeOf(QueryDoodles)).apply(this, arguments));
	}

	_createClass(QueryDoodles, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.request(this.props);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.doodleSlug === nextProps.doodleSlug && (0, _shallowequal2.default)(this.props.query, nextProps.query)) {
				return;
			}

			this.request(nextProps);
		}
	}, {
		key: 'request',
		value: function request(props) {
			var single = !!props.doodleSlug;

			if (!single && !props.requestingDoodles) {
				debug('Request doodle list using query ' + props.query);
				props.requestDoodles(props.query);
			}

			if (single && !props.requestingDoodle) {
				debug('Request single doodle ' + props.doodleSlug);
				props.requestDoodle(props.doodleSlug);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return QueryDoodles;
}(_react.Component);

QueryDoodles.propTypes = {
	doodleSlug: _react.PropTypes.string,
	query: _react.PropTypes.object,
	requestingDoodles: _react.PropTypes.bool,
	requestDoodles: _react.PropTypes.func
};

QueryDoodles.defaultProps = {
	requestDoodles: function requestDoodles() {}
};

exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
	var doodleSlug = ownProps.doodleSlug,
	    query = ownProps.query;

	return {
		requestingDoodle: (0, _selectors.isRequestingDoodle)(state, doodleSlug),
		requestingDoodles: (0, _selectors.isRequestingDoodlesForQuery)(state, query)
	};
}, function (dispatch) {
	return (0, _redux.bindActionCreators)({
		requestDoodles: _state.requestDoodles,
		requestDoodle: _state.requestDoodle
	}, dispatch);
})(QueryDoodles);
module.exports = exports['default'];