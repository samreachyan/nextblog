// import React from 'react'
import { useRouter } from 'next/router'

const PortFolioDetail = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <h1>I am default on ID: {id} </h1>
    )
}

// cach2 
// const PortFolioDetail = ({ query }) => {
//     const { id } = query

//     return (
//         <h1>I am default on ID: {id} </h1>
//     )
// }
// PortFolioDetail.getInitialProps = ({ query }) => {
//     return { query }
// }

//cach 3 
// class PortFolioDetail extends React.Component {
//     static getInitialProps({ query }) {
//         return { query }
//     }
//     render() {
//         const { id } = this.props.query

//         return (
//             <h1>I am default on ID: {id} </h1>
//         )
//     }
// }

export default PortFolioDetail