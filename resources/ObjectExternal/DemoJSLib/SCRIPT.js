const DemoJSLib = (() => {
	const app  = simplicite.session(); // Client lib is referenced in Java code
	app.info(`Using lib version: ${simplicite.constants.MODULE_VERSION}`);

	const prd = app.getBusinessObject('DemoProduct');
	const ord = app.getBusinessObject('DemoOrder');

	function product(evt) {
		$ui.displayForm(null, prd.getName(), $(this).parent().data('item').row_id, { nav: 'add' });
	}
	
	function order(evt) {
		const prd = $(this).parent().data('item');
		ord.getForCreate().then(item => {
			item.demoOrdPrdId = prd.row_id;
			// Populate other referenced fields
			for (const f in prd)
				if (typeof item[`demoOrdPrdId__${f}`] !== "undefined")
					item[`demoOrdPrdId__${f}`] = prd[f];
			$ui.displayForm(null, 'DemoOrder', app.constants.DEFAULT_ROW_ID, { nav: 'add', metadata: true, values: item });
		});
	}

	function render(params) {
		prd.search({ demoPrdAvailable: true }).then(list => {
			const p = $('<ul/>');
			for (const item of list) {
				p.append($('<li/>').data('item', item)
					.append($('<img/>').attr('src', prd.getFieldDocumentURL('demoPrdPicture', item)).click(product))
					.append($('<h1/>').text(item.demoPrdName))
					.append($('<h2/>').text(item.demoPrdReference))
					.append($('<p/>').html(item.demoPrdDescription))
					.append($('<button/>').text('Order !').click(order))
				);
			}
			$('#demojslib').html(p);
		});
	}

	return { render: render };
})();