import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import "./Categories.css"; // new premium styles

const Categories = () => {
  const categories = useCategory(); // unchanged

  return (
    <Layout title={"All Categories"}>
      <div className="categories-page-wrapper">
        {/* Animated background blobs */}
        <div className="bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
          <div className="blob blob-4"></div>
        </div>

        <div className="categories-container">
          {/* Modern heading */}
          <div className="heading-section">
            <h1 className="page-heading">
              Explore Categories
              <span className="heading-glow"></span>
            </h1>
            <p className="heading-subtitle">
              Browse our collections – designed with passion
            </p>
          </div>

          {/* Responsive grid – same map logic, only styling changed */}
          <div className="categories-grid">
            {categories.map((c) => (
              <Link
                to={`/category/${c.slug}`}
                key={c._id}
                className="category-card"
              >
                <div className="card-inner">
                  <div className="card-icon">✨</div>
                  <h3 className="card-title">{c.name}</h3>
                  <div className="card-hover-reveal">
                    <span>Explore →</span>
                  </div>
                </div>
                <div className="card-glow-border"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;