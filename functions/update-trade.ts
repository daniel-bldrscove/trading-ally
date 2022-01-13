import { Handler } from '@netlify/functions';
import { q, client } from './config';

const handler: Handler = async (event) => {
  if (!event.body) throw Error('Event body was not found');
  const collection = JSON.parse(event.body);
  const data = collection.data;
  const collName = collection.tradeCollection['@ref'].id;
  const collID = collection.tradeId;

  return client
    .query(
      q.Replace(q.Ref(q.Collection(collName), collID), {
        data: {
          date: data.date,
          execTime: data.execTime,
          spread: data.spread,
          side: data.side,
          qty: data.qty,
          ticker: data.ticker,
          price: data.price,
          posEffect: data.posEffect,
        },
      }),
    )
    .then((response) => {
      console.log('Handler func success: ', response);
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
