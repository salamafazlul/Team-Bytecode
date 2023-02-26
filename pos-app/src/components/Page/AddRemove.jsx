import React from 'react'
import SideNavi from '../sidebar/SideNavi'
import Headingsec from '../Heading/Headingsec'
import Form from '../Purchersingform/Form'
import Rform from '../Returnform/Rform'
import Removeform from '../Remove/Removeform'
import Footerbar from '../footer/Footerbar'

const AddRemove = () => {
  return (
    <>
    <SideNavi />
      <div>
        <Headingsec />
        <Form />
        <Rform />
        <Removeform />
        <Footerbar />
      </div>
    </>
  )
}

export default AddRemove
