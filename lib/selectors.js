'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDoodle = getDoodle;
exports.getDoodlesForQuery = getDoodlesForQuery;
exports.isRequestingDoodlesForQuery = isRequestingDoodlesForQuery;
exports.getTotalPagesForQuery = getTotalPagesForQuery;
exports.isRequestingDoodle = isRequestingDoodle;
exports.getDoodleIdFromSlug = getDoodleIdFromSlug;

var _utils = require('./utils');

/**
 * Returns a doodle object by its global ID.
 *
 * @param  {Object} state    Global state tree
 * @param  {String} globalId Doodle global ID
 * @return {Object}          Doodle object
 */
function getDoodle(state, globalId) {
  return state.doodles.items[globalId];
}

/**
 * Returns an array of doodles for the doodles query, or null if no doodles have been
 * received.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Object}  query  Doodle query object
 * @return {?Array}         Doodles for the doodle query
 */
/**
 * Internal dependencies
 */
function getDoodlesForQuery(state, query) {
  var serializedQuery = (0, _utils.getSerializedDoodlesQuery)(query);
  if (!state.doodles.queries[serializedQuery]) {
    return null;
  }

  return state.doodles.queries[serializedQuery].map(function (globalId) {
    return getDoodle(state, globalId);
  }).filter(Boolean);
}

/**
 * Returns true if currently requesting doodles for the doodles query, or false
 * otherwise.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Object}  query  Doodle query object
 * @return {Boolean}        Whether doodles are being requested
 */
function isRequestingDoodlesForQuery(state, query) {
  var serializedQuery = (0, _utils.getSerializedDoodlesQuery)(query);
  return !!state.doodles.queryRequests[serializedQuery];
}

/**
 * Returns the number of total pages available for a given query.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Object}  query  Doodle query object
 * @return {int}            Number of pages
 */
function getTotalPagesForQuery(state, query) {
  var serializedQuery = (0, _utils.getSerializedDoodlesQuery)(query);
  if (!state.doodles.totalPages[serializedQuery]) {
    return 1;
  }

  return parseInt(state.doodles.totalPages[serializedQuery], 10);
}

/**
 * Returns true if a request is in progress for the specified doodle, or
 * false otherwise.
 *
 * @param  {Object}  state     Global state tree
 * @param  {String}  doodleSlug  Doodle Slug
 * @return {Boolean}           Whether request is in progress
 */
function isRequestingDoodle(state, doodleSlug) {
  if (!state.doodles.requests) {
    return false;
  }

  return !!state.doodles.requests[doodleSlug];
}

/**
 * Returns the Doodle ID for a given page slug
 *
 * @param  {Object}  state  Global state tree
 * @param  {string}  slug   Doodle slug
 * @return {int}            Doodle ID
 */
function getDoodleIdFromSlug(state, slug) {
  if (!state.doodles.slugs[slug]) {
    return false;
  }

  return state.doodles.slugs[slug];
}