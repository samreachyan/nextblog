import axios from 'axios'
import PortfolioCard from '@/components/portfolios/PortfolioCard'
import { useState } from 'react'

const fetchPortfolios = () => {
    const query = `
    query Portfolios { 
        portfolios { 
            _id, 
            title, 
            company, 
            companyWebsite, 
            location, 
            jobTitle, 
            description, 
            startDate, 
            endDate
        } 
    }`

    return axios.post('http://localhost:3000/graphql', { query })
        .then(({ data: graph }) => graph.data )
        .then(data => data.portfolios)
}

const graphCreatePortfolio = () => {
    const query = `
    mutation {
        createPortfolio(input: {
            title:"new york",
            company:"new company",
            companyWebsite:"www.google.com",
            location:"hanoi",
            jobTitle:"new title",
            description:"this is description",
            startDate:"12/12/2020",
            endDate:"21/09/2020"
        }){
            _id, 
            title, 
            company, 
            companyWebsite, 
            location, 
            jobTitle, 
            description, 
            startDate, 
            endDate
        }
    }`

    return axios.post('http://localhost:3000/graphql', { query })
        .then(({ data: graph }) => graph.data )
        .then(data => data.createPortfolio)
}

const graphDeletePortfolio = (id) => {
    const query = `
      mutation DeletePortfolio {
        deletePortfolio(id: "${id}")
      }
    `
  
    return axios.post('http://localhost:3000/graphql', { query })
      .then(({data: graph}) => graph.data)
      .then(data => data.deletePortfolio)
}

const graphUpdatePortfolio = (id) => {
    const query = `
      mutation UpdatePortfolio {
        updatePortfolio(id: "${id}",input: {
          title: "UPDATE Job"
          company: "UPDATE Company"
          companyWebsite: "UPDATE Website"
          location: "UPDATE Location"
          jobTitle: "UPDATE Job Title"
          description: "UPDATE Desc"
          startDate: "12/12/2012 UPDATE"
          endDate: "14/11/2013 UPDATE"
        }) {
          _id,
          title,
          company,
          companyWebsite
          location
          jobTitle
          description
          startDate
          endDate
        }
      }`;
    return axios.post('http://localhost:3000/graphql', { query })
      .then(({data: graph}) => graph.data)
      .then(data => data.updatePortfolio)
}

const portfolios = ({ data }) => {
    const [portfolios, setPortfolios] = useState(data.portfolios)
    const createPortfolio = async () => {
        const newPortfolio = await graphCreatePortfolio();
        const newPortfolios = [ ...portfolios, newPortfolio ]
        setPortfolios(newPortfolios)
    }

    const updatePortfolio = async (id) => {
        const updatedPortfolio = await graphUpdatePortfolio(id);
        const index = portfolios.findIndex(p => p._id === id);
        const newPortfolios = portfolios.slice();
        newPortfolios[index] = updatedPortfolio;
        setPortfolios(newPortfolios);
      }
    
    const deletePortfolio = async (id) => {
        const deletedId = await graphDeletePortfolio(id);
        const index = portfolios.findIndex(p => p._id === deletedId);
        const newPortfolios = portfolios.slice();
        newPortfolios.splice(index, 1);
        setPortfolios(newPortfolios);
    }

    return (
        <>  
            <section className="section-title">
                <div className="px-2">
                    <div className="pt-5 pb-4">
                    <h1>Portfolios</h1>
                    </div>
                </div>
            </section>
            <button
                onClick={createPortfolio}
                className="btn btn-primary"
            >
                Create Portfolio
            </button>
            <section className="pb-5">
                <div className="row">
                    {
                        portfolios.map(portfolio => 
                            <div className="col-md-4">
                                <PortfolioCard key={portfolio._id} portfolio={portfolio} />
                                <div className="row">
                                    <div className="col-md-6">
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => updatePortfolio(portfolio._id)}
                                        >
                                            Update Portfolio
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button
                                            onClick={() => deletePortfolio(portfolio._id)}
                                            className="btn btn-danger"
                                        >
                                            Delete Portfolio
                                        </button>
                                    </div>
                                </div>
                            </div>)
                    }                    
                </div>
            </section>
        </>
    )
}

portfolios.getInitialProps = async () => {
    const portfolios = await fetchPortfolios()
    return { data: { portfolios } }
}

export default portfolios
