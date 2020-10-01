import PortfolioCard from '@/components/portfolios/PortfolioCard';
import Link from 'next/link';
import {
  useGetPortfolios,
  useUpdatePortfolio,
  useDeletePortfolio,
  useCreatePortfolio } from '@/apollo/actions';
import { getDataFromTree } from '@apollo/react-ssr'
import withApollo from '@/hoc/withApollo'

const Portfolios = () => {  
  const { data } = useGetPortfolios()
  const [ updatePortfolio ] = useUpdatePortfolio()
  const [ deletePortfolio ] = useDeletePortfolio()
  const [ createPortfolio ] = useCreatePortfolio()

  const portfolios = data && data.portfolios || []

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button
          onClick={createPortfolio}
          className="btn btn-primary">Create Portfolio</button>
      </section>
      <section className="pb-5">
        <div className="row">
          { 
            portfolios.map(portfolio =>
                <div key={portfolio._id} className="col-md-4 col-sm-12">
                    <Link
                        href='/portfolios/[id]'
                        as={`/portfolios/${portfolio._id}`}>
                        <a className="card-link">
                        <PortfolioCard portfolio={portfolio} />
                        </a>
                    </Link>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <button
                                className="btn btn-warning"
                                onClick={() => updatePortfolio({ variables: { id: portfolio._id }})}
                            >
                                    Update Portfolio
                            </button>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <button
                                onClick={() => deletePortfolio({ variables: { id: portfolio._id }})}
                                className="btn btn-danger"
                            >
                                Delete Portfolio
                            </button>
                        </div>
                    </div>
                </div>
            )
          }
        </div>
      </section>
    </>
  )
}


export default withApollo(Portfolios, { getDataFromTree});