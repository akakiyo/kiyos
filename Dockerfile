FROM node:15.5.1-alpine3.10

ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo
ENV APP_ROOT=/usr/src/kiyos

RUN apk update
RUN apk add --no-cache \
            gcc \
            g++ \
            make \
            python2 \
            git

RUN addgroup -S app && adduser -S -G app app
USER app

COPY --chown=app:app . $APP_ROOT
WORKDIR $APP_ROOT

RUN yarn install
RUN yarn run build

CMD ["yarn","run","start"]