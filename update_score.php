<?php
error_reporting(E_ALL);

$SCORE_FILE = 'high_score.json';

// This variable contains a string with what we POSTed
$data_sent_by_fetch = file_get_contents('php://input');

// Read the existing high score data
$score_data = json_decode(file_get_contents($SCORE_FILE));
// Decode the POST data
$new_data = json_decode($data_sent_by_fetch);
var_dump($new_data);
var_dump($score_data); 

if ($new_data->grandTotal > $score_data->grandTotal) {
    // New high score-- overwrite the score data with the new POST data
    file_put_contents($SCORE_FILE, $data_sent_by_fetch);
    $score_data = $new_data;
}

// Return the current high score data to the server response
echo(json_encode($score_data));
?>
