/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBilling = /* GraphQL */ `
  query GetBilling($id: ID!) {
    getBilling(id: $id) {
      id
      customerId
      invoiceDate
      amount
    }
  }
`;

export const getBillingData = /* GraphQL */ `
  query GetBillingData {
    getBillingData {
      id
      customerId
      invoiceDate
      amount
    }
  }
`;

export const getConsumptionData = /* GraphQL */ `
  query GetConsumptionData {
    getConsumptionData {
      id
      customerId
      consumptionDate
      consumptionValue
    }
  }
`;
