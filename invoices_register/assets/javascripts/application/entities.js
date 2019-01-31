var grid_entities = Ext.create('Ext.grid.Panel', {
	border: true,
	store: store_entities, 
    columns: columns_entities,
    height: 500,    
    tbar:[{
        text:'Adicionar',
        tooltip:'Adicionar nuevo empresa',
        iconCls:'add',
        handler: function (argument) {
        	var form_add_entity = Ext.create('Ext.form.Panel', {	 
			    bodyStyle:'padding:5px 5px 0',
			    width: 350,
			    fieldDefaults: {
			        msgTarget: 'side',
			        labelWidth: 90
			    },
			    defaultType: 'textfield',
			    defaults: {
			        anchor: '100%'
			    },
			
			    items: [{
			                fieldLabel: 'Nombre',
			                name: 'entity_name', 
			                allowBlank: false,
			                blankText: 'Este campo es requerido',			                							                
			            },{
			                fieldLabel: 'NIT',
			                name: 'entity_nit', 
			                allowBlank: false,
			                blankText: 'Este campo es requerido',			                							                
			            },{
			                fieldLabel: 'C&oacute;digo REUP',
			                name: 'entity_reup_code', 
			                allowBlank: false,
			                blankText: 'Este campo es requerido',			                							                
			            },{
			                fieldLabel: 'Ministerio',
			                name: 'entity_ministry', 
			                allowBlank: false,
			                blankText: 'Este campo es requerido',			                							                
			            },{
			                fieldLabel: 'Direcci&oacute;n',
			                name: 'entity_address', 
			                allowBlank: false,
			                blankText: 'Este campo es requerido',			                							                
			            }
		                ],
			
			    buttons: [{
			        text: 'Guardar',
			        formBind: true,
					disabled: true,
			        handler: function (){						        	
			        	entity = new Entity({
							'entity_name' : form_add_entity.items.get(0).getValue(),
				            'entity_nit' : form_add_entity.items.get(1).getValue(),
				            'entity_reup_code' : form_add_entity.items.get(2).getValue(),
				            'entity_ministry' : form_add_entity.items.get(3).getValue(),
				            'entity_address' : form_add_entity.items.get(3).getValue()	            	            
				            }			            			            						
						); 
				        store_entities.add(entity);		        
				        form_add_entity.getForm().reset();
				        store_entities.sync();	        
						win_add_entity.close();
			        }
			    },{
			        text: 'Cancelar',
			        handler: function (){	            	
				        form_add_entity.getForm().reset();	        
						win_add_entity.close();
			        }}]
			});
			
			
			
			var win_add_entity = new Ext.Window({	
			    title: 'Adicionar nueva empresa',
			    modal: true,
			    closable:true,
			    closeAction: 'hide',
			    width:350,						    					    
			    plain:true,
			    layout: 'fit',
			    items: [form_add_entity]
			});
			win_add_entity.show();	  
		}
    }, '-', {
        text:'Editar',
        tooltip:'Editar empresa seleccionado',
        iconCls:'edit',
        handler: function (argument) {
        	var selection = grid_entities.getView().getSelectionModel().getSelection()[0];
            if (selection) {	                    	
            	if(!form_edit_entity){                    		
            	    
                	var form_edit_entity = Ext.create('Ext.form.Panel', {										
					    bodyStyle:'padding:5px 5px 0',
					    width: 350,
					    fieldDefaults: {
					        msgTarget: 'side',
					        labelWidth: 90
					    },
					    defaultType: 'textfield',
					    defaults: {
					        anchor: '100%'
					    },
					
					    items: [{
					                fieldLabel: 'Nombre',
					                name: 'entity_name', 
					                allowBlank: false,
					                blankText: 'Este campo es requerido',
					                value: selection.get('entity_name')			                							                
					            },{
					                fieldLabel: 'NIT',
					                name: 'entity_nit', 
					                allowBlank: false,
					                blankText: 'Este campo es requerido',
					                value: selection.get('entity_nit')			                							                
					            },{
					                fieldLabel: 'C&oacute;dio REUP',
					                name: 'entity_reup_code', 
					                allowBlank: false,
					                blankText: 'Este campo es requerido',
					                value: selection.get('entity_reup_code')			                							                
					            },{
					                fieldLabel: 'Ministerio',
					                name: 'entity_ministry', 
					                allowBlank: false,
					                blankText: 'Este campo es requerido',
					                value: selection.get('entity_ministry')			                							                
					            },{
					                fieldLabel: 'Direcci&oacute;n',
					                name: 'entity_address', 
					                allowBlank: false,
					                blankText: 'Este campo es requerido',
					                value: selection.get('entity_address')			                							                
					            },
				               ],
					
					    buttons: [{
					        text: 'Editar',
					        formBind: true,
							disabled: true,
					        handler: function (){											
								var entity = grid_entities.getView().getSelectionModel().getSelection()[0];
								
								entity.set('entity_name', form_edit_entity.items.get(0).getValue());
								entity.set('entity_nit', form_edit_entity.items.get(1).getValue());
								entity.set('entity_reup_code', form_edit_entity.items.get(2).getValue());
								entity.set('entity_ministry', form_edit_entity.items.get(3).getValue());
								entity.set('entity_address', form_edit_entity.items.get(4).getValue());
																					        
						        form_edit_entity.getForm().reset();
						        store_entities.sync();	  	        
								win_edit_entity.close();
					        }
					    },{
					        text: 'Cancelar',
					        handler: function (){								        		            	
						        form_edit_entity.getForm().reset();	        
								win_edit_entity.close();
					        }}]
					});
            	}
            	
            	var win_edit_entity = new Ext.Window({	
					title: 'Editar empresa',
					modal: true,
					closable:true,
					closeAction: 'hide',							    
					width:350,															
					plain:true,
					layout: 'fit',
					    items: [form_edit_entity]
				});
				
                win_edit_entity.show();
            }
	      	else
	      	{
	      		Ext.MessageBox.alert('Advertencia', 'Debe seleccionar una empresa!');
	      	}	  
		}
    },'-',{
        text:'Eliminar',
        tooltip:'Elimina una empresa',
        iconCls:'remove',
        handler: function (argument) {
        	var selection = grid_entities.getView().getSelectionModel().getSelection()[0];
            if (selection) {
            	Ext.Msg.show({
			        title: 'Confirmar',
			        msg: 'Desea eliminar la empresa?',
			        buttons: Ext.Msg.YESNO,
			        fn: function(btn) {
			            if (btn == 'yes') {
			                store_entities.remove(selection);
			                store_entities.sync();
			            }
			        }
			    });
                
            }
	      	else
	      	{
	      		Ext.MessageBox.alert('Advertencia', 'Debe seleccionar una empresa!');
	      	}
        } 
    }], bbar: Ext.create('Ext.PagingToolbar', {
        store: store_entities,
        displayInfo: true,
        displayMsg: 'Mostrar empresas {0} - {1} de {2}',
        emptyMsg: "Ning&uacute;n empresa para mostrar",
        items:[
            '-',
        ]
   })
});