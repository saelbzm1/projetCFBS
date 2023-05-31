import React, { useEffect, useState } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Button, FormGroup, Form } from 'react-bootstrap';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import logo from './logo.png';
import './App.css';
import { createBilling, createConsumption } from './graphql/mutations';
import { getBillingData, getConsumptionData } from './graphql/queries';

Amplify.configure(awsconfig);

const fetchBillingData = async () => {
  try {
    const response = await API.graphql(graphqlOperation(getBillingData));
    console.log(response.data.getBillingData);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de facturation :', error);
  }
};

const fetchConsumptionData = async () => {
  try {
    const response = await API.graphql(graphqlOperation(getConsumptionData));
    console.log(response.data.getConsumptionData);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de consommation :', error);
  }
};

const App = ({ signOut, user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [offerType, setOfferType] = useState('');
  const [pricePerDocument, setPricePerDocument] = useState(0);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const input = {
      customerId: user.attributes.sub,
      invoiceDate: new Date().toISOString(),
      amount: 100, // Remplacez cette valeur par celle provenant du formulaire
      selectedOffers: selectedOffers,
      offerType: offerType,
      pricePerDocument: pricePerDocument,
    };
    try {
      await API.graphql(graphqlOperation(createBilling, { input }));
      await API.graphql(graphqlOperation(createConsumption, { input }));
      setEmail('');
      setPassword('');
      setName('');
      setLastName('');
      setSelectedOffers([]);
      setOfferType('');
      setPricePerDocument(0);
    } catch (error) {
      console.error('Erreur lors de la création de la facturation :', error);
    }
  };

  const handleOfferChange = (offer) => {
    const updatedOffers = selectedOffers.includes(offer)
      ? selectedOffers.filter((o) => o !== offer)
      : [...selectedOffers, offer];
    setSelectedOffers(updatedOffers);

    // Déterminer le type d'offre et le prix par document en fonction des offres sélectionnées
    if (
      updatedOffers.includes('Extractions de factures') ||
      updatedOffers.includes('Extraction de questionnaire') ||
      updatedOffers.includes('Classification des documents')
    ) {
      setOfferType('Type 1 (Machine Learning)');
      setPricePerDocument(1);
    } else if (updatedOffers.includes('Anonymisation en masse des documents')) {
      setOfferType('Type 2 (Scripting)');
      setPricePerDocument(0.5);
    } else {
      setOfferType('');
      setPricePerDocument(0);
    }
  };

  useEffect(() => {
    const configureAPI = async () => {
      try {
        await API.configure(awsconfig);
      } catch (error) {
        console.error('Erreur lors de la configuration de l\'API :', error);
      }
    };

    configureAPI();
    fetchBillingData();
    fetchConsumptionData();
  }, []);

  return (
    <div className="App">
      <Button onClick={signOut}>Déconnexion</Button>
      <Button onClick={fetchBillingData}>Obtenir les données de facturation</Button>
      <Button onClick={fetchConsumptionData}>Obtenir les données de consommation</Button>
      <header>
        <img src={logo} alt="Logo" />
        <h1>Canon France Business Services</h1>
      </header>
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Form.Control
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Form.Control
            type="text"
            name="name"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Nom de famille"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Form.Check
            type="checkbox"
            id="invoiceExtraction"
            label="Extractions de factures"
            checked={selectedOffers.includes('Extractions de factures')}
            onChange={() => handleOfferChange('Extractions de factures')}
          />
          <Form.Check
            type="checkbox"
            id="questionnaireExtraction"
            label="Extraction de questionnaire"
            checked={selectedOffers.includes('Extraction de questionnaire')}
            onChange={() => handleOfferChange('Extraction de questionnaire')}
          />
          <Form.Check
            type="checkbox"
            id="documentClassification"
            label="Classification des documents"
            checked={selectedOffers.includes('Classification des documents')}
            onChange={() => handleOfferChange('Classification des documents')}
          />
          <Form.Check
            type="checkbox"
            id="documentAnonymization"
            label="Anonymisation en masse des documents"
            checked={selectedOffers.includes('Anonymisation en masse des documents')}
            onChange={() => handleOfferChange('Anonymisation en masse des documents')}
          />
        </FormGroup>
        <Button type="submit">Envoyer</Button>
      </Form>
    </div>
  );
};

export default withAuthenticator(App);
