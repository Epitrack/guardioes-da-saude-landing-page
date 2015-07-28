<?php
header("Content-type: application/json; charset=utf-8");
$nome = $_POST['nome'];
$email = $_POST['email'];
$mensagem = $_POST['mensagem'];

$resultado = mail(
"denniscalazans+gds@gmail.com",
"GDS - Contato do Site",
$mensagem,
"From: $nome <$email>"
);

echo json_encode(array("status"=>$resultado));
?>
