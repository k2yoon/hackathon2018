package main

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"

	"gitlab.internal.casalemedia.com/kai.yoon/hackathon2018/server-golang/datastore"
	"gitlab.internal.casalemedia.com/kai.yoon/hackathon2018/server-golang/routes"
)

func main() {
	datastore.InitTargets(os.Args[1])

	fmt.Printf("targets: %v\n", datastore.Targets)

	// Set up router engine for the API
	routerEngine := setupRouter(gin.ReleaseMode)

	// Start serving the API
	fmt.Println("Starting the server on port 8080")
	routerEngine.Run(":8080")
}

func setupRouter(mode string) *gin.Engine {
	gin.SetMode(mode)

	// Create a router without any middleware
	routerEngine := gin.New()

	// Apply global middleware
	// Logger middleware will write the logs to gin.DefaultWriter
	routerEngine.Use(gin.Logger())
	// Recovery middleware recovers from any panics and writes a 500 if there was one
	routerEngine.Use(gin.Recovery())

	// Initialize the routes
	routes.InitializeRoutes(routerEngine)

	return routerEngine
}
