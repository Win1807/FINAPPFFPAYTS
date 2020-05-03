/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([], function() {
	"use strict";

	/**
	 * View mode for current user (reduces activities)
	 */
	var FIELDS = [{
		field: "PaymentRequestType",
		group: "PayrqTypeGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PaymentRequestVariant",
		group: "PayrqTypeGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // X (not available)
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						available: false
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // X (not available)
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						available: false
					}
				}
			}
		}
	}, {
		field: "RepetitiveCode",
		group: "PayrqTypeGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // X (not available)
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						available: false
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // X (not available)
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						available: false
					}
				}
			}
		}
	}, {
		field: "Supplier",
		group: "PayeeNameGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // X (not available)
						available: false
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // X (not available)
						available: false
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "Customer",
		group: "PayeeNameGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // X (not available)
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						available: false
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // X (not available)
						available: false
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // X (not available)
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						available: false
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // X (not available)
						available: false
					}
				}
			}
		}
	}, {
		field: "PayeeName",
		group: "PayeeNameGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeTitle",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeAdditionalName2",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeAdditionalName3",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeAdditionalName4",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeStreet",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeePostalCode",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeCityName",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeCountry",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeRegion",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeePOBox",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "POBoxPostalCode",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeLanguage",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeTelephoneNumber",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeFaxNumber",
		group: "PayeeDetailsGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "SupplierBankType",
		group: "PayeeBankGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // X (not available)
						available: false
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // X (not available)
						available: false
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // X (not available)
						available: false
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "CustomerBankType",
		group: "PayeeBankGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // X (not available)
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						available: false
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // X (not available)
						available: false
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // X (not available)
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						available: false
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // X (not available)
						available: false
					}
				}
			}
		}
	}, {
		field: "PayeeBankCountry",
		group: "PayeeBankGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeBank",
		group: "PayeeBankGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeBankInternalID",
		group: "PayeeBankGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	},{
		field: "PayeeBankAccount",
		group: "PayeeBankGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeIBAN",
		group: "PayeeBankGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "BankAccountHolderName",
		group: "PayeeBankGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "BankDetailReference",
		group: "PayeeBankGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayeeBankControlKey",
		group: "PayeeBankGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "CompanyCode",
		group: "PostingGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "BusinessArea",
		group: "PostingGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "FinancialAccountType",
		group: "PostingGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // X (not available)
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						available: false
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // X (not available)
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						available: false
					}
				}
			}
		}
	}, {
		field: "CustomerSupplierAccount",
		group: "PostingGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // X (not available)
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						available: false
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // X (not available)
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						available: false
					}
				}
			}
		}
	}, {
		field: "DocumentItemText",
		group: "PostingGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "AccountingDocument",
		group: "PostingGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "ClearingAccountingDocument",
		group: "PostingGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PayingCompanyCode",
		group: "HouseBankGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "HouseBank",
		group: "HouseBankGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "HouseBankAccount",
		group: "HouseBankGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PaymentRequestAmountInPaytCrcy",
		group: "PaymentDataGroup",
		currency: "PaymentRequestCurrency",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PaymentRequestCurrency",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PaymentRequestAmountInCCCrcy",
		group: "PaymentDataGroup",
		currency: "CompanyCodeCurrency",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "CompanyCodeCurrency",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PaymentMethod",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						editable: false,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				supplier: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				customer: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				},
				repcode: {
					properties: { // M (mandatory)
						editable: true,
						mandatory: true,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PaymentMethodSupplement",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "ValueDate",
		date: true,
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PaymentRequestPostingDate",
		date: true,
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "PaymentReference",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "ReferenceTypeText",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "IsSinglePayment",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "DataExchangeInstruction",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "DataExchangeInstruction1",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "DataExchangeInstruction2",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "DataExchangeInstruction3",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "DataExchangeInstruction4",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "StateCentralBankPaymentReason",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "SupplyingCountry",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "TaxID1",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "BankChain",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}, {
		field: "IsUrgentPayment",
		group: "PaymentDataGroup",
		appModeRequest: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // E (editable)
						editable: true,
						mandatory: false,
						available: true
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		},
		appModeProcess: {
			actionCreate: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionEdit: {
				ffp: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				supplier: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				customer: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				},
				repcode: {
					properties: { // X (not available)
						editable: false,
						mandatory: false,
						available: false
					}
				}
			},
			actionDisplay: {
				ffp: {
					properties: { // D (display)
						available: true
					}
				},
				supplier: {
					properties: { // D (display)
						available: true
					}
				},
				customer: {
					properties: { // D (display)
						available: true
					}
				},
				repcode: {
					properties: { // D (display)
						available: true
					}
				}
			}
		}
	}];

	return {
		FIELDS: FIELDS
	};
});