function Offcanvas() {
  return (
    <div
      className="offcanvas offcanvas-end shadow"
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header p-4 border-bottom">
        <h5 id="offcanvasLeftLabel" className="mb-0">
          <img
            src="assets/images/logo-dark.png"
            height={24}
            className="light-version"
            alt="...."
          />
          <img
            src="assets/images/logo-light.png"
            height={24}
            className="dark-version"
            alt="...."
          />
        </h5>
        <button
          type="button"
          className="btn-close d-flex align-items-center text-dark"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="uil uil-times fs-4" />
        </button>
      </div>
      <div className="offcanvas-body p-4">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h6 className="fw-bold">Theme Options</h6>
              <ul className="text-center style-switcher list-unstyled mt-4">
                <li className="d-grid">
                  <a
                    href="javascript:void(0)"
                    className="rtl-version t-rtl-light"
                    onClick="setTheme('style-rtl')"
                  >
                    <img
                      src="assets/images/demos/rtl.png"
                      className="img-fluid rounded-md shadow-md d-block mx-auto"
                      style={{ width: 230 }}
                      alt="...."
                    />
                    <span className="text-dark fw-medium mt-3 d-block">
                      RTL Version
                    </span>
                  </a>
                </li>
                <li className="d-grid">
                  <a
                    href="javascript:void(0)"
                    className="ltr-version t-ltr-light"
                    onClick="setTheme('style')"
                  >
                    <img
                      src="assets/images/demos/ltr.png"
                      className="img-fluid rounded-md shadow-md d-block mx-auto"
                      style={{ width: 230 }}
                      alt="...."
                    />
                    <span className="text-dark fw-medium mt-3 d-block">
                      LTR Version
                    </span>
                  </a>
                </li>
                <li className="d-grid">
                  <a
                    href="javascript:void(0)"
                    className="dark-rtl-version t-rtl-dark"
                    onClick="setTheme('style-dark-rtl')"
                  >
                    <img
                      src="assets/images/demos/dark-rtl.png"
                      className="img-fluid rounded-md shadow-md d-block mx-auto"
                      style={{ width: 230 }}
                      alt="...."
                    />
                    <span className="text-dark fw-medium mt-3 d-block">
                      RTL Version
                    </span>
                  </a>
                </li>
                <li className="d-grid">
                  <a
                    href="javascript:void(0)"
                    className="dark-ltr-version t-ltr-dark"
                    onClick="setTheme('style-dark')"
                  >
                    <img
                      src="assets/images/demos/dark.png"
                      className="img-fluid rounded-md shadow-md d-block mx-auto"
                      style={{ width: 230 }}
                      alt="...."
                    />
                    <span className="text-dark fw-medium mt-3 d-block">
                      LTR Version
                    </span>
                  </a>
                </li>
                <li className="d-grid">
                  <a
                    href="javascript:void(0)"
                    className="dark-version t-dark mt-4"
                    onClick="setTheme('style-dark')"
                  >
                    <img
                      src="assets/images/demos/dark.png"
                      className="img-fluid rounded-md shadow-md d-block mx-auto"
                      style={{ width: 230 }}
                      alt="...."
                    />
                    <span className="text-dark fw-medium mt-3 d-block">
                      Dark Version
                    </span>
                  </a>
                </li>
                <li className="d-grid">
                  <a
                    href="javascript:void(0)"
                    className="light-version t-light mt-4"
                    onClick="setTheme('style')"
                  >
                    <img
                      src="assets/images/demos/ltr.png"
                      className="img-fluid rounded-md shadow-md d-block mx-auto"
                      style={{ width: 230 }}
                      alt="...."
                    />
                    <span className="text-dark fw-medium mt-3 d-block">
                      Light Version
                    </span>
                  </a>
                </li>
                <li className="d-grid">
                  <a
                    href="../../landing/dist/index.html"
                    target="_blank"
                    className="mt-4"
                  >
                    <img
                      src="assets/images/demos/landing.png"
                      className="img-fluid rounded-md shadow-md d-block mx-auto"
                      style={{ width: 230 }}
                      alt="...."
                    />
                    <span className="text-dark fw-medium mt-3 d-block">
                      Landing
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas-footer p-4 border-top text-center">
        <ul className="list-unstyled social-icon social mb-0">
          <li className="list-inline-item mb-0">
            <a
              href="https://1.envato.market/landrick"
              target="_blank"
              className="rounded"
            >
              <i
                className="uil uil-shopping-cart align-middle"
                title="Buy Now"
              />
            </a>
          </li>
          <li className="list-inline-item mb-0">
            <a
              href="https://dribbble.com/shreethemes"
              target="_blank"
              className="rounded"
            >
              <i className="uil uil-dribbble align-middle" title="dribbble" />
            </a>
          </li>
          <li className="list-inline-item mb-0">
            <a
              href="https://www.behance.net/shreethemes"
              target="_blank"
              className="rounded"
            >
              <i className="uil uil-behance align-middle" title="behance" />
            </a>
          </li>
          <li className="list-inline-item mb-0">
            <a
              href="https://www.facebook.com/shreethemes"
              target="_blank"
              className="rounded"
            >
              <i className="uil uil-facebook-f align-middle" title="facebook" />
            </a>
          </li>
          <li className="list-inline-item mb-0">
            <a
              href="https://www.instagram.com/shreethemes/"
              target="_blank"
              className="rounded"
            >
              <i className="uil uil-instagram align-middle" title="instagram" />
            </a>
          </li>
          <li className="list-inline-item mb-0">
            <a
              href="https://twitter.com/shreethemes"
              target="_blank"
              className="rounded"
            >
              <i className="uil uil-twitter align-middle" title="twitter" />
            </a>
          </li>
          <li className="list-inline-item mb-0">
            <a href="mailto:support@shreethemes.in" className="rounded">
              <i className="uil uil-envelope align-middle" title="email" />
            </a>
          </li>
          <li className="list-inline-item mb-0">
            <a
              href="https://shreethemes.in"
              target="_blank"
              className="rounded"
            >
              <i className="uil uil-globe align-middle" title="website" />
            </a>
          </li>
        </ul>
        {/*end icon*/}
      </div>
    </div>
  );
}

export default Offcanvas;
