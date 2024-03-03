function Analytics() {
  const user = JSON.parse(localStorage.getItem("loggedUserInfo"));
  const { firstName, lastName } = user;
  return (
    <div className="container-fluid">
      <div className="layout-specing">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h6 className="text-muted mb-1">
              Welcome back, {firstName} {lastName}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
