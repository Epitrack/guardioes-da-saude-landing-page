<?php
header("Content-type: application/json; charset=utf-8");
$nome = $_POST['nome'];
$email = $_POST['email'];
$mensagem = $_POST['mensagem'];

$resultado = mail(
"contato@epitrack.com.br",
"Guardiões da Saúde - Contato do Site",
$mensagem,
"From: $nome <$email>"
);

echo json_encode(array("status"=>$resultado));
?>
