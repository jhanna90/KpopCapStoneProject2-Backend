\echo 'Delete and recreate kpop_db db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE kpop_db;
CREATE DATABASE kpop_db;
\connect kpop_db

\i kpopschema.sql
\i kpop-seed.sql
\i update_members_names.sql

\echo 'Delete and recreate kpop_db_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE kpop_db_test;
CREATE DATABASE kpop_db_test;
\connect kpop_db_test

\i kpopschema.sql