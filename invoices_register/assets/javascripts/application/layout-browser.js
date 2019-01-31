Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', BASE_PATH + '/ux');
Ext.Loader.setPath('Ext.app', 'classes');

Ext.require([
    'Ext.tip.QuickTipManager',
    'Ext.container.Viewport',
    'Ext.layout.*',
    'Ext.form.*',
    'Ext.grid.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.panel.*',
    'Ext.data.*',
    'Ext.tree.*',
    'Ext.selection.*',
    'Ext.tab.*',
    'Ext.ux.TabCloseMenu',
    'Ext.ux.layout.Center',
    'Ext.app.Portlet',
    'Ext.app.PortalColumn',
    'Ext.app.PortalPanel',
    'Ext.app.Portlet',
    'Ext.app.PortalDropZone',
    'Ext.app.GridPortlet',
    'Ext.app.ChartPortlet',
    'Ext.chart.*',
    'Ext.Window', 
    'Ext.fx.target.Sprite', 
    'Ext.layout.container.Fit'
]);

//
// This is the main layout definition.
//
Ext.onReady(function(){
 
    Ext.tip.QuickTipManager.init();
    
     // Add the additional 'advanced' VTypes
    Ext.apply(Ext.form.field.VTypes, {
        daterange: function(val, field) {
            var date = field.parseDate(val);

            if (!date) {
                return false;
            }
            if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                var start = field.up('form').down('#' + field.startDateField);
                start.setMaxValue(date);
                start.validate();
                this.dateRangeMax = date;
            }
            else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                var end = field.up('form').down('#' + field.endDateField);
                end.setMinValue(date);
                end.validate();
                this.dateRangeMin = date;
            }
            /*
             * Always return true since we're only using this vtype to set the
             * min/max allowed values (these are tested for after the vtype test)
             */
            return true;
        },

        daterangeText: 'Start date must be less than end date',

        password: function(val, field) {
            if (field.initialPassField) {
                var pwd = field.up('form').down('#' + field.initialPassField);
                return (val == pwd.getValue());
            }
            return true;
        },

        passwordText: 'Passwords do not match'
    });

    // This is an inner body element within the Details panel created to provide a "slide in" effect
    // on the panel body without affecting the body's box itself.  This element is created on
    // initial use and cached in this var for subsequent access.
    var detailEl;
    
     var tools = [{
            xtype: 'tool',
            type: 'gear',
            handler: function(e, target, panelHeader, tool){
                var portlet = panelHeader.ownerCt;
                portlet.setLoading('Working...');
                Ext.defer(function() {
                    portlet.setLoading(false);
                }, 2000);
            }
        }];
    
    
    var tabs = Ext.createWidget('tabpanel', { 
    	autoDestroy: false,      
        resizeTabs: true,
        enableTabScroll: true,
        margins: '2 5 5 0',
        defaults: {
            autoScroll:true,
            bodyPadding: 10
        },
        items: [{	title: 'Tablero de Mando',                   
                    xtype: 'portalpanel',
                    region: 'center',
                    items: [{
                        id: 'col-1',
                        padding: '0 5 5 5',
                        items: [gridForm]
                    }]
                }]
    });
    
    // This is the main content center region that will contain each example layout panel.
    // It will be implemented as a CardLayout since it will contain multiple panels with
    // only one being visible at any given time.

    var contentPanel = {
         id: 'content-panel',
         region: 'center', // this is what makes this panel into a region within the containing layout
         layout: 'card',
         margins: '2 5 5 0',
         activeItem: 0,
         border: false,
         items: [tabs]
    };
     
    var tree_store = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true
        },
        proxy: {
            type: 'ajax',
            url: BASE_URL + 'administration/tree',
        }
    });
    
    // Go ahead and create the TreePanel now so that we can use it below
     var treePanel = Ext.create('Ext.tree.Panel', {
        title: 'Panel de Navegaci&oacute;n',
        region:'north',
        split: true,        
        width: 390,
        minSize: 300,
	height:300,
        rootVisible: false,
        autoScroll: true,
        store: tree_store
    });
    
    // Assign the changeLayout function to be called on tree node click.
    treePanel.getSelectionModel().on('select', function(selModel, record) {
	///detailsPanel.html("ad");
        if (record.get('leaf')) {      	
        	switch (record.getId()) {
        		case 'users':
			Ext.getCmp('details-panel').update("Usuarios del sistema, este sistema no necesita  roles  pues es una parte de un subproceso empresarial");  
                	var users = tabs.child('#users');
                	if(!users)
                	{                	
	                    tabs.add({
				            title: 'Usuarios',
				            iconCls: 'tabs',
				            itemId: 'users',
				            items:[grid_users],
				            closable: true
				        }).show();
				    }
				    else
				    {
				    	users.tab.show();
    					tabs.setActiveTab(users);
				    }				    
				    store_users.load();
			
                    break;                
                case 'invoices':
			Ext.getCmp('details-panel').update("Se gestionan las Facturas para el control  de el el tiempo de factura");
                	var invoices = tabs.child('#invoices');
	                if(!invoices)
	                {                 	
	                    tabs.add({
				            title: 'Gestionar Facturas',
				            iconCls: 'tabs',
				            itemId: 'invoices',
				            items:[grid_invoices],
				            closable: true
				        }).show();
				    }
				    else
				    {
				    	invoices.tab.show();
    					tabs.setActiveTab(invoices);
				    }				    
				    store_entities.load();	
				    store_invoices.load();			        
                    break;                               
                case 'entities':
			Ext.getCmp('details-panel').update("Gestionar Empresas que tienen facturas"); 
                	var entities = tabs.child('#entities');
	                if(!entities)
	                {                 	
	                    tabs.add({
				            title: 'Gestionar Empresas',
				            iconCls: 'tabs',
				            itemId: 'entities',
				            items:[grid_entities],
				            closable: true
				        }).show();
				    }
				    else
				    {
				    	entities.tab.show();
    					tabs.setActiveTab(entities);
				    }
				    store_entities.load();			        
                    break;                 
                 case 'account_to_cash_report':
		   
			Ext.getCmp('details-panel').update("Estado de las cuentas por cobrar, con filtro de 30 dias hasta mas de 120 dias");			  
                	var account_to_cash_report = tabs.child('#account_to_cash_report');
	                if(!account_to_cash_report)
	                {                 	
	                    tabs.add({
				            title: 'Estado de las cuentas por cobrar',
				            iconCls: 'tabs',
				            itemId: 'account_to_cash_report',
				            items:[grid_account_to_cash],
				            closable: true
				        }).show();
				    }
				    else
				    {
				    	account_to_cash_report.tab.show();
    					tabs.setActiveTab(account_to_cash_report);
				    }
				    store_account_to_cash.load();			        
                    break;                 
               case 'logout':
               		window.location = BASE_URL + 'administration/log_out'; 
               break;                  
            }
           
        }
    });
    
   
    // This is the Details panel that contains the description for each example layout.
    var detailsPanel = {
        id: 'details-panel',	
        title: 'Detalles',
        region: 'center',
        height: 180,
        html: '<p class="details-info">When you select a layout from the tree, additional details will display here.</p>'
    };
    
 
    // Finally, build the main layout once all the pieces are ready.  This is also a good
    // example of putting together a full-screen BorderLayout within a Viewport.
    Ext.create('Ext.Viewport', {
        layout: 'border',
        title: 'Portal Sketchup',
        items: [{
            xtype: 'box',
            id: 'header',
            region: 'north',
            html: '<div id="header"><div id="title"><h2>Sistema de Gesti&oacute;n de Cuentas por Cobrar</h2><h3>OTN Camag&utilde;ey</h3></div></div>',
            height: 100
        },{
            layout: 'border',
            id: 'layout-browser',
            region:'west',
            border: false,
            split:true,
            margins: '2 0 5 5',
            width: 241,
            minSize: 300,
            maxSize: 500,
            items: [treePanel, detailsPanel]
        }, 
            contentPanel
        ],
        renderTo: Ext.getBody()
    });
    
});

