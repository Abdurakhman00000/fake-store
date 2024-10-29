import React from 'react'
import Welcome from './homeSection/Welcome'
import Section1 from './homeSection/Section1/Section1'
import Section2 from './homeSection/Section2/Section2'
import Section3 from './homeSection/Section3/Section3'
import Section4 from './homeSection/Section4/Section4'
import Section5 from './homeSection/Section5/Section5'

const HomePage = () => {
  return (
    <>
        <Welcome/>
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/>
        <Section5/>
    </>
  )
}

export default HomePage