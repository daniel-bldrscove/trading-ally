import faunadb from 'faunadb';

const secret = process.env.FAUNADB_KEY;
const domain = 'db.fauna.com';
const port = 443;
const scheme = 'https';

if (typeof secret === 'undefined' || secret === '') {
  console.error('The FAUNADB_SECRET environment variable is not set, exiting.');
  process.exit(1);
}

export const q = faunadb.query;
export const client = new faunadb.Client({
  secret,
  domain,
  port,
  scheme,
});
