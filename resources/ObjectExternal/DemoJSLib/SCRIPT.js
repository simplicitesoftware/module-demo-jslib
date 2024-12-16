//-----------------------------------------------------------
// Client side JavaScript for JSLib demo page
//-----------------------------------------------------------

/* global simplicite */

class DemoJSLib { // eslint-disable-line no-unused-vars
	static render(_params) {
		const app = simplicite.session(); // Client lib is referenced in Java code
		app.info(`Using lib version: ${simplicite.constants.MODULE_VERSION}`);

		const prd = app.getBusinessObject('DemoProduct');
		const ord = app.getBusinessObject('DemoOrder');

		prd.search({ demoPrdAvailable: true }).then(list => {
			const productForm = evt => $ui.displayForm(null, prd.getName(), $(evt.target).data('row_id'), { nav: 'add' });
			const productDoc = evt => $tools.dialog($(evt.target).data('doc'));

			const order = evt => {
				const itm = $(evt.target).data('item');
				ord.getForCreate().then(item => {
					item.demoOrdPrdId = itm.row_id;
					// Populate other referenced fields
					for (const f in itm)
						if (typeof item[`demoOrdPrdId__${f}`] !== 'undefined')
							item[`demoOrdPrdId__${f}`] = itm[f];
					$ui.displayForm(null, ord.getName(), app.constants.DEFAULT_ROW_ID, { nav: 'add', metadata: true, values: item });
				});
			};

			const products = $('#demojslib').empty().addClass('row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5');
			for (const item of list) {
				products.append(
					$('<div class="col"/>')
						.append($('<div class="card"/>')
							.append($('<div class="card-body"/>')
								.append($('<img class="btn"/>').data('row_id', item.row_id).attr('src', prd.getFieldDocumentURL('demoPrdPicture', item, true)).on('click', productForm))
								.append($('<h5 class="card-title"/>').text(item.demoPrdName))
								.append($('<h6 class="card-subtitle mb2-2 text-muted"/>').text(item.demoPrdReference))
								.append($('<p class="card-text"/>').css('cursor', 'pointer').data('doc', { width: '50%', title: item.demoPrdName, content: $('<div class="demojslib-doc"/>').append($('<img/>').attr('src', prd.getFieldDocumentURL('demoPrdPicture', item))).append('<hr/>').append(item.demoPrdDocumentation), closeable: true, moveable: true }).html(item.demoPrdDescription).on('click', productDoc))
								.append($('<button class="btn btn-primary"/>').text('Order !').data('item', item).on('click', order))
							)
						)
				);
			}
		});
	}
}