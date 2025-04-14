FROM node:22-alpine AS builder
#RUN apt-get update -y && apt-get install -y openssl
COPY . ./

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN pnpm i --force
RUN npx prisma generate
RUN pnpm run build

FROM node:22-alpine AS deployment
#RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /.output /
COPY --from=builder /prisma/client /prisma/client
EXPOSE 3000
CMD ["node", "./server/index.mjs"]