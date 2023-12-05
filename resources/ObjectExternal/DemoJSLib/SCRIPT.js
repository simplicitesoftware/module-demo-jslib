var DemoJSLib = DemoJSLib || (() => {
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
			$ui.displayForm(null, ord.getName(), app.constants.DEFAULT_ROW_ID, { nav: 'add', metadata: true, values: item });
		});
	}

	function render(params) {
		prd.search({ demoPrdAvailable: true }).then(list => {
			const products = $('#demojslib').empty().addClass("row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5");
			let i = 0;
			for (const item of list) {
				products.append(
					$('<div class="col"/>')
						.append($('<div class="card"/>')
							.data('item', item)
							.append($('<img/>').attr('src', prd.getFieldDocumentURL('demoPrdPicture', item)).click(product))
							.append($('<div class="card-body"/>')
								.append($('<h5 class="card-title"/>').text(item.demoPrdName))
								.append($('<h6 class="card-subtitle mb2-2 text-muted"/>').text(item.demoPrdReference))
								.append($('<p class="card-text"/>').html(item.demoPrdDescription))
								.append($('<button class="btn btn-primary"/>').text('Order !').click(order))
							)
						)
				);
				i++;
			}
		});
	}

	return { render: render };
})();