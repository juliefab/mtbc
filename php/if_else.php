<?php


//Initialize your variables
$label = null;
$color = null;

//Check for get parameters
if(!empty($_GET)){
    $color = "#{$_GET['color']}";
}

//Can we name the color by it's hex value
if($color == "#ff0000"){
  $label = "red";
}elseif($color == "#00ff00"){
  $label = "green";
}elseif($color == "#0000ff"){
  $label = "blue";
}else{
  $label = "unknown";
}

//Output the data
//echo "<div style=\"color:{$color}\">The color is {$label}</div>";
?>
<div style="color:<?php echo $color; ?>">
    The color is <?php echo $label; ?>
</div>
<a href ="?color=00ff00">Green</a>
<a href ="?color=0000ff">Blue</a>
<a href ="?color=ff0000">Red</a>
