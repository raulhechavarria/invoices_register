<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * EvaProy. System for management and control of investment projects in small and medium-sized business and companies. 
 *  Copyright (C) 2013  Pavel Ernesto Navarro Guerrero
 *  EvaProy is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 */

class Reports extends CI_Controller {
	function __construct(){
		parent::__construct();
	}
	
	function print_account_to_cash_to_pdf(){
		$data = $this->invoice->get_account_to_cash();
		$total = sizeof($data);	
		
		foreach ($data as $obj){	        	
            $db_data[] = array(utf8_decode($obj->invoice_bill), 
            					utf8_decode($obj->invoice_code), 
            					utf8_decode($obj->invoice_value_cup),
            					utf8_decode($obj->invoice_value_cuc),
            					utf8_decode($obj->entity_name),
            					utf8_decode($obj->invoice_date),
            					utf8_decode($obj->antiquity)
								);
        }
		
		$pdf=new PDF('L');
		$pdf->AliasNbPages();
		$pdf->SetFont('Arial','B',10);
	    
	    $pdf->SetTitle("Estado de las cuentas por cobrar");
	    $pdf->AddPage();
	   
		//Títulos de las columnas
		$header=array('Cuenta',utf8_decode('Código'),'Monto CUP','Monto CUC','Cliente','Fecha','Antiguedad');
		$w=array(50,50,50,50,50,40,20);
		$pdf->SetFont('Arial','',10);
		$pdf->FancyTable($header,$db_data,$w);		
		$pdf->GetFinal();
		$pdf->Output();

	}
	
	

}

/* End of file reports.php */
/* Location: ./system/application/controllers/reports.php */
