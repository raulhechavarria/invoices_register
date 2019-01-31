Ext.define('Entity', {
    extend: 'Ext.data.Model',
    idProperty : 'entity_id',
    fields: [{
        name: 'entity_id',
        type: 'int',
        useNull: true
    },'entity_name', 
		'entity_nit',
		'entity_reup_code',
		'entity_ministry',
		'entity_address']    
});

Ext.define('Invoice', {
    extend: 'Ext.data.Model',
    idProperty : 'invoice_id',
    fields: [{
        name: 'invoice_id',
        type: 'int',
        useNull: true
    },
    'invoice_bill', 
	'invoice_code',
	{name: 'invoice_value_cuc',  type: 'float'},
	{name: 'invoice_value_cup',  type: 'float'},
	{name: 'antiquity',  type: 'int'},
	'invoice_status',
	'invoice_transfer_details',
    {name: 'invoice_date', type: 'date', dateFormat: 'Y-m-d'}, 
	'entity_id',
	'entity_name']    
});

Ext.define('User', {
    extend: 'Ext.data.Model',
    idProperty : 'income_id',
    fields: [{
		        name: 'user_id',
		        type: 'int',
		        useNull: true
	    	},	    	
	       {name: 'user_firstname'},
	       {name: 'user_lastname'},
           {name: 'user_login'},
           {name: 'user_password'} 
    	]    
});