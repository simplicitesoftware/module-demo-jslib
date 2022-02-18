const DemoJSLib = (() => {
	function render(params) {
		const app = simplicite.session();
		app.info(`Using lib version: ${simplicite.constants.MODULE_VERSION}`);

		const prd = app.getBusinessObject('DemoProduct');
		prd.search({ demoPrdAvailable: true }).then(list => {
			const p = $('<ul/>');
			for (const item of list) {
				p.append($('<li/>')
					.append($('<img/>').attr('src', prd.getFieldDocumentURL('demoPrdPicture', item)))
					.append($('<h1/>').text(item.demoPrdName))
					.append($('<h2/>').text(item.demoPrdReference))
					.append($('<p/>').html(item.demoPrdDescription))
				);
			}
			$('#demojslib').append(p);
		});
	}

	return {
		render: (params) => {
			$ui.loadScript({
				url: "https://unpkg.com/simplicite/dist/simplicite.min.js",
				onload: () => render(params)
			});
		}
	};
})();