<?php

/**
 * Sigev. System for management and control of sales and business processes in IT & T companies. 
 *  Copyright (C) 2011  Pavel Ernesto Navarro Guerrero
 *  Sigescon is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
 */

    require(APPPATH.'libraries/REST_Controller.php'); 

    class RestUsers extends REST_Controller
     {

       function __construct()
       {
         parent::__construct(); 
       }

       function user_get()
       {
       	  $total = $this->user->get_count();
       	  $start = ($this->get('start') != null) ? $this->get('start') : 0;
    	  $limit = ($this->get('limit') != null) ? $this->get('limit') : $total;  
       	   
	      $users = $this->user->get_all($limit,$start);  
	      
      	  $message = array('success' => true,'total' => $total, 'message' => $this->lang->line('message_get_data'), 'data' => $users);  
          $this->response($message, 200);  
	      

       }

       function user_put()
       {		
         try{
		 	$this->user->update($this->request->body, $this->put('user_id'));		
		 	$data = $this->user->get_by_id($this->put('user_id')); 			     
         	$message = array('success' => true, 'message' => $this->lang->line('message_edit_data'), 'data' => $data);
		 }catch (Exception $e)
		 {
			$message = array('success' => false, 'message' => $this->lang->line('message_not_edit_data'));
		 }	
		 $this->response($message, 200, 'json');
       }

       function user_post()
       {     
         $count = $this->user->get_count();
         try{
		 	$this->user->create($this->_post_args);		
		 	$data = $this->user->get_all(1, $count); 			       
         	$message = array('success' => true, 'message' => $this->lang->line('message_create_data'), 'data' => $data);
		 }catch (Exception $e)
		 {
			$message = array('success' => false, 'message' => $this->lang->line('message_not_create_data'));
		 }	
		 $this->response($message, 200, 'json');
       }

       function user_delete()
       {      	 		
		 foreach ($this->_delete_args as $key => $value) {
		 			
			 $data = json_decode(stripslashes($key));				 
		 }	 
         try{
         	
		 	$this->user->delete($data->user_id);     
         	$message = array('success' => true, 'message' => $this->lang->line('message_deleted_data'), 'data' => $data->user_id);
		 }catch (Exception $e)
		 {
			$message = array('success' => false, 'message' => $this->lang->line('message_not_deleted_data'));
		 }	
		 $this->response($message, 200, 'json');        
       }

       

    }

/* End of file restuser.php */
/* Location: ./system/application/controllers/restuser.php */