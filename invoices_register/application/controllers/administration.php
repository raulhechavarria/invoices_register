<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Administration extends CI_Controller {
	
	function __construct()
    {    	
      parent::__construct();         
    }
	
	public function index()
	{	    
		if(!$this->session->userdata('username')){
			$this->load->view('login_form');
		}else{		
			$this->load->view('administration/main');
		}		
	}
	
	public function login()
	{
		
		if($this->check_login())
		{
			redirect('/', 'refresh');				
		}
		else {
			$data['message'] = "Usuario o contrase&ntilde;a incorrectos";
			$this->load->view('login_form',$data);	
		}
		
	}
	
	private function check_login()
	{
		$result = false;
		if($this->session->userdata('username')){
			$result = true;	
		}else
		{
			$result = $this->user->login($this->input->post('username'), $this->input->post('password'));
			if($result==true)
			{
				$this->session->set_userdata('username', $this->input->post('username'));
			}	
		}				
		return $result;
	}
	
	public function log_out()
	{
		$this->session->unset_userdata('username');
		redirect('/', 'refresh');
	}
	
	public function tree()
	{				
		$nodes = array();		
		$admin_nodes = array();
		$bills_nodes = array();
		$catalog_nodes = array();
		$reports_nodes = array();
		
		$admin_nodes[] = array(				
                'text' => "Usuarios",                
                'iconCls'  => "user",
                'leaf' => "true",
                'id' => "users"
            );
			
		$admin_nodes[] = array(				
                'text' => "Facturas",                
                'iconCls'  => "book",
                'leaf' => "true",
                'id' => "invoices"
            );
			
		$catalog_nodes[] = array(				
                'text' => "Empresas",                
                'iconCls'  => "folder_page",
                'leaf' => "true",
                'id' => "entities"
            );  
		
		$reports_nodes[] = array(				
                'text' => "Estado de las cuentas por cobrar",                
                'iconCls'  => "chart_bar",
                'leaf' => "true",
                'id' => "account_to_cash_report"
            );
		
		$nodes[] = array(				
                'text' => "Administrar",  
                /*'icon'  => base_url()."/assets/img/icons/user_gray.png",   */            
                'expanded'  => true,
                'children' => $admin_nodes,
                'id' => "administration"
            );
		
		$nodes[] = array(				
                'text' => "Nomencladores",  
                /*'icon'  => base_url()."/assets/img/icons/folder_database.png",  */                            
                'expanded'  => true,
                'children' => $catalog_nodes,
                'id' => "catalogs"
            );
			
		$nodes[] = array(				
                'text' => "Reportes",  
                /*'icon'  => base_url()."/assets/img/icons/folder_database.png",  */                            
                'expanded'  => true,
                'children' => $reports_nodes,
                'id' => "reports"
            );
			
		$nodes[] = array(				
                'text' => "Salir",  
                'iconCls'  => "user_go",
                'id' => "logout",
                'leaf' => "true",
            );
			
		
			
		
		
		echo json_encode($nodes);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */