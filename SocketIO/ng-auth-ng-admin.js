module.exports = function($Socket){
	return $Socket.on('connection', function (_Socket) {
		_Socket.on('ng-auth-ng-admin', function (data) {
			console.log(data);
		})
	})
}
