import * as uuid from 'uuid';
import {
  DynamoDBClient,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
  },
  region: process.env.REGION
});


export default async function handler(req, res) {
  const data = JSON.parse(req.body)?.data

  try {
    await client.send(
      new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
          Id: { S: uuid.v4() },
          Data: { N: `${data}` }
        }
      })
    );
  } catch (e) {
    console.log(e)
  }


  res.status(201).json({ message: "successful" })
}
