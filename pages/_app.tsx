import { AppProps } from 'next/dist/shared/lib/router/router'
import React from 'react'
import '../styles/globals.css'

const MyApp : React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
