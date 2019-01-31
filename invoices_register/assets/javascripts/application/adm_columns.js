var columns_users =  [    
    {header: "Nombre", width: 120, sortable: true, dataIndex: 'user_firstname'},
    {header: "Apellidos", width: 250, sortable: true, dataIndex: 'user_lastname'},
    {header: "Login", width: 120, sortable: true, dataIndex: 'user_login'}
];

var columns_entities =  [    
    {header: "Nombre", width: 180, sortable: true, dataIndex: 'entity_name'},
    {header: "NIT", width: 50, sortable: true, dataIndex: 'entity_nit'},
    {header: "REUP", width: 50, sortable: true, dataIndex: 'entity_reup_code'},
    {header: "Ministerio", width: 100, sortable: true, dataIndex: 'entity_ministry'}
];


function changeStatus(val){
    if(val == 'payed'){
        return '<img src="' + BASE_PATH + 'assets/images/fam/flag_green.png"></img>';
    }else if(val == 'signed'){
        return '<img src="' + BASE_PATH + 'assets/images/fam/flag_yellow.png"></img>';
    }else if(val == 'canceled'){
        return '<img src="' + BASE_PATH + 'assets/images/fam/error.png"></img>';
    }else{
        return '<img src="' + BASE_PATH + 'assets/images/fam/flag_red.png"></img>';
    }
}

function changeAntiquity(val){
    if(val >= 30){
        return '<span style="color:red;">' + Ext.util.Format.number(val,'0') + '</span>';
    }else if(val > 20 && val < 30){
        return '<span style="color:green;">' + Ext.util.Format.number(val,'0') + '</span>';
    }
    if(val > 0) { return Ext.util.Format.number(val,'0'); }
}

var columns_invoices =  [    
    {header: "Cuenta", width: 120, sortable: true, dataIndex: 'invoice_bill'},
    {header: "C&oacute;digo", width: 100, sortable: true, dataIndex: 'invoice_code'},
    {header: "Monto CUC", width: 100, sortable: true, dataIndex: 'invoice_value_cuc', renderer: Ext.util.Format.usMoney},
    {header: "Monto CUP", width: 100, sortable: true, dataIndex: 'invoice_value_cup', renderer: Ext.util.Format.usMoney},
    {header: "Fecha", width: 120, sortable: true, dataIndex: 'invoice_date', renderer: Ext.util.Format.dateRenderer('Y-m-d')},    
    {header: "Estado", renderer: changeStatus, width: 60, sortable: true, dataIndex: 'invoice_status'},
];

var columns_account_to_cash =  [    
    {header: "Cuenta", width: 120, sortable: true, dataIndex: 'invoice_bill'},
    {header: "C&oacute;digo", width: 100, sortable: true, dataIndex: 'invoice_code'},
    {header: "Monto CUC", width: 100, sortable: true, dataIndex: 'invoice_value_cuc', renderer: Ext.util.Format.usMoney},
    {header: "Monto CUP", width: 100, sortable: true, dataIndex: 'invoice_value_cup', renderer: Ext.util.Format.usMoney},
    {header: "Cliente", width: 100, sortable: true, dataIndex: 'entity_name'},
    {header: "Fecha", width: 120, sortable: true, dataIndex: 'invoice_date', renderer: Ext.util.Format.dateRenderer('Y-m-d')},
    {header: "Dia", renderer: changeAntiquity, width: 120, sortable: true, dataIndex: 'antiquity'},    
];