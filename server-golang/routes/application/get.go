package application

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gitlab.internal.casalemedia.com/kai.yoon/hackathon2018/server-golang/datastore"
)

// HandleRetrieveAll handles requests to get all targets
func HandleRetrieveAll(c *gin.Context) {
	c.JSON(http.StatusOK, datastore.Targets)
}

// HandleRetrieveByID handles requests to get a specific target by id
func HandleRetrieveByID(c *gin.Context) {
	var responseTarget datastore.Target
	targetIDString := c.Param("targetID")
	targetID, _ := strconv.Atoi(targetIDString)
	for _, target := range datastore.Targets {
		if target.ID == targetID {
			responseTarget = target
			break
		}
	}
	c.JSON(http.StatusOK, responseTarget)
}
