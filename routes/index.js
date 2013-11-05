module.exports.init = function (app) {
	require('./authentication').init(app);
	require('./game').init(app);
	require('./textures').init(app);
};