package heartbeat

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// HandleGET handles requests on the heartbeat endpoint
func HandleGET(c *gin.Context) {
	c.String(http.StatusOK, "UP")
}
