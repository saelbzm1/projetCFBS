const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'ClientBDD';

exports.handler = async (event) => {
  const { customerId, invoiceDate, amount } = event.arguments.input;

  const billing = {
    id: Date.now().toString(),
    customerId,
    invoiceDate,
    amount,
  };

  const params = {
    TableName: tableName,
    Item: billing,
  };

  try {
    await dynamodb.put(params).promise();
    return billing;
  } catch (error) {
    console.error('Erreur lors de la création de la facturation', error);
    throw new Error("Une erreur s'est produite lors de la création de la facturation");
  }
};
