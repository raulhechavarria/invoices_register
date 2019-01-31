<?php
require(APPPATH . 'libraries/fpdf16/fpdf.php');

class PDF extends FPDF
{
	var $title = "Title";

	//Cargar los datos
	function LoadData($file)
	{
	    //Leer las líneas del fichero
	    $lines=file($file);
	    $data=array();
	    foreach($lines as $line)
	        $data[]=explode(';',chop($line));
	    return $data;
	}
	
	function SetTitle($title)
	{
		$this->title=$title;
	}
	
	function Header()
	{
	    //Logo
	    //$this->Image('2011-03-01-1.jpeg',10,8,33);
	    //Arial bold 15
	    $this->SetFont('Arial','B',10);
	    //Movernos a la derecha
	    //Título
	    $this->Cell(0,10,$this->title,0,0,'C');
	    //Salto de línea
	    $this->Ln(10);
	}
	
	//Pie de página
	function Footer()
	{
	    //Posición: a 1,5 cm del final
	    $this->SetY(-15);
	    //Arial italic 8
	    $this->SetFont('Arial','I',8);
	    //Número de página    
	    $this->Cell(0,10,utf8_decode('Página '.$this->PageNo()).'/{nb}',0,0,'C');
	}
	
	
	//Tabla coloreada
	function FancyTable($header,$data,$w,$header2 = array())
	{
	    //Colores, ancho de línea y fuente en negrita
	    $this->SetFillColor(0);
	    $this->SetTextColor(255);
	    $this->SetDrawColor(0);
	    $this->SetLineWidth(.3);
	    $this->SetFont('','B');
	    //Cabecera
	    foreach ($header2 as $key => $value) {
			$this->Cell($key,7,$value,1,0,'C',1);
		}
		$this->Ln();
	    
	    for($i=0;$i<count($header);$i++)
	        $this->Cell($w[$i],7,$header[$i],1,0,'C',1);
	    $this->Ln();
	    //Restauración de colores y fuentes
	    $this->SetFillColor(204,204,204);
	    $this->SetTextColor(0);
	    $this->SetFont('');
	    //Datos
	    $fill=false;
	    foreach($data as $row)
	    {
	    	for ($i=0; $i < sizeof($w); $i++) { 
				$this->Cell($w[$i],6,$row[$i],'LR',0,'L',$fill);
			}
			$this->Ln();
		    $fill=!$fill;
	    }
	    $this->Cell(array_sum($w),0,'','T');
	}
	
	function GetFinal()
	{
		$this->Ln(10);
		$this->SetFont('Arial','',10);
		$this->Cell(0,10,utf8_decode('DECLARACIÓN DE RESPONSABILIDAD.'),0,1,'C');
		$this->SetFont('Arial','',8);
		$this->Cell(0,10,utf8_decode('Declaro que la información brindada es la actual, que su exactitud y calidad es la realmente reflejada en los registros'),0,1,'C');
		$this->Cell(0,10,utf8_decode('de la entidad y de comprobarse alguna falsedad de las mismas, asumo las responsabilidades que de ellas se deriven.'),0,1,'C');		
		$this->Cell(0,10,utf8_decode('Nombre y Apellidos:________________________________________ Cargo:_________________________'),0,1,'C');		
		$this->Cell(0,10,utf8_decode('Fecha: '.date('d/m/y h:i').'                            Firma y Cuño:___________________'),0,1,'C');
	}
}

?>