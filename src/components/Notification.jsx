const Notification = ({ message }) => {
  
  if (!message) return null

  const errorStyle = {
    color: message.isError ? 'red': 'green',
    backgroundColor: 'lightgrey',
    padding: '10px',
    borderStyle: 'solid',
    borderRadius: '5px',
    marginBottom: '10px',
    fontSize: '20px'
  }
  
  return(
    <div style={errorStyle}>
      { message.text }
    </div>
  )
}

export default Notification