import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: "" };
  }

  componentDidCatch(error) {
    this.setState({ error: `${error.name}: ${error.message}` });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div>
          <h4>{error}</h4>
          <h4>Some thing went wrong!!!</h4>
        </div>
      );
    } else {
      return <>{this.props.children}</>;
    }
  }
}

export default ErrorBoundary;
