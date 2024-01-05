import React from 'react'
import { Helmet } from 'react-helmet'

const BrowserTitleBar = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>Bike.com | {title}</title>
      </Helmet>
    </>
  )
}

export default BrowserTitleBar;
