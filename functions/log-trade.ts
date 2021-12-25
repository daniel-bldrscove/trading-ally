import { Handler } from '@netlify/functions';
import { q, client } from './config';

const handler: Handler = async (event) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const data = JSON.parse(event.body!);

  return client
    .query(
      q.Create(q.Collection('trades'), {
        data: data,
      }),
    )
    .then((response) => {
      console.log('success', response);
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      console.log('error', error);
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};

export { handler };
