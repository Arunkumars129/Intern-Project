import {Link} from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1 text-center text-info fw-bolder">404</h1>
<h1 className="display-1 text-center fw-semibold mt-3">PAGE NOT FOUND</h1>
<h4>Sorry, we can't find the page you're looking for.</h4>
<Link><button className="btn btn-primary px-5 rounded-pill mt-3">Back to Home</button>
</Link>

    </div>
  )
}

export default ErrorPage