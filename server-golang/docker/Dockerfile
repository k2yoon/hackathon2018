FROM golang:1.9-alpine

EXPOSE 8080

ENTRYPOINT ["./entrypoint-api.sh"]

RUN apk add --no-cache --virtual .build-deps git tzdata

ARG GIT_COMMIT
ARG ENVIRONMENT
ARG DOCKERFILE
ARG BUILD_DATE

ENV \
	GOPATH="${GOPATH:-/go}" \
	TZ="America/Toronto" \
	ENVIRONMENT="${ENVIRONMENT:-development}" \
	REPO_URL="gitlab.internal.casalemedia.com" \
	GROUP="kai.yoon" \
	PRODUCT="hackathon2018" \
	SERVICE="server-golang"
ENV \
	BUILD_DIR="${GOPATH}/src/${REPO_URL}/${GROUP}/${PRODUCT}" \
	SERVICE_DIR="/services/${GROUP}/${PRODUCT}/${SERVICE}"

LABEL \
	GIT_COMMIT=${GIT_COMMIT} \
	ENVIRONMENT=${ENVIRONMENT} \
	DOCKERFILE=${DOCKERFILE} \
	BUILD_DATE=${BUILD_DATE}

RUN mkdir -p "${BUILD_DIR}/${SERVICE}/" && mkdir -p "${SERVICE_DIR}/"

COPY "./${SERVICE}" "${BUILD_DIR}/${SERVICE}"

WORKDIR "${BUILD_DIR}/${SERVICE}"

RUN go get ./... && \
	go build -o "${SERVICE_DIR}/api" main.go && \
	mv "./data" "${SERVICE_DIR}/" && \
	mv "./docker/entrypoint-api.sh" "${SERVICE_DIR}/" && \
	chmod +x "${SERVICE_DIR}/entrypoint-api.sh" && \
	rm -rf "$GOPATH/src"

WORKDIR "${SERVICE_DIR}"

CMD ["./api", "./data/targets.json"]
