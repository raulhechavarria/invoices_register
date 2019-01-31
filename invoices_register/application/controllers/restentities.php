<?php

    require(APPPATH.'libraries/REST_Controller.php'); 

    class RestEntities extends REST_Controller
     {

       function __construct()
       {
         parent::__construct(); 
       }

       function entity_get()
       {
       	  $total = $this->entity->get_count();
       	  $start = ($this->get('start') != null) ? $this->get('start') : 0;
    	  $limit = ($this->get('limit') != null) ? $this->get('limit') : $total;  
       	   
	      $entities = $this->entity->get_all($limit,$start);  
	      
      	  $message = array('success' => true,'total' => $total, 'message' => $this->lang->line('message_get_data'), 'data' => $entities);  
          $this->response($message, 200);  
	      

       }

       function entity_put()
       {		
         try{
		 	$this->entity->update($this->request->body, $this->put('entity_id'));		
		 	$data = $this->entity->get_by_id($this->put('entity_id')); 			     
         	$message = array('success' => true, 'message' => $this->lang->line('message_edit_data'), 'data' => $data);
		 }catch (Exception $e)
		 {
			$message = array('success' => false, 'message' => $this->lang->line('message_not_edit_data'));
		 }	
		 $this->response($message, 200, 'json');
       }

       function entity_post()
       {     
         $count = $this->entity->get_count();
         try{
		 	$this->entity->create($this->_post_args);		
		 	$data = $this->entity->get_all(1, $count); 			       
         	$message = array('success' => true, 'message' => $this->lang->line('message_create_data'), 'data' => $data[0]);
		 }catch (Exception $e)
		 {
			$message = array('success' => false, 'message' => $this->lang->line('message_not_create_data'));
		 }	
		 $this->response($message, 200, 'json');
       }

       function entity_delete($id)
       {  	 
         try{
         	
		 	$this->entity->delete($id);     
         	$message = array('success' => true, 'message' => $this->lang->line('message_deleted_data'), 'data' => $id);
		 }catch (Exception $e)
		 {
			$message = array('success' => false, 'message' => $this->lang->line('message_not_deleted_data'));
		 }	
		 $this->response($message, 200, 'json');        
       }

       

    }

/* End of file restentities.php */
/* Location: ./system/application/controllers/restentities.php */