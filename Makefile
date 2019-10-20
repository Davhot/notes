prepare: db_test

db_test: db_test_migrate

db_test_migrate:
	rails db:migrate RAILS_ENV=test

test: back_tests front_tests

back_tests:
	bundle exec rspec

front_tests:
	npm run test
