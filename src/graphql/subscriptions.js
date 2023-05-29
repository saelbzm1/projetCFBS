/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBilling = /* GraphQL */ `
  subscription OnCreateBilling($customerId: ID!) {
    onCreateBilling(customerId: $customerId) {
      id
      customerId
      invoiceDate
      amount
    }
  }
`;
export const onUpdateBilling = /* GraphQL */ `
  subscription OnUpdateBilling($customerId: ID!) {
    onUpdateBilling(customerId: $customerId) {
      id
      customerId
      invoiceDate
      amount
    }
  }
`;
export const onDeleteBilling = /* GraphQL */ `
  subscription OnDeleteBilling($customerId: ID!) {
    onDeleteBilling(customerId: $customerId) {
      id
      customerId
      invoiceDate
      amount
    }
  }
`;
