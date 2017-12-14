<?php
//Exercise 5 - Foreach Loop

$items = array(
  'for',
  'foreach',
  'while',
  'do-while'
);

echo 'PHP Supports ' . count($items) . ' of loops.';

$li = '';
foreach($items as $item){
  $li .= "<li>{$item}</li>";
}

echo "<ul>{$li}</ul>";
