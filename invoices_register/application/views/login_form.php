<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Sistema Cuentas por Cobrar. OTN-CMW</title>

    <!-- Bootstrap core CSS -->
    <link href="<?= base_url(); ?>assets/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="<?= base_url(); ?>assets/stylessheets/signin.css" rel="stylesheet">
  </head>

  <body>
	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="<?= base_url();?>assets/javascripts/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="<?= base_url();?>assets/bootstrap/js/bootstrap.min.js"></script>

    <!-- Enable responsive features in IE8 with Respond.js (https://github.com/scottjehl/Respond) -->
    <script src="<?= base_url();?>assets/javascripts/respond.min.js"></script>
    
    <script src="<?= base_url();?>assets/javascripts/alert.js"></script>
    <div class="container">	   
      <form class="form-signin" action="<?= base_url(); ?>index.php/administration/login" method="post" accept-charset="utf-8">
      	<?php if(isset($message)){?>
      	<div class="bs-example">
	      <div class="alert fade in">
	        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
	        <strong>ERROR!</strong> <?= $message ?>
	      </div>
	    </div>
	    <?php }?>
        <h2 class="form-signin-heading">Autentiquese</h2>
        <input type="text"  name="username" class="form-control" placeholder="Usuario" required="true" autofocus="true">
        <input type="password"  name="password" class="form-control" placeholder="Contrase&ntilde;a" required="true">
        <label class="checkbox">
          <input type="checkbox" value="remember-me"> Recordar
        </label>
        <button class="btn btn-large btn-primary btn-block" type="submit">Confirmar</button>
      </form>

    </div> <!-- /container -->

  </body>
</html>