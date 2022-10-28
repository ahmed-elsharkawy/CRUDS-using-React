import React from 'react'
import { Alert } from 'react-bootstrap'

function MyAlert({ alertData, closeAlert }) {
  return (
    <div>
        <div className="overlay">
          <Alert
            variant="danger"
            onClose={() => closeAlert(true)}
            dismissible
            className="w-50 p-5"
          >
            <Alert.Heading>
              {alertData}
            </Alert.Heading>
          </Alert>
        </div>
    </div>
  )
}

export default MyAlert