import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Spinner } from 'react-bootstrap';

const initialFormState = {
    title: '',
    commitmentId: 'cjtu8esth000z0824x00wtp1i',
    companyName: '',
    locationNames: '',
    userEmail: '',
    description: '',
    applyUrl: ''
}

function PostJobComponent() {

    const ADD_JOB = gql`
  mutation postJob($input: PostJobInput!) {
    postJob(input: $input) {
        id,
        description
    }
  }
`;

    const [formState, setFormState] = useState(initialFormState);
    const [addJob, { loading, error, data }] = useMutation(ADD_JOB);
    console.log(loading);
    console.log(error);
    console.log(data);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();        
        addJob({ variables: { input: formState } });
    }

    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ color: "white", font: 'Arial', backgroundColor: '#414863' }}>
                        <form onSubmit={(e) => handleFormSubmit(e)}>

                            <div className="form-group mt-4">
                                <label htmlFor="title">Enter Job Title</label>
                                <h3><input type="text" name="title" className="form-control formStyle" id="title" placeholder="ReactJS Developer" onChange={handleInputChange} required={true} /></h3>
                            </div>

                            <div className="form-group">
                                <label htmlFor="title">Select Job Type</label>
                                <select name="commitmentId" className="custom-select formStyle" onChange={handleInputChange} required={true}>
                                    <option defaultValue="" disabled>Select Job Type</option>
                                    <option value="cjtu8esth000z0824x00wtp1i">Part Time</option>
                                    <option value="cjtu8esth000z0824x00wtp1i">Full Time</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="companyName">Enter Company Name</label>
                                <h3><input name="companyName" type="text" className="form-control formStyle" id="companyName" placeholder="Enter Company Name" onChange={handleInputChange} required={true} /></h3>
                            </div>

                            <div className="form-group">
                                <label htmlFor="locationNames">Enter Job Location Name</label>
                                <h3><input name="locationNames" type="text" className="form-control formStyle" id="locationNames" placeholder="Enter Job Location Name" onChange={handleInputChange} required={true} /></h3>
                            </div>

                            <div className="form-group">
                                <label htmlFor="userEmail">Enter User Email Address</label>
                                <h3><input name="userEmail" type="email" className="form-control formStyle" id="userEmail" placeholder="Enter User Email Address" onChange={handleInputChange} required={true} /></h3>
                            </div>

                            <div className="form-group">
                                <label htmlFor="descrption">Enter Description</label>
                                <h3><textarea name="description" className="form-control formStyle" id="description" placeholder="Enter Job Description" rows="12" cols="3" onChange={handleInputChange} required={true}></textarea></h3>
                            </div>

                            <div className="form-group">
                                <label htmlFor="applyUrl">Enter Job Apply Url/Link</label>
                                <h3><input name="applyUrl" type="url" className="form-control formStyle" id="applyUrl" placeholder="Enter Job Apply URL/Link" rows="12" cols="3" onChange={handleInputChange} required={true} /></h3>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
                        </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-lg-12 col-md-12 col-sm-12" style={{ color: "white", font: 'Arial', backgroundColor: '#414863' }}>                        
                            {loading && <Spinner animation="border" variant="warning" size="lg" />}
                            {error && <h1>Something went wrong</h1>}                                                    
                            {loading===false && data!==undefined && <div className="text-center"><h1>Details Submitted</h1></div>}
                    </div>
                </div>
            </div>
        </>
    );
}
export default React.memo(PostJobComponent);