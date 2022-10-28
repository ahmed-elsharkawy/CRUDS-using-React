import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function MyFooter() {
  return (
    <div>
        <Navbar bg="light">
        <Container>
          <Navbar.Brand className='mx-auto mt-2 fs-6'><span>&#64;</span>
2022 All right reserved for <span className='text-primary'><a href="https://devsharkawy.surge.sh/" target="_blank" >Ahmed-Elsharkawy</a></span> <p>Front-end web developer</p></Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default MyFooter