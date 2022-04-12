import { Handler } from '@netlify/functions';
import { q, client } from './config';

const handler: Handler = async (event) => {
  if (!event.body) {
    throw new Error('Event body not loaded');
  }

  const data = JSON.parse(event.body);

  return client
    .query(
      q.Create(q.Collection('trades'), {
        data: data,
      }),
    )
    .then((response) => {
      // console.log('Handler func success: ', response);
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      console.log('Handler func error: ', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};

export { handler };
