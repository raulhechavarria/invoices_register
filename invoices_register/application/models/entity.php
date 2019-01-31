<?php

  class Entity extends CI_Model
  {
    function __construct()
    {
      parent::__construct();		 	  	       
    } 
    
    function get_all($limit, $offset)
    {      
      if(isset($limit) && isset($offset))  
      { $this->db->limit($limit, $offset); }
      $query = $this->db->get('entities');
      $result = $query->result();
      $query->free_result();	  	  
      return $result;      
    }
    
    function get_by_id($id)
    {           
      $this->db->where('entity_id', $id);
      $query = $this->db->get('entities');
      $result = $query->result();
      $query->free_result();
      if($result){ return $result[0]; }
      else {return null; }
    }
    
    function create($data)
    {         
      $items = array();  
	  if(array_key_exists('entity_name', $data))
      { $items['entity_name'] = $data['entity_name']; }	  
	  if(array_key_exists('entity_nit', $data))
      { $items['entity_nit'] = $data['entity_nit']; }	  
	  if(array_key_exists('entity_reup_code', $data))
      { $items['entity_reup_code'] = $data['entity_reup_code']; }
	  if(array_key_exists('entity_ministry', $data))
      { $items['entity_ministry'] = $data['entity_ministry']; }
	  if(array_key_exists('entity_address', $data))
      { $items['entity_address'] = $data['entity_address']; }	        
      $this->db->insert('entities', $items);     
      return true;
      
    }
    
    function update($data, $id)
    {                  
      $items = array();  
	  if(array_key_exists('entity_name', $data))
      { $items['entity_name'] = $data['entity_name']; }	  
	  if(array_key_exists('entity_nit', $data))
      { $items['entity_nit'] = $data['entity_nit']; }	  
	  if(array_key_exists('entity_reup_code', $data))
      { $items['entity_reup_code'] = $data['entity_reup_code']; }
	  if(array_key_exists('entity_ministry', $data))
      { $items['entity_ministry'] = $data['entity_ministry']; }
	  if(array_key_exists('entity_address', $data))
      { $items['entity_address'] = $data['entity_address']; }		        
      $this->db->where('entity_id', $id);
      $this->db->update('entities', $items);	  
      return true;      
    }
    
    function delete($id)
    {           
      $this->db->where('entity_id', $id);
      $this->db->delete('entities');
      return true;      
    }
    
    function get_count()
    {     
      return $this->db->count_all('entities');
    }
    
    function search($criteria, $fields)
    {      
      foreach($fields as $field)
      { $this->db->or_like($field, $criteria); }
      $query = $this->db->get('entities');
      $result = $query->result();
      $query->free_result();
      return $result;   
    }
    
  }
