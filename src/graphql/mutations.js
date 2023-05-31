export const createBilling = /* GraphQL */ `
  mutation CreateBilling($input: CreateBillingInput!) {
    createBilling(input: $input) {
      id
      customerId
      invoiceDate
      amount
      selectedOffers
      offerType
      pricePerDocument
    }
  }
`;

export const createConsumption = /* GraphQL */ `
  mutation CreateConsumption($input: CreateConsumptionInput!) {
    createConsumption(input: $input) {
      id
      customerId
      consumptionDate
      quantity
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
      selectedOffers
      offerType
      pricePerDocument
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
