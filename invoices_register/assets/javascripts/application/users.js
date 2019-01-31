var form_add_user = Ext.create('Ext.form.Panel', {	 
    bodyStyle:'padding:5px 5px 0',
    width: 350,
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 75
    },
    defaultType: 'textfield',
    defaults: {
        anchor: '100%'
    },

    items: [{
        fieldLabel: 'Nombre',
        name: 'user_firstname',
        allowBlank:false
    },{
        fieldLabel: 'Apellidos',
        name: 'user_lastname',
        allowBlank:false
    },{
        fieldLabel: 'Usuario',
        name: 'user_login',
        allowBlank:false
    },{
        fieldLabel: 'Contrase&ntilde;a',
        name: 'user_password',
        id: 'user_password',
        inputType: 'password',
        allowBlank:false
    },{
        fieldLabel: 'Repetir Contrase&ntilde;a',
        name: 'user_password_repeat',
        inputType: 'password',
        vtype: 'password',
        initialPassField: 'user_password',
        allowBlank:false
    }],

    buttons: [{
        text: 'Guardar',
        formBind: true,
		disabled: true,
        handler: function (){        	        	
        	user = new User({
					'user_firstname' : form_add_user.items.get(0).getValue(),
					'user_lastname' : form_add_user.items.get(1).getValue(),
					'user_login' : form_add_user.items.get(2).getValue(),
					'user_password' : form_add_user.items.get(3).getValue(),             	            
	            }			            			            						
			);       		            	
			
	        store_users.add(user);	        
			store_users.sync();			        
	        form_add_user.getForm().reset();	        
			win_add_user.close();
        }
    },{
        text: 'Cancelar',
        handler: function (){	            	
	        form_add_user.getForm().reset();	        
			win_add_user.close();
        }}]
});

var win_add_user = new Ext.Window({	
    title: 'Adicionar nuevo usuario',
    modal: true,
    closable:true,
    closeAction: 'hide',
    width:350,
    height:350,
    //border:false,
    plain:true,
    layout: 'fit',
    items: [form_add_user]
});

var grid_users = Ext.create('Ext.grid.Panel', {
	border: true,
	height: 600,
	store: store_users, 
    columns: columns_users,
    tbar:[{
                    text:'Adicionar',
                    tooltip:'Adicionar nuevo usuario',
                    iconCls:'add',
                    handler: function (argument) {
						win_add_user.show();	  
					}
                }, '-', {
                    text:'Editar',
                    tooltip:'Editar el usuario seleccionada',
                    iconCls:'edit',
                    handler: function (argument) {
                    	var selection = grid_users.getView().getSelectionModel().getSelection()[0];
			
	                    if (selection) {
	                    	
	                    	if(!form_edit_user){
	                    	
		                    	var form_edit_user = Ext.create('Ext.form.Panel', {										
								    bodyStyle:'padding:5px 5px 0',
								    width: 350,
								    fieldDefaults: {
									msgTarget: 'side',
									labelWidth: 75
								    },
								    defaultType: 'textfield',
								    defaults: {
									anchor: '100%'
								    },
								    items: [{
								        fieldLabel: 'Nombre',
								        name: 'user_firstname',
								        allowBlank:false,
								        value: selection.get('user_firstname')	        
								    },{
								        fieldLabel: 'Apellidos',
								        name: 'user_lastname',
								        allowBlank:false,
								        value: selection.get('user_lastname')	        
								    },{
								        fieldLabel: 'Usuario',
								        name: 'user_login',
								        allowBlank:false,
								        value: selection.get('user_login')	        
								    },{
									fieldLabel: 'Contrase&ntilde;a',
									name: 'user_password',
									id: 'user_password',
									inputType: 'password',
									allowBlank:false
								    },{
									fieldLabel: 'Repetir Contrase&ntilde;a',
									name: 'user_password_repeat',
									inputType: 'password',
									vtype: 'password',
									initialPassField: 'user_password',
									allowBlank:false
								    }],				
								
								    buttons: [{
								        text: 'Guardar',
								        handler: function (){
								        	
											var user = grid_users.getView().getSelectionModel().getSelection()[0];
											
											user.set('user_firstname', form_edit_user.items.get(0).getValue());
											user.set('user_lastname', form_edit_user.items.get(1).getValue());
											user.set('user_login', form_edit_user.items.get(2).getValue());
											user.set('user_password' , form_edit_user.items.get(3).getValue()); 
											
											store_users.sync();		        
									        form_edit_user.getForm().reset();	        
											win_edit_user.close();
								        }
								    },{
								        text: 'Cancelar',
								        handler: function (){	            	
									        form_edit_user.getForm().reset();	        
											win_edit_user.close();
								        }}]
								});
	                    	}
	                    	
	                    	var win_edit_user = new Ext.Window({	
								title: 'Editar usuario',
								modal: true,
								closable:true,
								closeAction: 'hide',							    
								width:350,
								height:150,
								//border:false,
								plain:true,
								layout: 'fit',
								    items: [form_edit_user]
							});
							
	                        win_edit_user.show();
	                    }
				      	else
				      	{
				      		Ext.MessageBox.alert('Advertencia', 'Debe seleccionar un usuario para editar!');
				      	}	  
					}
                },'-',{
                    text:'Eliminar',
                    tooltip:'Eliminar el usuario seleccionado',
                    iconCls:'remove',
                    handler: function (argument) {
                    	var selection = grid_users.getView().getSelectionModel().getSelection()[0];
	                    if (selection) {
	                    	Ext.Msg.show({
						        title: 'Confirmar',
						        msg: 'Desea eliminar el usuario?',
						        buttons: Ext.Msg.YESNO,
						        fn: function(btn) {
						            if (btn == 'yes') {
						                store_users.remove(selection);						               
										store_users.sync();	
						            }
						        }
						    });
	                        
	                    }
				      	else
				      	{
				      		Ext.MessageBox.alert('Advertencia', 'Debe seleccionar un usuario!');
				      	}
                    } 
                }], bbar: Ext.create('Ext.PagingToolbar', {
		            store: store_users,
		            displayInfo: true,
		            displayMsg: 'Mostrar tipos de entidades {0} - {1} de {2}',
		            emptyMsg: "Ningun usuario para mostrar",
		            items:[
		                '-',
		            ]
		       })
});