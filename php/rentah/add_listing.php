
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow React Native to access this PHP API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Set headers for the API response
header('Content-Type: application/json');

// Database connection details
include 'db_connection.php';

// Get JSON data from the POST request
$data = json_decode(file_get_contents("php://input"));

// Check if all fields are provided
if (isset($data->title) && isset($data->description) && isset($data->location) && isset($data->price) && isset($data->contact)) {
    $title = $data->title;
    $description = $data->description;
    $location = $data->location;
    $price = $data->price;
    $contact = $data->contact;

    // Insert the listing into the database
    $sql = "INSERT INTO listings (title, description, location, price, contact) VALUES ('$title', '$description', '$location', '$price', '$contact')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Listing added successfully"]);
    } else {
        echo json_encode(["message" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "Missing required fields"]);
}

$conn->close();
?>
