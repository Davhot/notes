prepare: db_test

db_test: db_test_migrate

db_test_migrate:
	rails db:migrate RAILS_ENV=test
