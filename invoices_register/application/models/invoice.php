<?php

  class Invoice extends CI_Model
  {
    function __construct()
    {
      parent::__construct();		 	  	       
    } 
    
    function get_all($limit, $offset)
    {      
      if(isset($limit) && isset($offset))  
      { $this->db->limit($limit, $offset); }
      $query = $this->db->get('invoices');
      $result = $query->result();
      $query->free_result();
	  $data = array();
	  foreach($result as $row)
  	  {  	  	
  	  	$d1 = new DateTime(date('c'));
    	$d2 = new DateTime($row->invoice_date);		
    	$d3 = $d1->diff($d2);
		$object = new stdClass; 
		$object->antiquity = $d3->days;	
		
		$entity = $this->entity->get_by_id($row->invoice_id);
		if($entity != null)
		{
			$obj_entity = new stdClass; $obj_entity->entity = $entity;
		}
		else
		{
			$entity = new stdClass; $entity->entity_id = ""; $entity->entity_name = "";
			$obj_entity = new stdClass; $obj_entity->entity = $entity;
		}
  	  	
		$extended = (object) array_merge((array)$row, (array)$object, (array)$obj_entity);		
		$data[] = $extended;									
  	  }
      return $data;       
    }
    
    function get_by_id($id)
    {           
      $this->db->where('invoice_id', $id);
      $query = $this->db->get('invoices');
      $result = $query->result();
      $query->free_result();
	  $data = array();
	  foreach($result as $row)
  	  {  	  	
  	  	$d1 = new DateTime(date('c'));
    	$d2 = new DateTime($row->invoice_date);		
    	$d3 = $d1->diff($d2);
		$object = new stdClass; 
		$object->antiquity = $d3->days;	
		
		$entity = $this->entity->get_by_id($row->invoice_id);
		if($entity != null)
		{
			$obj_entity = new stdClass; $obj_entity->entity = $entity;
		}
		else
		{
			$entity = new stdClass; $entity->entity_id = ""; $entity->entity_name = "";
			$obj_entity = new stdClass; $obj_entity->entity = $entity;
		}
  	  	
		$extended = (object) array_merge((array)$row, (array)$object, (array)$obj_entity);		
		$data[] = $extended;									
  	  }       
      if($result){ return $data[0]; }
      else {return null; }
    }
    
    function create($data)
    {         
      $items = array();  
	  if(array_key_exists('invoice_bill', $data))
      { $items['invoice_bill'] = $data['invoice_bill']; }	  
	  if(array_key_exists('invoice_code', $data))
      { $items['invoice_code'] = $data['invoice_code']; }	  
	  if(array_key_exists('invoice_value_cuc', $data))
      { $items['invoice_value_cuc'] = $data['invoice_value_cuc']; }
	  if(array_key_exists('invoice_value_cup', $data))
      { $items['invoice_value_cup'] = $data['invoice_value_cup']; }
	  if(array_key_exists('invoice_status', $data))
      { $items['invoice_status'] = $data['invoice_status']; }
	  if(array_key_exists('invoice_transfer_details', $data))
      { $items['invoice_transfer_details'] = $data['invoice_transfer_details']; }
	  if(array_key_exists('invoice_date', $data))
      { $items['invoice_date'] = $data['invoice_date']; }
	  if(array_key_exists('entity_id', $data))
      { $items['entity_id'] = $data['entity_id']; }	        
      $this->db->insert('invoices', $items);     
      return true;
      
    }
    
    function update($data, $id)
    {                  
      $items = array();  
	  if(array_key_exists('invoice_bill', $data))
      { $items['invoice_bill'] = $data['invoice_bill']; }	  
	  if(array_key_exists('invoice_code', $data))
      { $items['invoice_code'] = $data['invoice_code']; }	  
	  if(array_key_exists('invoice_value_cuc', $data))
      { $items['invoice_value_cuc'] = $data['invoice_value_cuc']; }
	  if(array_key_exists('invoice_value_cup', $data))
      { $items['invoice_value_cup'] = $data['invoice_value_cup']; }
	  if(array_key_exists('invoice_status', $data))
      { $items['invoice_status'] = $data['invoice_status']; }
	  if(array_key_exists('invoice_transfer_details', $data))
      { $items['invoice_transfer_details'] = $data['invoice_transfer_details']; }
	  if(array_key_exists('invoice_date', $data))
      { $items['invoice_date'] = $data['invoice_date']; }
	  if(array_key_exists('entity_id', $data))
      { $items['entity_id'] = $data['entity_id']; }		        
      $this->db->where('invoice_id', $id);
      $this->db->update('invoices', $items);	  
      return true;      
    }
    
    function delete($id)
    {           
      $this->db->where('invoice_id', $id);
      $this->db->delete('invoices');
      return true;      
    }
    
    function get_count()
    {     
      return $this->db->count_all('invoices');
    }
    
    function search($criteria, $fields)
    {      
      foreach($fields as $field)
      { $this->db->or_like($field, $criteria); }
      $query = $this->db->get('invoices');
      $result = $query->result();
      $query->free_result();
      return $result;   
    }
	
	function get_account_to_cash()
    {
      $this->db->where('invoice_status', 'signed');
	  $this->db->order_by("invoice_date", "desc"); 	 
      $query = $this->db->get('invoices');
      $result = $query->result();
      $query->free_result();
	  $data = array();
	  foreach($result as $row)
  	  {  	  	
  	  	$d1 = new DateTime(date('c'));
    	$d2 = new DateTime($row->invoice_date);		
    	$d3 = $d1->diff($d2);
		$object = new stdClass; 
		$object->antiquity = $d3->days;	
		
		$entity = $this->entity->get_by_id($row->entity_id);
		if($entity != null)
		{
			$obj_entity = new stdClass; 
			$obj_entity->entity_name = $entity->entity_name;
		}
		else
		{
			$obj_entity = new stdClass; 
			$obj_entity->entity_name = "";
		}
  	  	
		$extended = (object) array_merge((array)$row, (array)$object, (array)$obj_entity);		
		$data[] = $extended;									
  	  }
      return $data;       
    }
	
	
    
  }
