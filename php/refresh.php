<?php
require_once ('GoogleAPIConfig.php');
use com\google\api\config\GoogleAPIConfig;

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, GoogleAPIConfig::$tokenURL);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, GoogleAPIConfig::$refreshParameters);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLINFO_HEADER_OUT, true);
$result = curl_exec($curl);
curl_close($curl);
$json = json_decode($result);

if (property_exists($json, 'access_token'))
	echo $json -> access_token;
else if (property_exists($json, 'error'))
	echo $json -> error;
else
	echo 'ERROR';
?>
