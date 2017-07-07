module.exports = $Socket => {
	let $Categories = [];
	return $Socket.on('connection', _Socket => {
		$Socket.emit('Category.Data.get', $Categories);
		_Socket.on('Category.Form.add', Category => {
			Object.assign(Category, {
				createdAt: Date.now(),
				updatedAt: Date.now()
			});
			$Categories.unshift(Category);
			$Socket.emit('Category.Data.add', Category);
		});
		_Socket.on('Category.Form.update', Category => {
			Object.keys($Categories).map($key => {
				if ( Category.UUID === $Categories[$key].UUID ) {
					Object.assign($Categories[$key], {
						name: Category.name,
						updatedAt: Date.now()
					});
				}
			});
			$Socket.emit('Category.Data.update', Category);
		});
		_Socket.on('Category.Data.delete', UUID => {
			$Categories = $Categories.filter($Category => {
				return $Category.UUID !== UUID;
			});
			$Socket.emit('Category.Data.delete', UUID);
		});
	});
};
