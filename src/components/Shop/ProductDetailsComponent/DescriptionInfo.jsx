const DescriptionInfo = (props) => {
  const { select } = props;
  console.log(select);
  return (
    <div className="col-12 mt-4">
      <ul
        className="nav nav-pills shadow flex-column flex-sm-row d-md-inline-flex mb-0 p-1 bg-white-color rounded position-relative overflow-hidden"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item m-1">
          <a
            className="nav-link py-2 px-5 active rounded"
            id="description-data"
            data-bs-toggle="pill"
            href="#description"
            role="tab"
            aria-controls="description"
            aria-selected="false"
          >
            <div className="text-center">
              <h6 className="mb-0">Description</h6>
            </div>
          </a>
          {/*end nav link*/}
        </li>
        {/*end nav item*/}
        <li className="nav-item m-1">
          <a
            className="nav-link py-2 px-5 rounded"
            id="additional-info"
            data-bs-toggle="pill"
            href="#additional"
            role="tab"
            aria-controls="additional"
            aria-selected="false"
          >
            <div className="text-center">
              <h6 className="mb-0">Additional Information</h6>
            </div>
          </a>
          {/*end nav link*/}
        </li>
        {/*end nav item*/}
        <li className="nav-item m-1">
          <a
            className="nav-link py-2  rounded"
            id="review-comments"
            data-bs-toggle="pill"
            href="#review"
            role="tab"
            aria-controls="review"
            aria-selected="false"
          ></a>
        </li>
      </ul>
      <div className="tab-content mt-4" id="pills-tabContent">
        <div
          className="card border-0 tab-pane fade show active p-4 rounded shadow"
          id="description"
          role="tabpanel"
          aria-labelledby="description-data"
        >
          <p className="text-muted mb-0">{select.description}</p>
        </div>
        <div
          className="card border-0 tab-pane fade"
          id="additional"
          role="tabpanel"
          aria-labelledby="additional-info"
        >
          <table className="table p-4 rounded shadow">
            <tbody>
              <tr>
                <td style={{ width: 100 }}>Color</td>
                <td className="text-muted">
                  {select?.color?.map((options, index) => (
                    <span key={options.id}>
                      {options.name}
                      {index < select.color.length - 1 && ", "}{" "}
                      {/* Add comma if not the last element */}
                    </span>
                  ))}
                </td>
              </tr>

              <tr>
                <td>Material</td>
                <td className="text-muted">
                  {select?.productMaterial?.map((options, index) => (
                    <span key={options.id}>
                      {options.label}
                      {index < select.productMaterial.length - 1 && ", "}{" "}
                      {/* Add comma if not the last element */}
                    </span>
                  ))}
                </td>
              </tr>

              <tr>
                <td>Size</td>
                <td className="text-muted">
                  {select?.productSizes?.map((options, index) => (
                    <span key={options.id}>
                      {options.label}
                      {index < select.productSizes.length - 1 && ", "}{" "}
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

DescriptionInfo.propTypes = {};

export default DescriptionInfo;
