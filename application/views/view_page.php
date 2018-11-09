<!DOCTYPE html>
<html>
<head>

  <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.35.1/css/bootstrap-dialog.min.css" rel="stylesheet" type="text/css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.35.1/js/bootstrap-dialog.min.js"></script>

  <title>Bootstrap Dialog Test</title>
</head>

<body>
<!-- IF SUCCESSFUL -->
<?php $alert= ''; ?>
<?php   if ($alert == 'success'): ?>

<script type = "text/javascript">
BootstrapDialog.alert('Your Registration was Successful');
</script>

<?php endif; ?>

<!-- IF FAILED -->

<?php   if($alert == 'failed'): ?>

<script type = "text/javascript">
BootstrapDialog.alert({
            title: 'An Error Occured',
            message: 'Your Registration failed',
            type: BootstrapDialog.TYPE_DANGER,
            buttonLabel: 'Close'

        });

</script>
<?php endif; ?>

</body>
</html>