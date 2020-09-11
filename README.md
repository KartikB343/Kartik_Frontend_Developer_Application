Mutations Used :

----------------------------------------------------------------------------------
1 Update Job Description
----------------------------------------------------------------------------------


gql`
  mutation UpdateJobInput($input: UpdateJobInput!) {
    updateJob(input: $input) {
        id,
        description
    }
  }
`

mutation{
   updateJob(input:{id:"1",description:"1"}, adminSecret:"admin") {
    id,
    description
  }
}

----------------------------------------------------------------------------------
2 Post a Job
----------------------------------------------------------------------------------

gql`mutation postJob($input: PostJobInput!) {
    postJob(input: $input) {
        id,
        description
    }
  }
`;


mutation{
   postJob(input:{title:"",commitmentId:"", companyName:"",locationNames:"",userEmail:"",description:"",applyUrl:""}) {    
    id,
    description
  }
}


----------------------------------------------------------------------------------
----------------------------------------------------------------------------------


Query used :

----------------------------------------------------------------------------------
For Searching Jobs
----------------------------------------------------------------------------------

`{
  jobs {        
    slug,
    tags {
      id,
      name,              
    }        
  }
 }`

----------------------------------------------------------------------------------
Job Feed Page / Loading Jobs
----------------------------------------------------------------------------------

gql` 
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

----------------------------------------------------------------------------------
Job DetailView Page
----------------------------------------------------------------------------------

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
    
----------------------------------------------------------------------------------    

