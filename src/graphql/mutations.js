// mutations.js

export const createBilling = /* GraphQL */ `
  mutation CreateBilling($input: CreateBillingInput!) {
    createBilling(input: $input) {
      id
      customerId
      invoiceDate
      amount
    }
  }
`;

export const createConsumption = /* GraphQL */ `
  mutation CreateConsumption($input: CreateConsumptionInput!) {
    createConsumption(input: $input) {
      // Définissez les champs que vous souhaitez récupérer
    }
  }
`;

export const updateBilling = /* GraphQL */ `
  mutation UpdateBilling($input: UpdateBillingInput!) {
    updateBilling(input: $input) {
      id
      customerId
      invoiceDate
      amount
    }
  }
`;

export const deleteBilling = /* GraphQL */ `
  mutation DeleteBilling($input: DeleteBillingInput!) {
    deleteBilling(input: $input) {
      id
      customerId
      invoiceDate
      amount
    }
  }
`;
