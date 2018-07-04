package datastore

import (
	"encoding/json"
	"io/ioutil"
)

// Target represents an individual target from targets.json
type Target struct {
	ID           int      `json:"id"`
	Name         string   `json:"name"`
	Intro        string   `json:"intro"`
	ImageURL     string   `json:"imageUrl"`
	Matches      []int    `json:"matches"`
	KnowsWell    []string `json:"knowsWell"`
	WantsToLearn []string `json:"wantsToLearn"`
}

// Targets holds the structured contents of the targets input file
var Targets []Target

// InitTargets parses the targets input file into a structure
func InitTargets(targetsFilePath string) {
	targetsFileContents, err := ioutil.ReadFile(targetsFilePath)
	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(targetsFileContents, &Targets)
	if err != nil {
		panic(err)
	}
}
