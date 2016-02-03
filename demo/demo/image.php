<?php

$tintOrShade = (floor(rand(1,2))%2);
$currentR = rand(60,220);
$currentG = rand(60,220);
$currentB = rand(60,220);

if ($tintOrShade) {
  $shade_factor = 0.2;
  $newR = floor($currentR * (1 - $shade_factor));
  $newG = floor($currentG * (1 - $shade_factor));
  $newB = floor($currentB * (1 - $shade_factor));
} else {
  $tint_factor = 0.2;
  $newR = floor($currentR + (255 - $currentR) * $tint_factor);
  $newG = floor($currentG + (255 - $currentG) * $tint_factor);
  $newB = floor($currentB + (255 - $currentB) * $tint_factor);
}

header("Content-type: image/png");

$text = $_SERVER['QUERY_STRING'];
list($text) = explode('?', $text);

// Create a 55x30 image
$im = imagecreatetruecolor(491, 275);
$color = imagecolorallocate($im, $newR, $newG, $newB);
$white = imagecolorallocate($im, 255, 255, 255);
$black = imagecolorallocate($im, 0, 0, 0);

// Make the background transparent
imagecolortransparent($im, $black);

imagefilledrectangle($im, 4, 4, 450, 270, $color);

$date = date('Y-m-d H:i:s');
$px     = (imagesx($im) - 7.5 * strlen($date)) / 2;
$py     = (imagesy($im) - 48);
imagestring($im, 3, $px, $py, $date, $white);

$px     = (imagesx($im) - 7.5 * strlen($text)) / 2;
$py     = (imagesy($im) - 24);
if(preg_match("/^[A-z0-9_-]+$/", $text)) {
    imagestring($im, 3, $px, $py, $text, $white);
}

imagepng($im);
imagedestroy($im);

