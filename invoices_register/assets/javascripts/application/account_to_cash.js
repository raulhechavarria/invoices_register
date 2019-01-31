Ext.define('DaysFilter', {
        extend: 'Ext.data.Model',
        fields: [
            {type: 'int', name: 'value'},
            {type: 'string', name: 'name'}
        ]
    });
    
var days_filter = [
  {"value":1,"name":"<30"},
  {"value":2,"name":"60><90"},
  {"value":3,"name":"90><120"},
  {"value":4,"name":">120"},
];

var daysless30 = new Ext.util.Filter({
    filterFn: function(item) {
        return item.data.antiquity <= 30;
    }
});

var daysbetween60and90 = new Ext.util.Filter({
    filterFn: function(item) {
        return item.data.antiquity >= 60 && item.data.antiquity < 90;
    }
});

var daysbetween90and120 = new Ext.util.Filter({
    filterFn: function(item) {
    	
    	if(item.data.antiquity >= 90 && item.data.antiquity < 120)
    	{
    		console.log(item.data.antiquity);
    		return true;
    	}
    	else
    	{
    		return false;
    	}        
    }
});

var daysmore120 = new Ext.util.Filter({
    filterFn: function(item) {
        return item.data.antiquity >= 120;
    }
});

var days_filter_store = Ext.create('Ext.data.Store', {
    model: 'DaysFilter',
    data: days_filter
});

var grid_account_to_cash = Ext.create('Ext.grid.Panel', {
	border: true,
	store: store_account_to_cash, 
    columns: columns_account_to_cash,    
    height: 600,    
    tbar:[{
            text:'Imprimir cuentas por cobrar',
            iconCls: 'pdf',
            handler : function(){
            	Ext.Msg.show({
				        title: 'Confirmar',
				        msg: 'Desea imprimir el reporte?',
				        buttons: Ext.Msg.YESNO,
				        fn: function(btn) {
				            if (btn == 'yes') {
				            	window.open(BASE_URL + 'reports/print_account_to_cash_to_pdf');    
				            }
				        }
				    });              
            }
        },'->',{
	    id:'id_combox_filter',
            xtype: 'combobox',
            store: days_filter_store,
            valueField: 'value',
            displayField: 'name',            
	    editable: false,   
            queryMode: 'local',
	   // typeAhead: true,		    							
            emptyText: 'Filtrar por dias...',
            listeners:{		         
		         'select': function(field, value){
					//console.log(value[0].data.value);		         	
		         	switch(value[0].data.value)
		         	{
		         		case 1:
					//  alert(value[0].data.name);
					//   Ext.getCmp('id_combox_filter').setRawValue(value[0].data.name);
						store_account_to_cash.clearFilter();
		         			store_account_to_cash.filter(daysless30);
		         			break;
		         		case 2:
						store_account_to_cash.clearFilter();
		         			store_account_to_cash.filter(daysbetween60and90);
		         			break;
		         		case 3:
						store_account_to_cash.clearFilter();
		         			store_account_to_cash.filter(daysbetween90and120);
		         			break;
	         			case 4:
						store_account_to_cash.clearFilter();
		         			store_account_to_cash.filter(daysmore120);
		         			break;	
		         	}	                
					
					//this.reset();	
	            }
		    }
        },'-',{
	    id:'id_date_filter',
            xtype: 'datefield',
            emptyText: 'Filtrar por fecha...',
            labelWidth: 40,
            listeners:{		         
		         'select': function(field, value){ 		         		                
					store_account_to_cash.filter('invoice_date', value);										
					//this.reset();
	            }
		    }
	},'-',
        {
            text:'Eliminar Filtro',
            iconCls: 'arrow_divide',
            handler : function(){
            	store_account_to_cash.clearFilter();  
		Ext.getCmp('id_combox_filter').reset();
		Ext.getCmp('id_date_filter').reset();
            }
        }], bbar: Ext.create('Ext.PagingToolbar', {
        store: store_invoices,
        displayInfo: true,
        displayMsg: 'Mostrar cuentas por cobrar {0} - {1} de {2}',
        emptyMsg: "Ninguna cuenta por cobrar para mostrar",
        items:[
            '-',
        ]
   })
});