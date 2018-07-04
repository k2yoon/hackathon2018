package application

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gitlab.internal.casalemedia.com/kai.yoon/hackathon2018/server-golang/datastore"
)

// HandleUpdateByID handles POST requests to update the matches for a target
func HandleUpdateByID(c *gin.Context) {
	userIDString := c.PostForm("userID")
	userID, _ := strconv.Atoi(userIDString)
	targetIDString := c.Param("targetID")
	targetID, _ := strconv.Atoi(targetIDString)
	for index, target := range datastore.Targets {
		if target.ID == targetID {
			datastore.Targets[index].Matches = append(target.Matches, userID)
			break
		}
	}
	c.String(http.StatusOK, "OK")
}
