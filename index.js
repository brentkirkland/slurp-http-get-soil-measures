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

  const query = datastore.createQuery('soil_measure')
  .order('published_at', {
    descending: true
  })
  .offset(offset)
  .limit(limit);

  datastore.runQuery(query)
  .then((results) => {
    res.send(results)
  });
};
