module.exports.init = function (app, db) {
	app.post('/authenticate', authenticate);
	app.post('/refresh', refresh);
	app.post('/invalidate', invalidate);

	function authenticate(req, res) {
		var username = req.body.username;
		var password = req.body.password;
		var clientToken = req.body.clientToken;

		db.login(username, password, clientToken, function (user) {
			if (user) {
				res.send({
					'accessToken': user.accessToken,
					'clientToken': user.clientToken,
					'selectedProfile': user.profile,
					'availableProfiles': [user.profile]
				});
				res.end();
			} else {
				res.end("Bad login");
			}
		});
	}

	function refresh(req, res) {
		var clientToken = request.body.clientToken;
		var accessToken = request.body.accessToken;

		db.loginWithTokens(clientToken, accessToken, function (user) {
			if (user) {
				res.send({
					'accessToken': user.accessToken,
					'clientToken': user.clientToken,
					'selectedProfile': user.profile
				});
				res.end();
			} else {
				res.end("Bad login");
			}
		});
	}

	function invalidate(req, res) {
		var clientToken = request.body.clientToken;
		var accessToken = request.body.accessToken;

		db.destroyTokens(clientToken, accessToken, function () {
			res.end();
		})
	}
};