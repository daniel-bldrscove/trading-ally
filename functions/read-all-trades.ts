import { Handler } from '@netlify/functions';
import { q, client } from './config';

const handler: Handler = async () => {
  // query list of documents
  return client
    .query(
      q.Map(q.Paginate(q.Match(q.Index('trades_all'))), (tradeRef) =>
        q.Get(tradeRef),
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
