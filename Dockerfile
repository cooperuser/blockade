### Generates an image for building a Blockade executable
### Currently only a linux executable is built, but the
###   build process can be ran on any platform.

FROM alpine

# Install packages
RUN apk update
RUN apk add build-base curl g++ make openssl-dev webkit2gtk-dev yarn

# Install rust and cargo
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /blockade
CMD ["yarn", "tauri", "build"]
