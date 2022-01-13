import { Handler } from '@netlify/functions';
import { q, client } from './config';

const handler: Handler = async (event) => {
  if (!event.body) throw Error('Event body was not found');
  const data = JSON.parse(event.body);

  return client
    .query(
      q.Delete(
        q.Ref(q.Collection(data.tradeCollection['@ref'].id), data.tradeId),
      ),
    )
    .then((response) => {
      // console.log('Handler func success: ', response);
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      // console.log('Handler func error: ', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};

export { handler };
