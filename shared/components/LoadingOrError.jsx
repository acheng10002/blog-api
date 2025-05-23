const LoadingOrError = ({ loading, error, label = "resource" }) => {
  // if loading is true, placeholder message
  if (loading) return <p>Loading {label}...</p>;
  // if error, error message
  if (error) return <p className="error">{error}</p>;
  return null;
};

export default LoadingOrError;
