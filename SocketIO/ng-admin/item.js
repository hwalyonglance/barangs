module.exports = $Socket => {
	let $Items = [];
	return $Socket.on('connection', _Socket => {
		$Socket.emit('Item.Data.get', $Items);
		_Socket.on('Item.Form.add', Item => {
			Object.assign(Item, {
				createdAt: Date.now(),
				updatedAt: Date.now()
			});
			$Items.unshift(Item);
			$Socket.emit('Item.Data.add', Item);
		});
		_Socket.on('Item.Form.update', Item => {
			Object.keys($Items).map($key => {
				if ( Item.UUID === $Items[$key].UUID ) {
					Object.assign($Items[$key], Item);
					Object.assign($Items[$key], {
						updatedAt: Date.now()
					});
				}
			});
			$Socket.emit('Item.Data.update', Item);
		});
		_Socket.on('Item.Data.delete', UUID => {
			$Items = $Items.filter($Item => {
				return $Item.UUID !== UUID;
			});
			$Socket.emit('Item.Data.delete', UUID);
		});
	});
};



















