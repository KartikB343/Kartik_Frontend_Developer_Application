import React, { useEffect } from 'react';

import { ApolloProvider } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import ApolloClient from "apollo-boost";

import JobsComponent from './components/JobsComponent';
import JobDetailViewComponent from './components/JobViewDetailComponent';
import PostJobComponent from './components/PostJobComponent';
import ErrorBoundary from './components/ErrorBoundary';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";


const client = new ApolloClient({
  uri: 'https://api.graphql.jobs/',
  cache: new InMemoryCache()
});

function Header() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="display-4 text-center mt-5" style={{ 'font': 'Arial' }}>
            <div style={{ color: "lightgrey" }}>Jobs Listing Portal</div>
          </div>
          <div className="float-left" style={{ color: "#80cbc4" }}><Link to={'/'}>Home</Link></div>
          <div className="float-right" style={{ color: "#80cbc4" }}><Link to={'/postAJob'}>Post a Job</Link></div>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className="bottom mb-2">
      <div className="text-center ">
        <div style={{ color: "#80cbc4", font: 'Arial' }}>Technologies used <a style={{ color: "white" }} href={"https://reactjs.org/"} target="_blank" rel="noopener noreferrer">React</a>, <a style={{ color: "white" }} href={"https://graphql.org/"} target="_blank" rel="noopener noreferrer">Graphql</a></div>
      </div>
    </div>
  )
}

function PageNotFoundComponent() {
  return (
    <>
      <div style={{ textAlign: 'center', color: 'white' }} className="mt-4">
        <h1>Page Not Found
      </h1>
      </div>
    </>
  )
}

function HomeComponent() {
  return (

    <ErrorBoundary fallback={<h1>Something Went Wrong</h1>}>
      <Switch>
        <Route exact path='/' component={JobsComponent} />
        <Route exact path='/viewjob/:jobSlug/:companySlug' component={JobDetailViewComponent} />
        <Route exact path='/postAJob' component={PostJobComponent} />
        <Route path='/*' component={PageNotFoundComponent} />
      </Switch>
    </ErrorBoundary>
  )
}

function App() {
  
  useEffect(() => {
    document.body.style.backgroundColor = "#34324a";
  })
  return (
    <ApolloProvider client={client}>
      <ErrorBoundary fallback={<h1>Something went Wrong!</h1>}>
        <Header />
        <HomeComponent />
        <Footer />        
      </ErrorBoundary>
    </ApolloProvider>

  );
}
export default React.memo(App);