<?php
include 'db_connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header('Content-Type: application/json');
// Fetch all listings from the database
$sql = "SELECT * FROM listings";
$result = $conn->query($sql);
$listings = [];
if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {
        $listings[] = $row;
    }
    echo json_encode($listings);
} else {
    echo json_encode([]);
}
$conn->close();

?>