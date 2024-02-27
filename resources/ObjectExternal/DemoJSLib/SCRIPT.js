//-----------------------------------------------------------
// Client side JavaScript for JSLib demo page
//-----------------------------------------------------------

class DemoJSLib {

	static render(params) {
		const app = simplicite.session(); // Client lib is referenced in Java code
		app.info(`Using lib version: ${simplicite.constants.MODULE_VERSION}`);

		const prd = app.getBusinessObject('DemoProduct');
		const ord = app.getBusinessObject('DemoOrder');

		prd.search({ demoPrdAvailable: true }).then(list => {
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

			const products = $('#demojslib').empty().addClass("row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5");
			let i = 0;
			for (const item of list) {
				products.append(
					$('<div class="col"/>')
						.append($('<div class="card"/>')
							.append($('<div class="card-body"/>')
								.append($('<img class="btn"/>').data('row_id', item.row_id).attr('src', prd.getFieldDocumentURL('demoPrdPicture', item)).on('click', product))
								.append($('<h5 class="card-title"/>').text(item.demoPrdName))
								.append($('<h6 class="card-subtitle mb2-2 text-muted"/>').text(item.demoPrdReference))
								.append($('<p class="card-text"/>').html(item.demoPrdDescription))
								.append($('<button class="btn btn-primary"/>').text('Order !').data('item', item).on('click', order))
							)
						)
				);
				i++;
			}
		});
	}
	
}