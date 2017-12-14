<?php

$items = [
  'for',
  'foreach',
  'while',
  'do-while'
];

$count = count($items);

echo "PHP Supports {$count} of loops.";

$i = 0;
$li=null;
while ($i < $count) {
  $li .= "<li>{$items[$i]}</li>";
  $i++;
}

echo "<ul>{$li}</ul>";
