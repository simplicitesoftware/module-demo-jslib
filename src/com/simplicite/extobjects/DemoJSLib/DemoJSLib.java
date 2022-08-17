package com.simplicite.extobjects.DemoJSLib;

/**
 * Simplicit&eacute;&reg; JS lib page
 */
public class DemoJSLib extends com.simplicite.webapp.web.ResponsiveExternalObject {
	private static final long serialVersionUID = 1L;

	@Override
	public void init(com.simplicite.util.tools.Parameters params) {
		addSimpliciteClient();
	}
}
