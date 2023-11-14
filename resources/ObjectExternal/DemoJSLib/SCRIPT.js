var DemoJSLib = DemoJSLib || (() => {
	const app  = simplicite.session(); // Client lib is referenced in Java code
	app.info(`Using lib version: ${simplicite.constants.MODULE_VERSION}`);

	const prd = app.getBusinessObject('DemoProduct');
	const ord = app.getBusinessObject('DemoOrder');

	const product = evt => $ui.displayForm(null, prd.getName(), $(evt.target).data('row_id'), { nav: 'add' });
	
	const order = evt => {
		const prd = $(evt.target).data('item');
		ord.getForCreate().then(item => {
			item.demoOrdPrdId = prd.row_id;
			// Populate other referenced fields
			for (const f in prd)
				if (typeof item[`demoOrdPrdId__${f}`] !== "undefined")
					item[`demoOrdPrdId__${f}`] = prd[f];
			$ui.displayForm(null, ord.getName(), app.constants.DEFAULT_ROW_ID, { nav: 'add', metadata: true, values: item });
		});
	};

	function render(params) {
		prd.search({ demoPrdAvailable: true }).then(list => {
			const indicators = $('#demojslib .carousel-indicators').empty();
			const products = $('#demojslib .carousel-inner').empty();
			let i = 0;
			for (const item of list) {
				const b = $('<button/>')
					.attr('data-bs-target', '#demojslib')
					.attr('data-bs-slide-to', i)
					.attr('aria-label', item.demoPrdReference);
				if (i == 0)
					b.addClass('active').attr('aria-active', true);
				indicators.append(b);
				products.append($(`<div class="carousel-item${i == 0 ? ' active' : ''}"/>`)
					.append($('<div class="product"/>')
						.append($('<div/>').append($('<img/>')
							.attr('src', prd.getFieldDocumentURL('demoPrdPicture', item))
							.data('row_id', item.row_id)
							.click(product)))
						.append($('<div/>')
							.append($('<h1/>').text(item.demoPrdName))
							.append($('<h2/>').text(item.demoPrdReference))
							.append($('<p/>').html(item.demoPrdDescription))
							.append($('<button/>')
								.text('Order!')
								.data('item', item)
								.click(order))
						)
					)
				);
				i++;
			}
		});
	}

	return { render: render };
})();