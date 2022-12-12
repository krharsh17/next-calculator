import {
  ScanCommand,
  DynamoDBClient
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
  },
  region: process.env.REGION
});

export default async function handler(req, res) {

  let data
  try {
    data = await client.send(
      new ScanCommand({
        TableName: process.env.TABLE_NAME,
      }))
  }
  catch (e) {
    console.log(e)
  }
  const history = data.Items.map(elem => elem.Data.N)
  res.status(200).json({ data: { results: history } })
}
