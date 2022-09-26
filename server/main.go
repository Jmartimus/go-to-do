package main

import (
	"fmt"
	"log"
	"net/http"

	"./router"
)

// This is the main file that starts the server and routes the requests.
//  When a todo is created, edited, deleted etc.  It comes through here.

// This is the order for understanding how the backend go/mongo architecture works:
// main.go => router.go => middleware.go => models.go


func main() {
	// r initializes the route that routes the todo requests wherever they need to go.
    r := router.Router()

	// This lets the user know that the server is starting.
    fmt.Println("Starting server on the port 8080...")

	// If the server doesn't start for some reason, we abort the program entirely.  If it is successful, then we start
	//  the server at port :8080 using the router as the handler for incoming requests. If we do not pass r, then the default
	// mux is used.
    log.Fatal(http.ListenAndServe(":8080", r))
}