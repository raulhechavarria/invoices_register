<?php
class User extends CI_Model
{
	function __construct()
    {
      parent::__construct();	       
    } 
    
    function get_all($limit, $offset)
    {
      if(isset($limit) && isset($offset))  
      { $this->db->limit($limit, $offset); }
      $query = $this->db->get('users');
      $result = $query->result();
      $data = array();
	  foreach($result as $row)
  	  {
		$data[] = $row;
	  }
      $query->free_result();
      return $data;       
    }
    
    function get_by_id($id)
    {      
      $this->db->where('user_id', $id);
      $query = $this->db->get('users');
      $result = $query->result();
      $query->free_result();
      if($result){ return $result[0]; }
      else {return null; }
    }
    
    function create($data)
    {      
      $items = array();      
      if(array_key_exists('user_firstname', $data))
      { $items['user_firstname'] = $data['user_firstname']; }
	  if(array_key_exists('user_lastname', $data))
      { $items['user_lastname'] = $data['user_lastname']; }
	  if(array_key_exists('user_login', $data))
      { $items['user_login'] = $data['user_login']; }
	  if(array_key_exists('user_password', $data))
      { $items['user_password'] = md5($data['user_password']); }      
      $this->db->insert('users', $items);     
      return true;
      
    }
    
    function update($data, $id)
    {      
      $items = array();      
      if(array_key_exists('user_firstname', $data))
      { $items['user_firstname'] = $data['user_firstname']; }
	  if(array_key_exists('user_lastname', $data))
      { $items['user_lastname'] = $data['user_lastname']; }
	  if(array_key_exists('user_login', $data))
      { $items['user_login'] = $data['user_login']; }
	  if(array_key_exists('user_password', $data))
      { $items['user_password'] = md5($data['user_password']); }    
      $this->db->where('user_id', $id);
      $this->db->update('users', $items);	  
      return true;
      
    }
    
    function delete($id)
    {        
      $this->db->where('user_id', $id);
      $this->db->delete('users');
      return true;      
    }
    
    function get_count()
    {
      return $this->db->count_all('users');
    }
    
    function search($criteria, $fields)
    {
      foreach($fields as $field)
      { $this->db->or_like($field, $criteria); }
      $query = $this->db->get('users');
      $result = $query->result();
      $query->free_result();
      return $result;   
    }    
    
	 function login($username, $password)
	 { 
	   $this ->db->select('user_id, user_login, user_password');
	   $this ->db->from('users');
	   $this->db->where('user_login', $username);
	   $this->db->where('user_password', MD5($password));
	   $this ->db->limit(1);
	   $query = $this ->db-> get();
	   if($query ->num_rows()== 1)
	   {
	     return true;
	   }
	   else
	   {
	     return false;
	   }
	 }
}
?>