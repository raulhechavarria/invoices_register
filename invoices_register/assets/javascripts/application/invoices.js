var grid_invoices = Ext.create('Ext.grid.Panel', {
	border: true,
	store: store_invoices, 
    columns: columns_invoices,
    height: 500,    
    tbar:[{
        text:'Adicionar',
        tooltip:'Adicionar nuevo factura',
        iconCls:'add',
        handler: function (argument) {
        	var form_add_invoice = Ext.create('Ext.form.Panel', {	 
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
			                fieldLabel: 'Cuenta',
			                name: 'invoice_bill', 
			                allowBlank: false,
			                blankText: 'Este campo es requerido',			                							                
			            },{
			                fieldLabel: 'C&oacute;digo',
			                name: 'invoice_code', 
			                allowBlank: false,
			                blankText: 'Este campo es requerido',			                							                
			            },{
			                fieldLabel: 'Monto CUC',
			                name: 'invoice_value_cuc', 
			                allowBlank: false,
			                blankText: 'Este campo es requerido',
			                xtype: 'numberfield',
					        maxValue: 9999999999,
					        minValue: 0,
					        minText: 'El valor m&iacute;nimo debe ser mayor que 0',
					        maxText: 'El valor m&aacute;ximo debe ser menor que 9999999999'			                							                
			            },{
			                fieldLabel: 'Monto CUP',
			                name: 'invoice_value_cup', 
			                allowBlank: false,
			                blankText: 'Este campo es requerido',
			                xtype: 'numberfield',
					        maxValue: 9999999999,
					        minValue: 0,
					        minText: 'El valor m&iacute;nimo debe ser mayor que 0',
					        maxText: 'El valor m&aacute;ximo debe ser menor que 9999999999'			                							                
			            },{
			                xtype: 'datefield',
			                fieldLabel: 'Fecha',
			                name: 'invoice_date',
			                allowBlank: false,
			                blankText: 'Este campo es requerido',
	            		},{
		                    xtype: 'combobox',
		                    fieldLabel: 'Cliente',
		                    store: store_entities,
		                    valueField: 'entity_id',
		                    displayField: 'entity_name',
		                    forceSelection: true,
						    allowBlank: false,
						    blankText: 'Este campo es requerido',  
						    editable: false,   
		                    typeAhead: true,		    							
		                    emptyText: 'Seleccione una empresa...'
		                },{
			                fieldLabel: 'Detalles',
			                name: 'invoice_transfer_details', 			                							                
			            },
		                ],
			
			    buttons: [{
			        text: 'Guardar',
			        formBind: true,
					disabled: true,
			        handler: function (){						        	
			        	invoice = new Invoice({
							'invoice_bill' : form_add_invoice.items.get(0).getValue(),
				            'invoice_code' : form_add_invoice.items.get(1).getValue(),
				            'invoice_value_cuc' : form_add_invoice.items.get(2).getValue(),
				            'invoice_value_cup' : form_add_invoice.items.get(3).getValue(),
				            'invoice_date' : form_add_invoice.items.get(4).getValue(),
				            'entity_id' : form_add_invoice.items.get(5).getValue(),
				            'invoice_transfer_details' : form_add_invoice.items.get(6).getValue(),
				            'invoice_status' : 'issued',
				            	            	            
				            }			            			            						
						); 
				        store_invoices.add(invoice);		        
				        form_add_invoice.getForm().reset();
				        store_invoices.sync();	        
						win_add_invoice.close();
			        }
			    },{
			        text: 'Cancelar',
			        handler: function (){	            	
				        form_add_invoice.getForm().reset();	        
						win_add_invoice.close();
			        }}]
			});
			
			
			
			var win_add_invoice = new Ext.Window({	
			    title: 'Adicionar nueva factura',
			    modal: true,
			    closable:true,
			    closeAction: 'hide',
			    width:350,						    					    
			    plain:true,
			    layout: 'fit',
			    items: [form_add_invoice]
			});
			win_add_invoice.show();	  
		}
    }, '-', {
        text:'Editar',
        tooltip:'Editar factura seleccionado',
        iconCls:'edit',
        handler: function (argument) {
        	var selection = grid_invoices.getView().getSelectionModel().getSelection()[0];
            if (selection) {	                    	
            	if(!form_edit_invoice){                    		
            	    
                	var form_edit_invoice = Ext.create('Ext.form.Panel', {										
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
					                fieldLabel: 'Cuenta',
					                name: 'invoice_bill', 
					                allowBlank: false,
					                blankText: 'Este campo es requerido',	
					                value: selection.get('invoice_bill')				                							                
					            },{
					                fieldLabel: 'C&oacute;digo',
					                name: 'invoice_code', 
					                allowBlank: false,
					                blankText: 'Este campo es requerido',
					                value: selection.get('invoice_code')			                							                
					            },{
					                fieldLabel: 'Monto CUC',
					                name: 'invoice_value_cuc', 
					                allowBlank: false,
					                blankText: 'Este campo es requerido',
					                xtype: 'numberfield',
							        maxValue: 9999999999,
							        minValue: 0,
							        minText: 'El valor m&iacute;nimo debe ser mayor que 0',
							        maxText: 'El valor m&aacute;ximo debe ser menor que 9999999999',
							        value: selection.get('invoice_value_cuc')				                							                
					            },{
					                fieldLabel: 'Monto CUP',
					                name: 'invoice_value_cup', 
					                allowBlank: false,
					                blankText: 'Este campo es requerido',
					                xtype: 'numberfield',
							        maxValue: 9999999999,
							        minValue: 0,
							        minText: 'El valor m&iacute;nimo debe ser mayor que 0',
							        maxText: 'El valor m&aacute;ximo debe ser menor que 9999999999',
							        value: selection.get('invoice_value_cup')				                							                
					            },{
					                xtype: 'datefield',
					                fieldLabel: 'Fecha',
					                name: 'invoice_date',
					                allowBlank: false,
					                blankText: 'Este campo es requerido',
					                value: selection.get('invoice_date')
			            		},{
				                    xtype: 'combobox',
				                    fieldLabel: 'Cliente',
				                    store: store_entities,
				                    valueField: 'entity_id',
				                    displayField: 'entity_name',
				                    forceSelection: true,
								    allowBlank: false,
								    blankText: 'Este campo es requerido',  
								    editable: false,   
				                    typeAhead: true,
				                    emptyText: selection.get('entity_name')
				                },{
					                fieldLabel: 'Detalles',
					                name: 'invoice_transfer_details',
					                value: selection.get('invoice_transfer_details') 			                							                
					            },
				               ],
					
					    buttons: [{
					        text: 'Editar',
					        formBind: true,
							disabled: true,
					        handler: function (){											
								var invoice = grid_invoices.getView().getSelectionModel().getSelection()[0];
								
								invoice.set('invoice_bill', form_edit_invoice.items.get(0).getValue());
								invoice.set('invoice_code', form_edit_invoice.items.get(1).getValue());
								invoice.set('invoice_value_cuc', form_edit_invoice.items.get(2).getValue());
								invoice.set('invoice_value_cup', form_edit_invoice.items.get(3).getValue());
								invoice.set('invoice_date', form_edit_invoice.items.get(4).getValue());
								if(form_edit_invoice.items.get(5).getValue()!=null)
								{ invoice.set('entity_id', form_edit_invoice.items.get(5).getValue()); }
								invoice.set('invoice_transfer_details', form_edit_invoice.items.get(6).getValue());
																					        
						        form_edit_invoice.getForm().reset();
						        store_invoices.sync();	  	        
								win_edit_invoice.close();
					        }
					    },{
					        text: 'Cancelar',
					        handler: function (){								        		            	
						        form_edit_invoice.getForm().reset();	        
								win_edit_invoice.close();
					        }}]
					});
            	}
            	
            	var win_edit_invoice = new Ext.Window({	
					title: 'Editar factura',
					modal: true,
					closable:true,
					closeAction: 'hide',							    
					width:350,															
					plain:true,
					layout: 'fit',
					    items: [form_edit_invoice]
				});
				
                win_edit_invoice.show();
            }
	      	else
	      	{
	      		Ext.MessageBox.alert('Advertencia', 'Debe seleccionar una factura!');
	      	}	  
		}
    },'-',{
        text:'Eliminar',
        tooltip:'Elimina una factura',
        iconCls:'remove',
        handler: function (argument) {
        	var selection = grid_invoices.getView().getSelectionModel().getSelection()[0];
            if (selection) {
            	Ext.Msg.show({
			        title: 'Confirmar',
			        msg: 'Desea eliminar la factura?',
			        buttons: Ext.Msg.YESNO,
			        fn: function(btn) {
			            if (btn == 'yes') {
			                store_invoices.remove(selection);
			                store_invoices.sync();
			            }
			        }
			    });
                
            }
	      	else
	      	{
	      		Ext.MessageBox.alert('Advertencia', 'Debe seleccionar una factura!');
	      	}
        } 
    },'-',{
        text:'Firmar',
        tooltip:'Pasa una factura a estado firmada',
        iconCls:'flag_yellow',
        itemId: 'signed',
        disabled: true,
        handler: function (argument) {
        	var invoice = grid_invoices.getView().getSelectionModel().getSelection()[0];
            if (invoice) {            	
            	if(invoice.get('invoice_status')=='issued'){
	            	Ext.Msg.show({
				        title: 'Confirmar',
				        msg: 'Desea pasar la factura a estado firmada?',
				        buttons: Ext.Msg.YESNO,
				        fn: function(btn) {
				            if (btn == 'yes') {
				                invoice.set('invoice_status', 'signed');
				                store_invoices.sync();
				            }
				        }
				    });
               }else{
               	Ext.MessageBox.alert('Advertencia', 'Para firmarse la factura debe encontrarse emitida!');	
               }
            }
	      	else
	      	{
	      		Ext.MessageBox.alert('Advertencia', 'Debe seleccionar una factura!');
	      	}
        } 
    },'-',{
        text:'Pagar',
        tooltip:'Pasa una factura a estado pagada',
        iconCls:'flag_green',
        itemId: 'payed',
        disabled: true,
        handler: function (argument) {
        	var invoice = grid_invoices.getView().getSelectionModel().getSelection()[0];
            if (invoice) {
            	Ext.Msg.show({
			        title: 'Confirmar',
			        msg: 'Desea pasar la factura a estado pagada?',
			        buttons: Ext.Msg.YESNO,
			        fn: function(btn) {
			            if (btn == 'yes') {
			                invoice.set('invoice_status', 'payed');
			                store_invoices.sync();
			            }
			        }
			    });
                
            }
	      	else
	      	{
	      		Ext.MessageBox.alert('Advertencia', 'Debe seleccionar una factura!');
	      	}
        } 
    },'-',{
        text:'Cancelar',
        tooltip:'Pasa una factura a estado cancelada',
        iconCls:'error',
        itemId: 'canceled',
        disabled: true,
        handler: function (argument) {
        	var invoice = grid_invoices.getView().getSelectionModel().getSelection()[0];
            if (invoice) {
            	Ext.Msg.show({
			        title: 'Confirmar',
			        msg: 'Desea pasar la factura a estado cancelada?',
			        buttons: Ext.Msg.YESNO,
			        fn: function(btn) {
			            if (btn == 'yes') {
			                invoice.set('invoice_status', 'canceled');
			                store_invoices.sync();
			            }
			        }
			    });
                
            }
	      	else
	      	{
	      		Ext.MessageBox.alert('Advertencia', 'Debe seleccionar una factura!');
	      	}
        } 
    },'->',{
            xtype: 'datefield',
            fieldLabel: 'Fecha',
            labelWidth: 40,
            listeners:{		         
		         'select': function(field, value){ 
	                //store_incomes.clearFilter();
					store_invoices.filter('invoice_date', value);										
					this.reset();
	            }
		    }
	},'-',
        {
            text:'Eliminar Filtro',
            iconCls: 'arrow_divide',
            handler : function(){
            	store_invoices.clearFilter();                
            }
        }],viewConfig: {
            forceFit: true,
	        getRowClass: function(record, index) {	        	       	
	            var c = record.get('invoice_status');
	            if (c == 'canceled') {
	                return 'canceled';
	            } else {
	                return '';
	            }
	        }
        }, bbar: Ext.create('Ext.PagingToolbar', {
	        store: store_invoices,
	        displayInfo: true,
	        displayMsg: 'Mostrar facturas {0} - {1} de {2}',
	        emptyMsg: "Ning&uacute;n factura para mostrar",
	        items:[
	            '-',
	        ]        
	   }),
	   listeners: {	   			
	   			itemmouseup: function(view, record){
                	
                	var c = record.get('invoice_status');
                	console.log(c);
                	if(c == 'payed')
                	{
                		this.down('#canceled').setDisabled(false);
                		this.down('#payed').setDisabled(true);
                		this.down('#signed').setDisabled(true);	
                	}
                	else if(c == 'signed')
                	{
                		this.down('#canceled').setDisabled(true);
                		this.down('#payed').setDisabled(false);
                		this.down('#signed').setDisabled(true);	
                	}
                	else if(c == 'issued')
                	{
                		this.down('#canceled').setDisabled(true);
                		this.down('#payed').setDisabled(true);
                		this.down('#signed').setDisabled(false);		
                	}
                	else
                	{
                		this.down('#canceled').setDisabled(true);
                		this.down('#payed').setDisabled(true);
                		this.down('#signed').setDisabled(true);
                	}
			        
			    }
            }
});