package routes

import (
	"github.com/gin-gonic/gin"

	"gitlab.internal.casalemedia.com/kai.yoon/hackathon2018/server-golang/routes/application"
	"gitlab.internal.casalemedia.com/kai.yoon/hackathon2018/server-golang/routes/heartbeat"
)

// InitializeRoutes is a function to create the API routes
func InitializeRoutes(routerEngine *gin.Engine) {
	routerEngine.GET("/heartbeat", heartbeat.HandleGET)

	routerEngine.GET("/api/targets", application.HandleRetrieveAll)

	routerEngine.GET("/api/targets/:targetID", application.HandleRetrieveByID)

	routerEngine.POST("/api/targets/:targetID", application.HandleUpdateByID)
}
