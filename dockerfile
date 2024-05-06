FROM mhart/alpine-node:latest
COPY ./.output /
EXPOSE 3000
CMD ["node", "./server/index.mjs"]