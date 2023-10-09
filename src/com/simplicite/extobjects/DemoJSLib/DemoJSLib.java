package com.simplicite.extobjects.DemoJSLib;

public class DemoJSLib extends com.simplicite.webapp.web.ResponsiveExternalObject {
	private static final long serialVersionUID = 1L;

	@Override
	public void init(com.simplicite.util.tools.Parameters params) {
		// Add Simplicité client lib
		addSimpliciteClient();
	}
}
