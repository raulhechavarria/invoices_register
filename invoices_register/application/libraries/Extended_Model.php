<?php defined('BASEPATH') OR exit('No direct script access allowed');

abstract class Extended_Model extends CI_Model
{	
	protected $db = NULL;
	
	public function __construct()
	{
		parent::__construct();
		$this->db = $this->load->database('feasibility', TRUE);
	}
	
	protected function dsn_connect()
	{
		if($this->session->userdata('dsn')){
			$encypted_dsn = $this->session->userdata('dsn');
      		$dsn = $this->encrypt->decode($encrypted_dsn);
			$this->db = $this->load->database($dsn);
		}
		return $this->db;	
	}

}
