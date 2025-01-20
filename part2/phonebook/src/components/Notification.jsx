const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
  
    const notificationClass = `notification ${type} ${message ? '' : 'fadeOut'}`

    return (
      <div className={notificationClass}>
        {message}
      </div>
    )
  }

export default Notification
