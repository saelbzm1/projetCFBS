export const getBilling = /* GraphQL */ `
  query GetBilling($id: ID!) {
    getBilling(id: $id) {
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

export const getBillingData = /* GraphQL */ `
  query GetBillingData {
    getBillingData {
      items {
        id
        customerId
        invoiceDate
        amount
        selectedOffers
        offerType
        pricePerDocument
      }
    }
  }
`;

export const getConsumptionData = /* GraphQL */ `
  query GetConsumptionData {
    getConsumptionData {
      items {
        id
        customerId
        consumptionDate
        quantity
      }
    }
  }
`;
