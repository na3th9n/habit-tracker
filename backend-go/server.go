package main

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
)

func getRoot(w http.ResponseWriter, req *http.Request) {
	fmt.Fprint(w, "got / request\n")
	io.WriteString(w, "This is my website!\n")
}

func getHello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprint(w, "got /hello request\n")
	io.WriteString(w, "Hello!\n")
}

func main() {
	// Create your own mux
	mux := http.NewServeMux()

	// API routes
	http.HandleFunc("/", getRoot)
	http.HandleFunc("/hello", getHello)

	port := ":8081"
	fmt.Println("The server is running on port" + port)

	// start server
	err := http.ListenAndServe(port, mux)

	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		fmt.Printf("error starting server, %s\n", err)
		os.Exit(1)
	}
}
