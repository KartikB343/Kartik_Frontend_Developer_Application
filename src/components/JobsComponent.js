import React, { Fragment, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { gql } from "apollo-boost";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faBuilding, faClock, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function SearchComponent() {
    const [searchMode, setSearchMode] = useState(false);

    const [cityData, setCityData] = useState([]);
    const [tagsData, setTagsData] = useState([]);

    const { loading, error, data } = useQuery(gql` 
    {
      jobs {        
        slug,
        tags {
          id,
          name,              
        }        
      }
    }
    `);
}

function JobsComponent() {

    const [searchMode, setSearchMode] = useState(false);
 
    const { loading, error, data } = useQuery(gql` 
    {
        jobs {
          id
          title
          slug,
          tags {
            id,
            name,      
            createdAt,
            updatedAt
          }
          company{
            id,
            name,
            websiteUrl,
            logoUrl,      
            twitter,
            createdAt,
            updatedAt,
            slug,
            
          }
          cities {
            id
            name
            slug
            type
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
        }
      }
`);


    if (loading) {
        return (
            <Fragment>
                <div className="container">
                    <div className="row mt-5 mb-5">
                        <div className="col-12 col-md-12 col-sm-12 text-center mt-5">
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
            {/* <SearchComponent /> */}
            <div className="container">
                {/* <div className="row">
                    <div className="col-6">
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={()=>setSearchMode(true)} />
                        <datalist id="data">
                            {this.state.data.map((item, key) =>
                                <option key={key} value={item.displayValue} />
                            )}
                        </datalist>
                    </div>
                    <div className="col-6">
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={()=>setSearchMode(true)} />
                    </div>
                </div> */}
                <FeedJobsComponent data={data} />
            </div>
        </Fragment>
    )
}

class FeedJobsComponent extends React.Component {

    constructor(props) {
        super(props)
        this.handleShowMore = this.handleShowMore.bind(this)
        this.state = {
            items: this.props.data.jobs,
            showItems: 10
        }
    }

    handleShowMore() {
        this.setState({
            showItems:
                this.state.showItems >= this.state.items.length ?
                    this.state.showItems : this.state.showItems + 7
        })
    }

    render() {
        const items = this.state.items.slice(0, this.state.showItems).map(
            (items, i) =>

                <div key={items.id} style={{ color: "lightgrey", font: 'Arial', backgroundColor: '#414863' }} className="col-lg-12 col-md-12 col-sm-12 py-lg-3 py-md-3 py-sm-3 my-2 border border-dark">
                    <h3>{items.title}</h3>
                    <div>

                        <p><span><FontAwesomeIcon icon={faBuilding} />{' '}<a style={{ color: "white" }} href={items.company.websiteUrl} target="_blank" rel="noopener noreferrer">{items.company.name}</a></span></p>
                        <p><span><FontAwesomeIcon icon={faClock} /> {'   '}Job Posted :{' '}
                            {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit"
                            }).format(new Date(Date.parse(items.postedAt)))}
                        </span>
                        </p>

                        <p><span><FontAwesomeIcon icon={faMapMarker} />{' '}{(items.locationNames === null || items.locationNames === "") ? 'N/A' : items.locationNames}</span></p>
                        <div><p>
                            {items.tags.map((item, key) =>
                                <span key={key}><FontAwesomeIcon id={key} icon={faHashtag} />{' '} {item.name} {' '}</span>)}
                        </p></div>
                        <div className="row">
                            <div className="col-6"><span><Link to={`/viewjob/${items.company.slug}/${items.slug}`}>View More Information</Link></span></div>
                            <div className="col-6"><span className="float-right"><a style={{ color: "white" }} href={items.applyUrl} target="_blank" rel="noopener noreferrer" >Apply Now</a></span></div>
                        </div>
                    </div>
                </div>
        )

        return (
            <div className="row mb-5">
                {items}
                <button disabled={this.state.showItems === this.state.items.length ? true : false} className="btn btn-primary btn-block mt-2" onClick={this.handleShowMore}>Showing {this.state.showItems> this.state.items.length ? this.state.items.length :  this.state.showItems } of {this.state.items.length}</button>
            </div>
        )
    }
}
export default React.memo(JobsComponent);