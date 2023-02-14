const Notification = ({ message, error }) => {
  const success = {
    color: "green",
    fontSize: 20,
    paddig: 16,
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    marginBottom: "10px",
  };

  const fail = {
    color: "red",
    fontSize: 20,
    paddig: 16,
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    marginBottom: "10px",
  };

  if (message === null) {
    return null;
  }

  if (error === true) {
    return <div style={fail}> {message}</div>;
  }

  return <div style={success}>{message}</div>;
};

export default Notification;
