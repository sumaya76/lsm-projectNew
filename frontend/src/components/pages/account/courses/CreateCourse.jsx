import React, { useState, useContext } from 'react';
import Layout from '../../../common/layout';
import UserSidebar from '../../../common/UserSidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../../context/Auth';
import { apiUrl } from '../../../common/CONFIG.JSX';
import 'react-toastify/dist/ReactToastify.css';

const CreateCourse = () => {

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Get logged-in token from AuthContext
  const { token } = useContext(AuthContext);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/courses`, { // ✅ matches Laravel route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Course created successfully!");

        setTimeout(() => {
          navigate(`/account/courses/edit/${result.data.id}`);
        }, 1500);

      } else if (response.status === 400 && result.errors) {
        Object.keys(result.errors).forEach((field) => {
          setError(field, {
            type: 'server',
            message: result.errors[field][0],
          });
        });
        toast.error("Please fix the errors.");

      } else {
        toast.error(result.message || "Failed to create course.");
      }

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} />

      <section className="section-4">
        <div className="container pb-5 pt-3">

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/account">Account</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Create Course
              </li>
            </ol>
          </nav>

          <div className="row">

            <div className="col-lg-3 account-sidebar">
              <UserSidebar />
            </div>

            <div className="col-lg-9">
              <div className="card border-0 shadow-sm p-4">

                <h4 className="mb-3">Create Course</h4>

                <form onSubmit={handleSubmit(onSubmit)}>

                  {/* Course Title */}
                  <div className="mb-3">
                    <label className="form-label">Course Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter course title"
                      {...register("title", {
                        required: "The title field is required.",
                      })}
                    />
                    {errors.title && (
                      <small className="text-danger">{errors.title.message}</small>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={loading}
                  >
                    {loading ? "Please wait..." : "Continue"}
                  </button>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>
    </Layout>
  );
};

export default CreateCourse;
