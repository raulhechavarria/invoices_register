//Stores
var store_entities = Ext.create('Ext.data.Store', {
	id: 'store_entities',	
    model: 'Entity',    
    autoLoad: false,
    autoSync: false,
    proxy: {
            type: 'rest',
            url: BASE_URL + 'restentities/entity',
            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success',                
                messageProperty: 'message',
                idProperty: 'entity_id'
            },
            writer: {
                type: 'json'  
            },
            listeners: {
                exception: function(proxy, response, operation){
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });                
                }
            }
        }
});

var store_invoices = Ext.create('Ext.data.Store', {
	id: 'store_invoices',	
    model: 'Invoice',    
    autoLoad: false,
    autoSync: false,
    proxy: {
            type: 'rest',
            url: BASE_URL + 'restinvoices/invoice',
            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success',                
                messageProperty: 'message',
                idProperty: 'invoice_id'
            },
            writer: {
                type: 'json'  
            },
            listeners: {
                exception: function(proxy, response, operation){
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });                
                }
            }
        }
});

var store_account_to_cash = Ext.create('Ext.data.Store', {
	id: 'store_account_to_cash',	
    model: 'Invoice',    
    autoLoad: false,
    autoSync: false,
    proxy: {
            type: 'rest',
            url: BASE_URL + 'restinvoices/account_to_cash',
            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success',                
                messageProperty: 'message',
                idProperty: 'invoice_id'
            },
            writer: {
                type: 'json'  
            },
            listeners: {
                exception: function(proxy, response, operation){
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });                
                }
            }
        }
});

var store_users = Ext.create('Ext.data.Store', {
	id: 'store_users',	
    model: 'User',
    autoLoad: false,
    autoSync: false,
    proxy: {
            type: 'rest',
            url: BASE_URL + 'restusers/user',
            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success',                
                messageProperty: 'message',
                idProperty: 'user_id'
            },
            writer: {
                type: 'json'  
            },
            listeners: {
                exception: function(proxy, response, operation){
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });                
                }
            }
        }
});