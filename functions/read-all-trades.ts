import { Handler } from '@netlify/functions';
import { q, client } from './config';

const handler: Handler = async () => {
  return client
    .query(
      // use a lambda function to query list of documents
      q.Map(q.Paginate(q.Match(q.Index('trades_all'))), (tradeRef) =>
        q.Get(tradeRef),
      ),
    )
    .then((response) => {
      // const trades = response.data;
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      console.log('error', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};

export { handler };
