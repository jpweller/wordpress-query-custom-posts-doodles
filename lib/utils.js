'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNormalizedDoodlesQuery = getNormalizedDoodlesQuery;
exports.getSerializedDoodlesQuery = getSerializedDoodlesQuery;

var _omitBy = require('lodash/omitBy');

var _omitBy2 = _interopRequireDefault(_omitBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_EVENTS_QUERY = {
  _embed: true,
  number: 10,
  offset: 0,
  order_by: 'meta_value',
  type: 'doodles',
  order: 'ASC',
  fields: 'all_with_meta'
};

/**
 * Returns a normalized doodles query, excluding any values which match the
 * default doodle query.
 *
 * @param  {Object} query Doodles query
 * @return {Object}       Normalized doodles query
 */
/**
 * External dependencies
 */
function getNormalizedDoodlesQuery(query) {
  return (0, _omitBy2.default)(query, function (value, key) {
    return DEFAULT_EVENTS_QUERY[key] === value;
  });
}

/**
 * Returns a serialized doodles query, used as the key in the
 * `state.doodles.queries` state object.
 *
 * @param  {Object} query  Doodles query
 * @return {String}        Serialized doodles query
 */
function getSerializedDoodlesQuery() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var normalizedQuery = getNormalizedDoodlesQuery(query);
  return JSON.stringify(normalizedQuery).toLocaleLowerCase();
}