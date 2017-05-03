const Datastore = require('@google-cloud/datastore');
const projectId = 'slurp-165217';
const datastore = Datastore({
  projectId: projectId
});

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.getSoilMeasures = function getSoilMeasures (req, res) {

  let limit = parseInt(req.query.limit) || 25;
  let offset = parseInt(req.query.offset) || 0;
  let device = req.query.device_id || "39002d001051353338363333"

  const query = datastore.createQuery('soil_measure')
  .filter('device_id', device)
  .order('published_at', {
    descending: true
  })
  .offset(offset)
  .limit(limit);

  datastore.runQuery(query)
  .then((results) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(results)
  });
};
