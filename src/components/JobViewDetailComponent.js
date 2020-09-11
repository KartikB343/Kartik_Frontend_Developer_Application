import React, { Fragment, useEffect, useState } from 'react';
import { Spinner, Modal } from 'react-bootstrap';
import { useQuery, gql, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faBuilding, faClock, faHashtag } from '@fortawesome/free-solid-svg-icons';
import ErrorBoundary from './ErrorBoundary';


function UpdateJobDetails(props) {

  const initialFormState = {
    id: props.jobId,
    description: props.description,
    adminSecret: ""
  }

  const UPDATE_JOB = gql`
  mutation UpdateJobInput($input: UpdateJobInput!) {
    updateJob(input: $input) {
        id,
        description
    }
  }
`;

  const [formState, setFormState] = useState(initialFormState);
  const [updateJob, { loading, error, data }] = useMutation(UPDATE_JOB);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });  
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();    
    updateJob({ variables: { input: formState } });
  }

  if( loading ) {
    return <h1><Spinner animation="border" variant="warning" size="lg" /></h1>
  }

  if( error ) {
    return <h1>Something went Wrong</h1>
  }

  return (
    <ErrorBoundary fallback={<h1>Something Went Wrong</h1>}>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>Update Job Description</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          
          <div className="form-group">
            <label htmlFor="descrption">Enter Description</label>
            <h3><textarea name="description" className="form-control formStyle" id="description" placeholder="Enter Job Description" rows="12" cols="3" onChange={handleInputChange} required={true}></textarea></h3>
          </div>
          {/* <div className="form-group">
            <label htmlFor="adminSecret">Enter Admin Secret</label>
            <h3><input name="adminSecret" type="password" className="form-control formStyle" id="adminSecret" placeholder="Enter Admin Secret" onChange={handleInputChange} required={true} /></h3>
          </div> */}
          <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
    </ErrorBoundary>
  );
}


function JobViewDetailComponent(props) {

  const [modalShow, setModalShow] = React.useState(false);

  const jobSlug = props.match.params.jobSlug;
  const companySlug = props.match.params.companySlug;  
  const [description, setDescription] = useState("");

  const { loading, error, data } = useQuery(gql
    `query JobInput($input: JobInput!) {
        job(input: $input) {
        id
      title,
      slug
      company{
        name
        websiteUrl
      }
      description
      applyUrl
      isPublished
      isFeatured
      locationNames
      userEmail
      postedAt
      createdAt
      updatedAt
      tags{
        name
      }
      }
      }
    `, { variables: { input: { 'companySlug': `${companySlug}`, 'jobSlug': 'full-stack-javascript-engineer' } } });



  useEffect(() => {

    if (data !== undefined) {

      let description1 = data.job.description;
      description1 = description1.replace("**", " ");
      description1 = description1.replace("###", "\n");
      setDescription(description1);
    }

  }, [loading]);


  if (loading) {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12 text-center mt-4">
              {loading && <Spinner animation="border" variant="warning" size="lg" />}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

  if (error) {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12 text-center">
              {error && <div style={{ color: "#80cbc4", font: 'Arial' }}>Something Went Wrong</div>}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div key={data.job.id} style={{ color: "lightgrey", font: 'Arial', backgroundColor: '#414863' }} className="col-lg-12 col-md-12 col-sm-12 py-lg-3 py-md-3 py-sm-3 my-2 border border-dark">

              <div className="row">
                <div className="col-6"><h3>{data.job.title}</h3></div>
                <div className="col-6"><h3 className="float-right"><a style={{ color: "white" }} href={data.job.applyUrl} target="_blank" rel="noopener noreferrer" >Apply Now</a></h3></div>
              </div>
              <div>

                <p><span><FontAwesomeIcon icon={faBuilding} />{' '}<a style={{ color: "white" }} href={data.job.company.websiteUrl} target="_blank" rel="noopener noreferrer">{data.job.company.name}</a></span></p>
                <p><span><FontAwesomeIcon icon={faClock} /> {'   '}Job Posted :{' '}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit"
                  }).format(new Date(Date.parse(data.job.postedAt)))}
                </span>
                </p>
                <p><span><FontAwesomeIcon icon={faMapMarker} />{' '}{(data.job.locationNames === null || data.job.locationNames === "") ? 'N/A' : data.job.locationNames}</span></p>
                <div><p>
                  {data.job.tags.map((item, key) =>
                    <span key={key}><FontAwesomeIcon id={key} icon={faHashtag} />{' '} {item.name} {' '}</span>)}
                </p></div>
                <div className="row">
                  <div className="col">
                    {description}
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col">
                    <button className="btn btn-primary" onClick={() => setModalShow(true)}>Update Job Description</button>

                    <ErrorBoundary fallback={<h1>Something went wrong while Update Job Descripton</h1>}>
                    <UpdateJobDetails
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      jobId={data.job.id}
                      description={description} />
                      </ErrorBoundary>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default React.memo(JobViewDetailComponent);