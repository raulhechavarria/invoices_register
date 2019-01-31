<?php

    require(APPPATH.'libraries/REST_Controller.php'); 

    class RestInvoices extends REST_Controller
     {

       function __construct()
       {
         parent::__construct(); 
       }

       function invoice_get()
       {
       	  $total = $this->invoice->get_count();
       	  $start = ($this->get('start') != null) ? $this->get('start') : 0;
    	  $limit = ($this->get('limit') != null) ? $this->get('limit') : $total;  
       	   
	      $invoices = $this->invoice->get_all($limit,$start);  
	      
      	  $message = array('success' => true,'total' => $total, 'message' => $this->lang->line('message_get_data'), 'data' => $invoices);  
          $this->response($message, 200);  
	      

       }
	   
	   function account_to_cash_get()
       { 
	      $invoices = $this->invoice->get_account_to_cash();
		  $total = sizeof($invoices);
	      
      	  $message = array('success' => true,'total' => $total, 'message' => $this->lang->line('message_get_data'), 'data' => $invoices);  
          $this->response($message, 200);  
	      

       }

       function invoice_put()
       {		
         try{
		 	$this->invoice->update($this->request->body, $this->put('invoice_id'));		
		 	$data = $this->invoice->get_by_id($this->put('invoice_id')); 			     
         	$message = array('success' => true, 'message' => $this->lang->line('message_edit_data'), 'data' => $data);
		 }catch (Exception $e)
		 {
			$message = array('success' => false, 'message' => $this->lang->line('message_not_edit_data'));
		 }	
		 $this->response($message, 200, 'json');
       }

       function invoice_post()
       {     
         $count = $this->invoice->get_count();
         try{
		 	$this->invoice->create($this->_post_args);		
		 	$data = $this->invoice->get_all(1, $count); 			       
         	$message = array('success' => true, 'message' => $this->lang->line('message_create_data'), 'data' => $data[0]);
		 }catch (Exception $e)
		 {
			$message = array('success' => false, 'message' => $this->lang->line('message_not_create_data'));
		 }	
		 $this->response($message, 200, 'json');
       }

       function invoice_delete($id)
       {  	 
         try{
         	
		 	$this->invoice->delete($id);     
         	$message = array('success' => true, 'message' => $this->lang->line('message_deleted_data'), 'data' => $id);
		 }catch (Exception $e)
		 {
			$message = array('success' => false, 'message' => $this->lang->line('message_not_deleted_data'));
		 }	
		 $this->response($message, 200, 'json');        
       }

       

    }

/* End of file restinvoices.php */
/* Location: ./system/application/controllers/restinvoices.php */