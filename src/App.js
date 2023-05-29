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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const input = {
      customerId: user.attributes.sub,
      invoiceDate: new Date().toISOString(),
      amount: 100, // Remplacez cette valeur par celle provenant du formulaire
    };
    try {
      await API.graphql(graphqlOperation(createBilling, { input }));
      await API.graphql(graphqlOperation(createConsumption, { input }));
      setEmail('');
      setPassword('');
      setName('');
      setLastName('');
    } catch (error) {
      console.error('Erreur lors de la création de la facturation :', error);
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
          <Form.Control type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Form.Control type="password" name="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Form.Control type="text" name="name" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Form.Control type="text" name="lastName" placeholder="Nom de famille" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </FormGroup>
        <Button type="submit">Envoyer</Button>
      </Form>
    </div>
  );
};

export default withAuthenticator(App);
