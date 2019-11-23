FROM ruby:2.6.1
ENV LANG C.UTF-8

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev postgresql-client apt-utils apt-transport-https --no-install-recommends cron gawk sed  && rm -rf /var/lib/apt/lists/*
RUN apt-get install openssl
RUN apt-cache policy openssl libssl1.1

# Обновление Nodejs
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \
        && apt-get install -y nodejs
RUN npm install -g yarn

# Обновление ruby
RUN gem pristine --all

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/log
RUN mkdir -p /var/run/postgresql
RUN mkdir -p /usr/src/dumps

RUN chmod 755 /usr/src/app/log
RUN chmod 755 /usr/src/app

WORKDIR /usr/src/app
